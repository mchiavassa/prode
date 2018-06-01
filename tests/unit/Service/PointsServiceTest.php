<?php

namespace Test\unit\Service;

use Prode\Domain\ForecastResult;
use Prode\Service\PointsService;
use Test\TestCase;

class PointsServiceTest extends TestCase
{
    public function testMatchResultResultPoints()
    {
        $service = $this->getService();

        $forecastResult = new ForecastResult(ForecastResult::MATCH_RESULT);

        $points = $service->getForecastResultPoints($forecastResult);

        $this->assertEquals(config('domain.points.result'), $points);
    }

    public function testMatchScoreResultPoints()
    {
        $service = $this->getService();

        $forecastResult = new ForecastResult(ForecastResult::MATCH_SCORE);

        $points = $service->getForecastResultPoints($forecastResult);

        $this->assertEquals(config('domain.points.result') + config('domain.points.score'), $points);
    }

    public function testNoMatchResultPoints()
    {
        $service = $this->getService();

        $forecastResult = new ForecastResult(ForecastResult::NO_MATCH);

        $points = $service->getForecastResultPoints($forecastResult);

        $this->assertEquals(0, $points);
    }

    /**
     * @return PointsService
     */
    private function getService()
    {
        return new PointsService();
    }
}
