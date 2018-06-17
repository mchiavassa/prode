<?php

namespace Prode\Domain\ResultStrategies;

use Prode\Domain\Model\Game;

class GameForecastResultStrategyFactory
{
    /**
     * @param Game $game
     *
     * @return GameForecastResultStrategy
     */
    public static function getStrategy(Game $game)
    {
        return $game->hasResultWithTieBreak()
                ? new GameWithTieBreakStrategy()
                : new GameWithoutTieBreakStrategy();
    }
}
