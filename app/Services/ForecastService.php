<?php

namespace App\Services;

use App\Models\Forecast;
use App\Models\Game;
use Illuminate\Database\DatabaseManager;
use Illuminate\Support\Collection;

class ForecastService
{
    private PointsService $pointsService;
    private ForecastAssertionsService $forecastAssertionsService;
    private DatabaseManager $db;
    private Forecast $forecast;

    public function __construct(
        PointsService $pointsService,
        ForecastAssertionsService $forecastAssertionsService,
        DatabaseManager $db,
        Forecast $forecast
    ) {
        $this->pointsService = $pointsService;
        $this->forecastAssertionsService = $forecastAssertionsService;
        $this->db = $db;
        $this->forecast = $forecast;
    }

    /**
     * Receives a game with the real score and compute the points for all forecasts found for that game
     */
    public function computeGame(Game $game)
    {
        $forecasts = $this->forecast
            ->with('user')
            ->where('game_id', $game->id)
            ->get();

        $this->db->connection()->transaction(function () use ($game, $forecasts) {
            /** @var Forecast $forecast */
            foreach ($forecasts as $forecast) {

                /** @var Collection $assertions */
                $assertions = $this->forecastAssertionsService->resolveForecastAssertions($forecast, $game);
                $points = $this->pointsService->getAssertionsPoints($assertions);

                $forecast->points_earned = $points;
                $forecast->assertions = $assertions->all();
                $forecast->user->points += $points;

                $forecast->user->save();
                $forecast->save();
            }

            $game->computed = true;
            $game->save();
        });
    }

    /**
     * Revert a game computed, removing points earned and assertions from each forecast and user
     */
    public function revertComputedGame(Game $game)
    {
        $forecasts = $this->forecast
            ->with('user')
            ->where('game_id', $game->id)
            ->get();

        $this->db->connection()->transaction(function () use ($game, $forecasts) {
            /** @var Forecast $forecast */
            foreach ($forecasts as $forecast) {

                $forecast->user->points -= $forecast->points_earned;
                $forecast->user->save();

                /** @var Collection $assertions */
                $forecast->points_earned = null;
                $forecast->assertions = null;

                $forecast->save();
            }

            $game->computed = false;
            $game->save();
        });
    }
}
