<?php

namespace Prode\Service;

use Illuminate\Support\Collection;
use Prode\Domain\ForecastAssertion;

class PointsService
{
    /**
     * @param Collection $assertions
     *
     * @return int
     */
    public function getAssertionsPoints(Collection $assertions)
    {
        $points = 0;

        foreach ($assertions as $assertion) {
            $points += $this->getResultPointsMap()[(string) $assertion];
        }

        return $points;
    }

    /**
     * @return array
     */
    private function getResultPointsMap()
    {
        return [
            ForecastAssertion::RESULT => config('domain.points.result'),
            ForecastAssertion::SCORE => config('domain.points.score'),
            ForecastAssertion::TIEBREAK_SCORE => config('domain.points.tiebreak_score'),
            ForecastAssertion::TIEBREAK_EXISTENCE => config('domain.points.tiebreak_existence'),
        ];
    }
}
