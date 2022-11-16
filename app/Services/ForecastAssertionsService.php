<?php

namespace App\Services;

use App\Models\Forecast;
use App\Models\ForecastAssertion;
use App\Models\Game;
use function collect;

class ForecastAssertionsService
{
    /**
     * Based on the forecast and the result of the game, returns a list of all the assertions collected
     */
    public function resolveForecastAssertions(Forecast $forecast, Game $game)
    {
        $assertions = collect();

        if ($this->resultMatches($forecast, $game)) {
            $assertions->push(ForecastAssertion::RESULT);
        }

        if ($this->scoreMatches($forecast, $game)) {
            $assertions->push(ForecastAssertion::SCORE);
        } else if ($this->teamScoreMatches($forecast, $game)) {
            $assertions->push(ForecastAssertion::TEAM_SCORE);
        }

        if ($game->hasResultWithTieBreak() && $forecast->hasResultWithTieBreak()) {
            $assertions->push(ForecastAssertion::TIEBREAK_EXISTENCE);

            if ($this->tieBreakMatches($forecast, $game)) {
                $assertions->push(ForecastAssertion::TIEBREAK_SCORE);
            }
        }

        return $assertions;
    }

    private function resultMatches(Forecast $forecast, Game $game)
    {
        return $forecast->getResult() === $game->getResult();
    }

    private function scoreMatches(Forecast $forecast, Game $game)
    {
        return $forecast->home_score === $game->home_score
            && $forecast->away_score === $game->away_score;
    }

    private function teamScoreMatches(Forecast $forecast, Game $game)
    {
        return $forecast->home_score === $game->home_score
            || $forecast->away_score === $game->away_score;
    }

    private function tieBreakMatches(Forecast $forecast, Game $game)
    {
        return $forecast->home_tie_break_score === $game->home_tie_break_score
            && $forecast->away_tie_break_score === $game->away_tie_break_score;
    }
}
