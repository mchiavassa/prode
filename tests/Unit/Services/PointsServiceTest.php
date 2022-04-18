<?php

namespace Tests\Unit\Services;

use App\Models\ForecastAssertion;
use App\Services\PointsService;
use Tests\TestCase;

class PointsServiceTest extends TestCase
{
    public function testGetAssertionsPointsResult()
    {
        $service = $this->getService();

        $points = $service->getAssertionsPoints(collect(ForecastAssertion::RESULT));

        $this->assertEquals(config('domain.points.result'), $points);
    }

    public function testGetAssertionsPointsScore()
    {
        $service = $this->getService();

        $points = $service->getAssertionsPoints(collect(ForecastAssertion::SCORE));

        $this->assertEquals(config('domain.points.score'), $points);
    }

    public function testGetAssertionsPointsTieBreakScore()
    {
        $service = $this->getService();

        $points = $service->getAssertionsPoints(collect(ForecastAssertion::TIEBREAK_SCORE));

        $this->assertEquals(config('domain.points.tiebreak_score'), $points);
    }

    public function testGetAssertionsPointsTieBreakExistence()
    {
        $service = $this->getService();

        $points = $service->getAssertionsPoints(collect(ForecastAssertion::TIEBREAK_EXISTENCE));

        $this->assertEquals(config('domain.points.tiebreak_existence'), $points);
    }

    public function testGetAssertionsPointsSum()
    {
        $service = $this->getService();

        $points = $service->getAssertionsPoints(collect([ForecastAssertion::RESULT, ForecastAssertion::SCORE]));

        $this->assertEquals(config('domain.points.result') + config('domain.points.score'), $points);
    }

    public function testGetAssertionsPointsNoAssertions()
    {
        $service = $this->getService();

        $points = $service->getAssertionsPoints(collect());

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
