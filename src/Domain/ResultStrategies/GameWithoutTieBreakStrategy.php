<?php

namespace Prode\Domain\ResultStrategies;

use Illuminate\Support\Collection;
use Prode\Domain\ForecastAssertion;
use Prode\Domain\Model\Forecast;
use Prode\Domain\Model\Game;

class GameWithoutTieBreakStrategy implements GameForecastResultStrategy
{
    /**
     * Retrieves all forecast assertions based on the game result.
     *
     * @param Forecast $forecast
     * @param Game $game
     *
     * @return Collection
     */
    public function resolveForecastAssertions(Forecast $forecast, Game $game)
    {
        $assertions = collect();

        if ($this->resultMatches($forecast, $game)) {
            $assertions->push(ForecastAssertion::RESULT);

            if ($this->scoreMatches($forecast, $game)) {
                $assertions->push(ForecastAssertion::SCORE);
            }
        }

        return $assertions;
    }

    /**
     * @param Forecast $forecast
     * @param Game $game
     *
     * @return bool
     */
    private function resultMatches(Forecast $forecast, Game $game)
    {
        return $forecast->getResult() === $game->getResult();
    }

    /**
     * @param Forecast $forecast
     * @param Game $game
     *
     * @return bool
     */
    private function scoreMatches(Forecast $forecast, Game $game)
    {
        return $forecast->home_score === $game->home_score
            && $forecast->away_score === $game->away_score;
    }
}
