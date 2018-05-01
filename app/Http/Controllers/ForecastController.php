<?php

namespace App\Http\Controllers;

use App\Http\Requests\ForecastGame;
use Illuminate\Support\Facades\Auth;
use Prode\Domain\Model\Forecast;
use Prode\Domain\Model\GameSet;
use Prode\Domain\Model\PartyUser;

class ForecastController extends Controller
{
    private $partyUser;
    private $gameSet;
    private $forecast;

    public function __construct(GameSet $gameSet, PartyUser $partyUser, Forecast $forecast)
    {
        $this->middleware('auth');

        $this->partyUser = $partyUser;
        $this->gameSet = $gameSet;
        $this->forecast = $forecast;
    }

    public function forecastGameSet($partyId, $id)
    {
        $partyUser = $this->getCurrentPartyUser($partyId);

        /** @var GameSet $gameSet */
        $gameSet = $this->gameSet->with('games')->findOrFail($id);
        $games = $gameSet->games->map(function($game) use ($partyId) {
            return [
                'id' => $game->id,
                'home' => $game->home,
                'away' => $game->away,
                'homeFullName' => config('domain.teams.'.$game->home),
                'awayFullName' => config('domain.teams.'.$game->away),
                'homeShield' => asset('img/flags/'.$game->home.'.svg'),
                'awayShield' => asset('img/flags/'.$game->away.'.svg'),
                'homeScore' => $game->home_score,
                'awayScore' => $game->away_score,
                'homeTieBreakScore' => $game->home_tie_break_score,
                'awayTieBreakScore' => $game->away_tie_break_score,
                'hasResult' => $game->hasResult(),
                'forecastUrl' => route('forecast.game', ['id' => $game->id, 'partyId' => $partyId])
            ];
        });

        $forecasts = $this->forecast
            ->whereIn('game_id', $games->pluck('id')->all())
            ->where('party_user_id', $partyUser->id)
            ->get()
            ->mapWithKeys(function ($forecast) {
                return [$forecast->game_id => [
                    'id' => $forecast->id,
                    'homeScore' => $forecast->home_score,
                    'awayScore' => $forecast->away_score,
                    'homeTieBreakScore' => $forecast->home_tie_break_score,
                    'awayTieBreakScore' => $forecast->away_tie_break_score,
                    'pointsEarned' => $forecast->points_earned,
                ]];
            });

        return view(
            'forecast.set',
            ['gameSet' => $gameSet, 'partyUser' => $partyUser, 'games' => $games, 'forecasts' => $forecasts]
        );
    }

    public function forecastGame(ForecastGame $request, $partyId, $id)
    {
        $validated = $request->validated();

        $partyUser = $this->getCurrentPartyUser($partyId);

        $this->assertGameIsNotForecastByPartyUser($id, $partyUser->id);

        $forecast = new Forecast();
        $forecast->game_id = $id;
        $forecast->partyUser()->associate($partyUser);
        $forecast->home_score = array_get($validated, 'home_score');
        $forecast->away_score = array_get($validated, 'away_score');
        $forecast->home_tie_break_score = array_get($validated, 'home_tie_break_score');
        $forecast->away_tie_break_score = array_get($validated, 'away_tie_break_score');
        $forecast->save();

        return response()->json([
            'metadata' => [
                'code' => 200,
                'message' => 'OK',
            ],
            'data' => json_decode($forecast, true)
        ]);
    }

    private function assertGameIsNotForecastByPartyUser($gameId, $partyUserId)
    {
        if ($this->forecast->where('game_id', $gameId)->where('party_user_id', $partyUserId)->first()) {
            abort(400, 'Game already forecast.');
        }
    }

    /**
     * @param $partyId
     * @return PartyUser
     */
    private function getCurrentPartyUser($partyId)
    {
        $partyUser = $this->partyUser
            ->where('party_id', $partyId)
            ->where('user_id', Auth::user()->id)
            ->first();

        if (!$partyUser) {
            abort(404);
        }

        return $partyUser;
    }
}
