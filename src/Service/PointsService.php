<?php

namespace Prode\Service;

use Prode\Domain\ForecastResult;

class PointsService
{
    /**
     * @param ForecastResult $forecastResult
     *
     * @return int
     */
    public function getForecastResultPoints(ForecastResult $forecastResult)
    {
        return $this->getResultPointsMap()[(string) $forecastResult];
    }

    /**
     * @return array
     */
    private function getResultPointsMap()
    {
        return [
            ForecastResult::MATCH_RESULT => config('domain.points.result'),
            ForecastResult::MATCH_SCORE => config('domain.points.result') + config('domain.points.score'),
            ForecastResult::NO_MATCH => 0,
        ];
    }
}
