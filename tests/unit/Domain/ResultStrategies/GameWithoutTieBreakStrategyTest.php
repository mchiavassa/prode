<?php

namespace Test\unit\Domain\ResultStrategies;

use Prode\Domain\ForecastAssertion;
use Prode\Domain\Model\Forecast;
use Prode\Domain\Model\Game;
use Prode\Domain\ResultStrategies\GameWithoutTieBreakStrategy;
use Test\TestCase;

class GameWithoutTieBreakStrategyTest extends TestCase
{
    public function testResolveForecastAssertionsForResult()
    {
        $strategy = $this->getStrategy();

        $forecast = new Forecast();
        $forecast->home_score = 1;
        $forecast->away_score = 8;

        $game = new Game();
        $game->home_score = 3;
        $game->away_score = 5;

        $assertions = $strategy->resolveForecastAssertions($forecast, $game);

        $this->assertEquals([ForecastAssertion::RESULT], $assertions->all());
    }

    public function testResolveForecastAssertionsForResultTied()
    {
        $strategy = $this->getStrategy();

        $forecast = new Forecast();
        $forecast->home_score = 1;
        $forecast->away_score = 1;

        $game = new Game();
        $game->home_score = 3;
        $game->away_score = 3;

        $assertions = $strategy->resolveForecastAssertions($forecast, $game);

        $this->assertEquals([ForecastAssertion::RESULT], $assertions->all());
    }

    public function testResolveForecastAssertionsForResultAndScore()
    {
        $strategy = $this->getStrategy();

        $forecast = new Forecast();
        $forecast->home_score = 1;
        $forecast->away_score = 8;

        $game = new Game();
        $game->home_score = 1;
        $game->away_score = 8;

        $assertions = $strategy->resolveForecastAssertions($forecast, $game);

        $this->assertEquals([ForecastAssertion::RESULT, ForecastAssertion::SCORE], $assertions->all());
    }

    public function testResolveForecastAssertionsForResultAndScoreTied()
    {
        $strategy = $this->getStrategy();

        $forecast = new Forecast();
        $forecast->home_score = 1;
        $forecast->away_score = 1;

        $game = new Game();
        $game->home_score = 1;
        $game->away_score = 1;

        $assertions = $strategy->resolveForecastAssertions($forecast, $game);

        $this->assertEquals([ForecastAssertion::RESULT, ForecastAssertion::SCORE], $assertions->all());
    }

    public function testResolveForecastAssertionsForWrongResult()
    {
        $strategy = $this->getStrategy();

        $forecast = new Forecast();
        $forecast->home_score = 1;
        $forecast->away_score = 2;

        $game = new Game();
        $game->home_score = 2;
        $game->away_score = 1;

        $assertions = $strategy->resolveForecastAssertions($forecast, $game);

        $this->assertEquals([], $assertions->all());
    }

    public function testResolveForecastAssertionsForResultWithForecastTieBreak()
    {
        $strategy = $this->getStrategy();

        $forecast = new Forecast();
        $forecast->home_score = 1;
        $forecast->away_score = 1;
        $forecast->home_tie_break_score = 4;
        $forecast->away_tie_break_score = 5;

        $game = new Game();
        $game->home_score = 3;
        $game->away_score = 5;

        $assertions = $strategy->resolveForecastAssertions($forecast, $game);

        $this->assertEquals([ForecastAssertion::RESULT], $assertions->all());
    }

    /**
     * @return GameWithoutTieBreakStrategy
     */
    private function getStrategy()
    {
        return new GameWithoutTieBreakStrategy();
    }
}
