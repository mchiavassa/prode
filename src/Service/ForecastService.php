<?php

namespace Prode\Service;

use Illuminate\Database\DatabaseManager;
use Illuminate\Support\Collection;
use Prode\Domain\Model\Forecast;
use Prode\Domain\Model\Game;
use Prode\Domain\ResultStrategies\GameForecastResultStrategyFactory;

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
     * @param Forecast $forecast
     * @param Game $game
     *
     * @return Collection
     */
    public function resolveForecastAssertions(Forecast $forecast, Game $game)
    {
         return GameForecastResultStrategyFactory::getStrategy($game)
             ->resolveForecastAssertions($forecast, $game);
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

                /** @var Collection $assertions */
                $assertions = $this->resolveForecastAssertions($forecast, $game);
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
}
