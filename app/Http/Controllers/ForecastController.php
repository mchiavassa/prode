<?php

namespace App\Http\Controllers;

use App\Http\Requests\ForecastGame;
use Illuminate\Support\Facades\Auth;
use Prode\Domain\GameResult;
use Prode\Domain\Model\Forecast;
use Prode\Domain\Model\Game;
use Prode\Domain\Model\GameSet;

class ForecastController extends Controller
{
    private $gameSet;
    private $game;
    private $forecast;

    public function __construct(GameSet $gameSet, Game $game, Forecast $forecast)
    {
        $this->middleware('auth');

        $this->gameSet = $gameSet;
        $this->game = $game;
        $this->forecast = $forecast;
    }

    public function showGameSetGamesForecasts($id)
    {
        /** @var GameSet $gameSet */
        $gameSet = $this->gameSet->with('games')->findOrFail($id);
        $games = $gameSet->games->map(function($game) {
            return [
                'id' => $game->id,
                'dateAndHour' => $game->date_and_hour->timestamp * 1000,
                'group' => $game->group,
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
                'canForecast' => $game->canForecast(),
                'computed' => $game->computed,
                'tieBreakRequired' => $game->tie_break_required,
                'forecastUrl' => route('forecast.game', ['gameId' => $game->id])
            ];
        });

        $forecasts = $this->forecast
            ->whereIn('game_id', $games->pluck('id')->all())
            ->where('user_id', Auth::user()->id)
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
            ['gameSet' => $gameSet, 'games' => $games, 'forecasts' => $forecasts]
        );
    }

    public function forecastGame(ForecastGame $request, $gameId)
    {
        $validated = $request->validated();

        $game = $this->game->findOrFail($gameId);

        $this->assertGameCanBeForecast($game);
        $this->assertGameIsNotForecastedByUser($game);

        $forecast = new Forecast();
        $forecast->game_id = $gameId;
        $forecast->user()->associate(Auth::user());
        $forecast->home_score = array_get($validated, 'home_score');
        $forecast->away_score = array_get($validated, 'away_score');
        $forecast->home_tie_break_score = array_get($validated, 'home_tie_break_score');
        $forecast->away_tie_break_score = array_get($validated, 'away_tie_break_score');

        if (!GameResult::resultIsValid(
            $forecast->home_score,
            $forecast->away_score,
            $game->tie_break_required,
            $forecast->home_tie_break_score,
            $forecast->away_tie_break_score
        )) {
            return response()->json([
                'metadata' => [
                    'code' => 400,
                    'message' => 'BadRequest',
                ],
                'error' => [
                    'message' => 'El resultado es inválido',
                ],
            ], 400);
        }

        $forecast->save();

        return response()->json([
            'metadata' => [
                'code' => 200,
                'message' => 'OK',
            ],
            'data' => json_decode($forecast, true)
        ]);
    }

    public function updateForecastGame(ForecastGame $request, $gameId, $forecastId)
    {
        $validated = $request->validated();

        $forecast = $this->forecast->with('game')->where('game_id', $gameId)->findOrFail($forecastId);

        $this->assertGameCanBeForecast($forecast->game);

        $forecast->home_score = array_get($validated, 'home_score');
        $forecast->away_score = array_get($validated, 'away_score');
        $forecast->home_tie_break_score = array_get($validated, 'home_tie_break_score');
        $forecast->away_tie_break_score = array_get($validated, 'away_tie_break_score');

        if (!GameResult::resultIsValid(
            $forecast->home_score,
            $forecast->away_score,
            $forecast->game->tie_break_required,
            $forecast->home_tie_break_score,
            $forecast->away_tie_break_score
        )) {
            return response()->json([
                'metadata' => [
                    'code' => 400,
                    'message' => 'BadRequest',
                ],
                'error' => [
                    'message' => 'El resultado es inválido',
                ],
            ], 400);
        }

        $forecast->save();

        return response()->json([
            'metadata' => [
                'code' => 200,
                'message' => 'OK',
            ],
            'data' => json_decode($forecast, true)
        ]);
    }


    private function assertGameCanBeForecast(Game $game)
    {
        if (!$game->canForecast()) {
            abort(400, 'Game cannot be forecast.');
        }
    }

    private function assertGameIsNotForecastedByUser(Game $game)
    {
        if ($this->forecast->where('game_id', $game->id)->where('user_id', Auth::user()->id)->first()) {
            abort(400, 'Game already forecast by User.');
        }
    }
}
