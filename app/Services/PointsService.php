<?php

namespace App\Services;

use App\Models\ForecastAssertion;
use Illuminate\Support\Collection;
use function config;

class PointsService
{
    /**
     * Returns the corresponding points for the list of ForecastAssertion received
     */
    public function getAssertionsPoints(Collection $assertions)
    {
        $points = 0;

        foreach ($assertions as $assertion) {
            $points += $this->getResultPointsMap()[(string) $assertion];
        }

        return $points;
    }

    private function getResultPointsMap(): array
    {
        return [
            ForecastAssertion::RESULT => config('domain.points.result'),
            ForecastAssertion::SCORE => config('domain.points.score'),
            ForecastAssertion::TEAM_SCORE => config('domain.points.team_score'),
            ForecastAssertion::TIEBREAK_SCORE => config('domain.points.tiebreak_score'),
            ForecastAssertion::TIEBREAK_EXISTENCE => config('domain.points.tiebreak_existence'),
        ];
    }
}
