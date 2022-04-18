<?php

namespace App\Http\Controllers;

use App\Http\Requests\ForecastGame;
use App\Models\Forecast;
use App\Models\Game;
use App\Models\GameResult;
use App\Models\GameSet;
use App\Services\GameService;
use App\Utils\DateTimes;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

class ForecastController extends Controller
{
    private GameSet $gameSet;
    private Game $game;
    private Forecast $forecast;
    private GameService $gameService;

    public function __construct(GameSet $gameSet, Game $game, Forecast $forecast, GameService $gameService)
    {
        $this->middleware('auth');

        $this->gameSet = $gameSet;
        $this->game = $game;
        $this->forecast = $forecast;
        $this->gameService = $gameService;
    }

    /**
     * Displays a view with all games available to forecast from a particular game set
     *
     * @param int $id the id of the game set
     */
    public function showGameSetGamesForecasts(int $id)
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
            [
                'gameSet' => $gameSet,
                'games' => $games,
                'forecasts' => $forecasts
            ]
        );
    }

    /**
     * Displays a partial view (used in the home page) with the upcoming games to forecast
     */
    public function nextGamesForecast()
    {
        $nextGames = $this->gameService->getUpcomingGamesToForecast();

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
            [
                'games' => $nextGames,
                'forecasts' => $forecasts
            ]
        );
    }

    /**
     * POST operation that receives and creates a forecast of a particular game from the logged user
     */
    public function forecastGame(ForecastGame $request, int $gameId)
    {
        $validated = $request->validated();

        $game = $this->game->findOrFail($gameId);

        $this->assertGameCanBeForecast($game);

        $forecast = new Forecast();
        $forecast->game_id = $gameId;
        $forecast->user()->associate(Auth::user());
        $forecast->home_score = Arr::get($validated, 'home_score');
        $forecast->away_score = Arr::get($validated, 'away_score');
        $forecast->home_tie_break_score = Arr::get($validated, 'home_tie_break_score');
        $forecast->away_tie_break_score = Arr::get($validated, 'away_tie_break_score');

        if (!GameResult::resultIsValid(
            $forecast->home_score,
            $forecast->away_score,
            $game->tie_break_required,
            $forecast->home_tie_break_score,
            $forecast->away_tie_break_score
        )) {
            return $this->jsonError(400, __('game.result.invalid'));
        }

        $this->assertGameIsNotForecastedByUser($game);

        $forecast->save();

        return $this->jsonSuccess(json_decode($forecast, true));
    }

    /**
     * POST operation that updates a forecast of a particular game from the logged user
     */
    public function updateForecastGame(ForecastGame $request, int $gameId, int $forecastId)
    {
        $validated = $request->validated();

        $forecast = $this->forecast->with('game')->where('game_id', $gameId)->findOrFail($forecastId);

        $this->assertGameCanBeForecast($forecast->game);

        $forecast->home_score = Arr::get($validated, 'home_score');
        $forecast->away_score = Arr::get($validated, 'away_score');
        $forecast->home_tie_break_score = Arr::get($validated, 'home_tie_break_score');
        $forecast->away_tie_break_score = Arr::get($validated, 'away_tie_break_score');

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
                    'message' => __('game.result.invalid'),
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
            abort(400, __('game.forecasts.closed'));
        }
    }

    private function assertGameIsNotForecastedByUser(Game $game)
    {
        if ($this->forecast->where('game_id', $game->id)->where('user_id', Auth::user()->id)->first()) {
            abort(400, __('game.forecasts.exists'));
        }
    }

    private function mapGameToForecast(Game $game)
    {
        return [
            'id' => $game->id,
            'dateAndHour' => DateTimes::toTimestamp($game->date_and_hour),
            'group' => $game->group,
            'home' => $game->home,
            'away' => $game->away,
            'infoUrl' => $game->info_url,
            'homeFullName' => __('domain.teams.'.$game->home),
            'awayFullName' => __('domain.teams.'.$game->away),
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
            'forecastsUrl' => route('game.forecasts', ['id' => $game->id]),
        ];
    }

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
                return sprintf(
                    '%s (%s)',
                    __('domain.forecast.assertion.'.$assertion),
                    config('domain.points.'.$assertion)
                );
            })->implode(' + ')
        ];
    }
}
