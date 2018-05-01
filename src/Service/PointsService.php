<?php

namespace Prode\Service;

use Prode\Domain\Model\Forecast;
use Prode\Domain\Model\Game;

class PointsService
{
    /**
     * @param Forecast $forecast
     * @param Game $game
     *
     * @return int
     */
    public function resolveForecastPoints(Forecast $forecast, Game $game)
    {
        $points = 0;

        if ($forecast->getResult() === $game->getResult()) {
            $points += config('domain.points.result');

            if ($forecast->home_score === $game->home_score &&
                $forecast->away_score === $game->away_score &&
                $forecast->home_tie_brek_score === $game->home_tie_brek_score &&
                $forecast->away_tie_brek_score === $game->away_tie_brek_score
            ) {
                $points += config('domain.points.score');
            }
        }

        return $points;
    }
}
