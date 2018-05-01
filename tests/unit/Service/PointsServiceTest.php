<?php

namespace Test\unit\Service;

use Prode\Domain\Model\Forecast;
use Prode\Domain\Model\Game;
use Prode\Service\PointsService;
use Test\TestCase;

class PointsServiceTest extends TestCase
{
    public function testPointsForResult()
    {
        $service = new PointsService();

        $forecast = new Forecast();
        $forecast->home_score = 1;
        $forecast->away_score = 8;

        $game = new Game();
        $game->home_score = 3;
        $game->away_score = 5;

        $points = $service->resolveForecastPoints($forecast, $game);

        $this->assertEquals(config('domain.points.result'), $points);
    }

    public function testPointsForResultTied()
    {
        $service = new PointsService();

        $forecast = new Forecast();
        $forecast->home_score = 1;
        $forecast->away_score = 1;

        $game = new Game();
        $game->home_score = 3;
        $game->away_score = 3;

        $points = $service->resolveForecastPoints($forecast, $game);

        $this->assertEquals(config('domain.points.result'), $points);
    }

    public function testPointsForResultWithForecastTieBreak()
    {
        $service = new PointsService();

        $forecast = new Forecast();
        $forecast->home_score = 1;
        $forecast->away_score = 1;
        $forecast->home_tie_break_score = 4;
        $forecast->away_tie_break_score = 5;

        $game = new Game();
        $game->home_score = 3;
        $game->away_score = 5;

        $points = $service->resolveForecastPoints($forecast, $game);

        $this->assertEquals(config('domain.points.result'), $points);
    }

    public function testPointsForResultWithGameTieBreak()
    {
        $service = new PointsService();

        $forecast = new Forecast();
        $forecast->home_score = 1;
        $forecast->away_score = 2;

        $game = new Game();
        $game->home_score = 3;
        $game->away_score = 3;
        $game->home_tie_break_score = 4;
        $game->away_tie_break_score = 5;

        $points = $service->resolveForecastPoints($forecast, $game);

        $this->assertEquals(config('domain.points.result'), $points);
    }


    public function testPointsForResultAndScore()
    {
        $service = new PointsService();

        $forecast = new Forecast();
        $forecast->home_score = 1;
        $forecast->away_score = 8;

        $game = new Game();
        $game->home_score = 1;
        $game->away_score = 8;

        $points = $service->resolveForecastPoints($forecast, $game);

        $this->assertEquals(config('domain.points.result') + config('domain.points.score'), $points);
    }

    public function testPointsForResultAndScoreTied()
    {
        $service = new PointsService();

        $forecast = new Forecast();
        $forecast->home_score = 1;
        $forecast->away_score = 1;

        $game = new Game();
        $game->home_score = 1;
        $game->away_score = 1;

        $points = $service->resolveForecastPoints($forecast, $game);

        $this->assertEquals(config('domain.points.result') + config('domain.points.score'), $points);
    }

    public function testPointsForResultAndScoreWithTieBreak()
    {
        $service = new PointsService();

        $forecast = new Forecast();
        $forecast->home_score = 1;
        $forecast->away_score = 1;
        $forecast->home_tie_break_score = 4;
        $forecast->away_tie_break_score = 5;

        $game = new Game();
        $game->home_score = 1;
        $game->away_score = 1;
        $game->home_tie_break_score = 4;
        $game->away_tie_break_score = 5;

        $points = $service->resolveForecastPoints($forecast, $game);

        $this->assertEquals(config('domain.points.result') + config('domain.points.score'), $points);
    }

    public function testNoPoints()
    {
        $service = new PointsService();

        $forecast = new Forecast();
        $forecast->home_score = 1;
        $forecast->away_score = 2;

        $game = new Game();
        $game->home_score = 2;
        $game->away_score = 1;

        $points = $service->resolveForecastPoints($forecast, $game);

        $this->assertEquals(0, $points);
    }

    public function testNoPointsWithTieBreak()
    {
        $service = new PointsService();

        $forecast = new Forecast();
        $forecast->home_score = 1;
        $forecast->away_score = 1;
        $forecast->home_tie_break_score = 5;
        $forecast->away_tie_break_score = 2;

        $game = new Game();
        $game->home_score = 1;
        $game->away_score = 1;
        $game->home_tie_break_score = 4;
        $game->away_tie_break_score = 5;

        $points = $service->resolveForecastPoints($forecast, $game);

        $this->assertEquals(0, $points);
    }
}
