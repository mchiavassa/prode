<?php

namespace App\Http\Controllers;

use App\Http\Requests\ForecastGame;
use Carbon\Carbon;
use Illuminate\Support\Collection;
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
        $gameSet = $this->gameSet
            ->with('games')
            ->whereIn('status', [GameSet::STATUS_ENABLED, GameSet::STATUS_FINISHED])
            ->findOrFail($id);

        $games = $gameSet->games->sortBy('date_and_hour')->values()->map(function($game) {
            return $this->mapGameToForecast($game);
        });

        $forecasts = $this->forecast
            ->whereIn('game_id', $games->pluck('id')->all())
            ->where('user_id', Auth::user()->id)
            ->get()
            ->mapWithKeys(function ($forecast) {
                return [$forecast->game_id => $this->mapForecast($forecast)];
            });

        return view(
            'forecast.set',
            ['gameSet' => $gameSet, 'games' => $games, 'forecasts' => $forecasts]
        );
    }

    public function nextGamesForecast()
    {
        $nextGames = $this->getUpcomingGamesToForecast();

        if (!$nextGames) {
            return null;
        }

        $nextGames = $nextGames->map(function($game) {
            return $this->mapGameToForecast($game);
        });

        $forecasts = $this->forecast
            ->whereIn('game_id', $nextGames->pluck('id')->all())
            ->where('user_id', Auth::user()->id)
            ->get()
            ->mapWithKeys(function ($forecast) {
                return [$forecast->game_id => $this->mapForecast($forecast)];
            });

        return view(
            'forecast.next',
            ['games' => $nextGames, 'forecasts' => $forecasts]
        );
    }

    public function forecastGame(ForecastGame $request, $gameId)
    {
        $validated = $request->validated();

        $game = $this->game->findOrFail($gameId);

        $this->assertGameCanBeForecast($game);

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
            return $this->jsonError(400, 'El resultado es inválido');
        }

        $this->assertGameIsNotForecastedByUser($game);

        $forecast->save();

        return $this->jsonSuccess(json_decode($forecast, true));
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
            abort(400, 'El partido no puede ser pronosticado.');
        }
    }

    private function assertGameIsNotForecastedByUser(Game $game)
    {
        if ($this->forecast->where('game_id', $game->id)->where('user_id', Auth::user()->id)->first()) {
            abort(400, 'Ya pronosticaste este partido.');
        }
    }

    /**
     * @return Collection
     */
    private function getUpcomingGamesToForecast()
    {
        $daysAheadToCheck = 3;
        $currentDay = 0;

        do {
            $nextGames = $this->game
                ->whereHas('set', function ($query) {
                    $query->whereIn('status', [GameSet::STATUS_ENABLED, GameSet::STATUS_FINISHED]);
                })
                ->whereDate('date_and_hour', Carbon::now()->addDay($currentDay)->toDateString())
                ->orderBy('date_and_hour')
                ->get();

            // if games are for today
            if ($nextGames->isNotEmpty() && Carbon::now()->toDateString() === $nextGames->last()->date_and_hour->toDateString()) {
                // display the results up to two hours from the last game
                if (Carbon::now()->diffInHours($nextGames->last()->date_and_hour) < 2) {
                    return $nextGames;
                } else {
                    // otherwise clean the list and look for next day
                    $nextGames = collect();
                }
            }

            $currentDay++;
        } while ($nextGames->isEmpty() && $daysAheadToCheck > $currentDay);


        return $nextGames;
    }

    /**
     * @param Game $game
     * @return array
     */
    private function mapGameToForecast(Game $game)
    {
        return [
            'id' => $game->id,
            'dateAndHour' => $game->date_and_hour->timestamp * 1000,
            'group' => $game->group,
            'home' => $game->home,
            'away' => $game->away,
            'infoUrl' => $game->info_url,
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
            'isAuditable' => $game->isAuditable(),
            'computed' => $game->computed,
            'tieBreakRequired' => $game->tie_break_required,
            'forecastUrl' => route('forecast.game', ['gameId' => $game->id]),
            'auditUrl' => route('game.audit', ['id' => $game->id]),
        ];
    }

    /**
     * @param Forecast $forecast
     * @return array
     */
    private function mapForecast(Forecast $forecast)
    {
        return [
            'id' => $forecast->id,
            'homeScore' => $forecast->home_score,
            'awayScore' => $forecast->away_score,
            'homeTieBreakScore' => $forecast->home_tie_break_score,
            'awayTieBreakScore' => $forecast->away_tie_break_score,
            'pointsEarned' => $forecast->points_earned,
            'assertions' => collect($forecast->assertions)->map(function($assertion) {
                return __('domain.forecast.assertion.'.$assertion);
            })->implode(' + ')
        ];
    }
}
