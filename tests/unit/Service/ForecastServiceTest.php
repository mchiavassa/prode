<?php

namespace Test\unit\Service;

use Illuminate\Database\DatabaseManager;
use Mockery;
use Prode\Domain\ForecastResult;
use Prode\Domain\Model\Forecast;
use Prode\Domain\Model\Game;
use Prode\Service\ForecastService;
use Prode\Service\PointsService;
use Test\TestCase;

class ForecastServiceTest extends TestCase
{
    public function testMatchResultResultForResult()
    {
        $service = $this->getService();

        $forecast = new Forecast();
        $forecast->home_score = 1;
        $forecast->away_score = 8;

        $game = new Game();
        $game->home_score = 3;
        $game->away_score = 5;

        $result = $service->resolveForecastResult($forecast, $game);

        $this->assertEquals((string) (new ForecastResult(ForecastResult::MATCH_RESULT)), (string) $result);
    }

    public function testMatchResultResultForResultTied()
    {
        $service = $this->getService();

        $forecast = new Forecast();
        $forecast->home_score = 1;
        $forecast->away_score = 1;

        $game = new Game();
        $game->home_score = 3;
        $game->away_score = 3;

        $result = $service->resolveForecastResult($forecast, $game);

        $this->assertEquals((string) (new ForecastResult(ForecastResult::MATCH_RESULT)), (string) $result);
    }

    public function testMatchResultResultForResultWithForecastTieBreak()
    {
        $service = $this->getService();

        $forecast = new Forecast();
        $forecast->home_score = 1;
        $forecast->away_score = 1;
        $forecast->home_tie_break_score = 4;
        $forecast->away_tie_break_score = 5;

        $game = new Game();
        $game->home_score = 3;
        $game->away_score = 5;

        $result = $service->resolveForecastResult($forecast, $game);

        $this->assertEquals((string) (new ForecastResult(ForecastResult::MATCH_RESULT)), (string) $result);
    }

    public function testMatchResultResultForResultWithGameTieBreak()
    {
        $service = $this->getService();

        $forecast = new Forecast();
        $forecast->home_score = 1;
        $forecast->away_score = 2;

        $game = new Game();
        $game->home_score = 3;
        $game->away_score = 3;
        $game->home_tie_break_score = 4;
        $game->away_tie_break_score = 5;

        $result = $service->resolveForecastResult($forecast, $game);

        $this->assertEquals((string) (new ForecastResult(ForecastResult::MATCH_RESULT)), (string) $result);
    }


    public function testMatchScoreResultForResultAndScore()
    {
        $service = $this->getService();

        $forecast = new Forecast();
        $forecast->home_score = 1;
        $forecast->away_score = 8;

        $game = new Game();
        $game->home_score = 1;
        $game->away_score = 8;

        $result = $service->resolveForecastResult($forecast, $game);

        $this->assertEquals((string) (new ForecastResult(ForecastResult::MATCH_SCORE)), (string) $result);
    }

    public function testMatchScoreResultForResultAndScoreTied()
    {
        $service = $this->getService();

        $forecast = new Forecast();
        $forecast->home_score = 1;
        $forecast->away_score = 1;

        $game = new Game();
        $game->home_score = 1;
        $game->away_score = 1;

        $result = $service->resolveForecastResult($forecast, $game);

        $this->assertEquals((string) (new ForecastResult(ForecastResult::MATCH_SCORE)), (string) $result);
    }

    public function testMatchScoreResultForResultAndScoreWithTieBreak()
    {
        $service = $this->getService();

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

        $result = $service->resolveForecastResult($forecast, $game);

        $this->assertEquals((string) (new ForecastResult(ForecastResult::MATCH_SCORE)), (string) $result);
    }

    public function testNoMatchResult()
    {
        $service = $this->getService();

        $forecast = new Forecast();
        $forecast->home_score = 1;
        $forecast->away_score = 2;

        $game = new Game();
        $game->home_score = 2;
        $game->away_score = 1;

        $result = $service->resolveForecastResult($forecast, $game);

        $this->assertEquals((string) (new ForecastResult(ForecastResult::NO_MATCH)), (string) $result);
    }

    public function testNoMatchResultWithTieBreak()
    {
        $service = $this->getService();

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

        $result = $service->resolveForecastResult($forecast, $game);

        $this->assertEquals((string) (new ForecastResult(ForecastResult::NO_MATCH)), (string) $result);
    }

    /**
     * @return ForecastService
     */
    private function getService()
    {
        return new ForecastService(
            Mockery::mock(PointsService::class),
            Mockery::mock(DatabaseManager::class),
            Mockery::mock(Forecast::class)
        );
    }
}
