<?php

namespace Prode\Domain\ResultStrategies;

use Illuminate\Support\Collection;
use Prode\Domain\Model\Forecast;
use Prode\Domain\Model\Game;

interface GameForecastResultStrategy
{
    /**
     * Retrieves all forecast assertions based on the game result.
     *
     * @param Forecast $forecast
     * @param Game $game
     *
     * @return Collection
     */
    public function resolveForecastAssertions(Forecast $forecast, Game $game);
}
