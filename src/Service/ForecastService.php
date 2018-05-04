<?php

namespace Prode\Service;

use Illuminate\Database\DatabaseManager;
use Prode\Domain\Model\Forecast;
use Prode\Domain\Model\Game;

class ForecastService
{
    private $pointsService;
    private $db;
    private $forecast;

    public function __construct(PointsService $pointsService, DatabaseManager $db, Forecast $forecast)
    {
        $this->pointsService = $pointsService;
        $this->db = $db;
        $this->forecast = $forecast;
    }

    /**
     * @param Game $game
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
                $points = $this->pointsService->resolveForecastPoints($forecast, $game);

                $forecast->points_earned = $points;
                $forecast->user->points += $points;

                $forecast->user->save();
                $forecast->save();
            }

            $game->computed = true;
            $game->save();
        });
    }
}
