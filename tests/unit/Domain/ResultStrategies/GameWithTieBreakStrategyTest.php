<?php

namespace Test\unit\Domain\ResultStrategies;

use Prode\Domain\ForecastAssertion;
use Prode\Domain\Model\Forecast;
use Prode\Domain\Model\Game;
use Prode\Domain\ResultStrategies\GameWithTieBreakStrategy;
use Test\TestCase;

class GameWithTieBreakStrategyTest extends TestCase
{
    public function testResolveForecastAssertionsForFullMatch()
    {
        $strategy = $this->getStrategy();

        $forecast = new Forecast();
        $forecast->home_score = 3;
        $forecast->away_score = 3;
        $forecast->home_tie_break_score = 3;
        $forecast->away_tie_break_score = 5;

        $game = new Game();
        $game->home_score = 3;
        $game->away_score = 3;
        $game->home_tie_break_score = 3;
        $game->away_tie_break_score = 5;

        $assertions = $strategy->resolveForecastAssertions($forecast, $game);

        $this->assertTrue(in_array(ForecastAssertion::RESULT, $assertions->all()));
        $this->assertTrue(in_array(ForecastAssertion::SCORE, $assertions->all()));
        $this->assertTrue(in_array(ForecastAssertion::TIEBREAK_SCORE, $assertions->all()));
        $this->assertTrue(in_array(ForecastAssertion::TIEBREAK_EXISTENCE, $assertions->all()));
    }

    public function testResolveForecastAssertionsForResultAndTieBreakScore()
    {
        $strategy = $this->getStrategy();

        $forecast = new Forecast();
        $forecast->home_score = 1;
        $forecast->away_score = 1;
        $forecast->home_tie_break_score = 3;
        $forecast->away_tie_break_score = 5;

        $game = new Game();
        $game->home_score = 3;
        $game->away_score = 3;
        $game->home_tie_break_score = 3;
        $game->away_tie_break_score = 5;

        $assertions = $strategy->resolveForecastAssertions($forecast, $game);

        $this->assertTrue(in_array(ForecastAssertion::RESULT, $assertions->all()));
        $this->assertTrue(in_array(ForecastAssertion::TIEBREAK_SCORE, $assertions->all()));
        $this->assertTrue(in_array(ForecastAssertion::TIEBREAK_EXISTENCE, $assertions->all()));
    }

    public function testResolveForecastAssertionsForResultAndScore()
    {
        $strategy = $this->getStrategy();

        $forecast = new Forecast();
        $forecast->home_score = 3;
        $forecast->away_score = 3;
        $forecast->home_tie_break_score = 4;
        $forecast->away_tie_break_score = 6;

        $game = new Game();
        $game->home_score = 3;
        $game->away_score = 3;
        $game->home_tie_break_score = 3;
        $game->away_tie_break_score = 5;

        $assertions = $strategy->resolveForecastAssertions($forecast, $game);

        $this->assertTrue(in_array(ForecastAssertion::RESULT, $assertions->all()));
        $this->assertTrue(in_array(ForecastAssertion::SCORE, $assertions->all()));
        $this->assertTrue(in_array(ForecastAssertion::TIEBREAK_EXISTENCE, $assertions->all()));
    }

    public function testResolveForecastAssertionsForResult()
    {
        $strategy = $this->getStrategy();

        $forecast = new Forecast();
        $forecast->home_score = 1;
        $forecast->away_score = 1;
        $forecast->home_tie_break_score = 4;
        $forecast->away_tie_break_score = 6;

        $game = new Game();
        $game->home_score = 3;
        $game->away_score = 3;
        $game->home_tie_break_score = 3;
        $game->away_tie_break_score = 5;

        $assertions = $strategy->resolveForecastAssertions($forecast, $game);

        $this->assertTrue(in_array(ForecastAssertion::RESULT, $assertions->all()));
        $this->assertTrue(in_array(ForecastAssertion::TIEBREAK_EXISTENCE, $assertions->all()));
    }

    public function testResolveForecastAssertionsForScore()
    {
        $strategy = $this->getStrategy();

        $forecast = new Forecast();
        $forecast->home_score = 3;
        $forecast->away_score = 3;
        $forecast->home_tie_break_score = 6;
        $forecast->away_tie_break_score = 4;

        $game = new Game();
        $game->home_score = 3;
        $game->away_score = 3;
        $game->home_tie_break_score = 3;
        $game->away_tie_break_score = 5;

        $assertions = $strategy->resolveForecastAssertions($forecast, $game);

        $this->assertTrue(in_array(ForecastAssertion::SCORE, $assertions->all()));
    }

    public function testResolveForecastAssertionsForResultWithoutTieBreak()
    {
        $strategy = $this->getStrategy();

        $forecast = new Forecast();
        $forecast->home_score = 1;
        $forecast->away_score = 2;

        $game = new Game();
        $game->home_score = 3;
        $game->away_score = 3;
        $game->home_tie_break_score = 3;
        $game->away_tie_break_score = 5;

        $assertions = $strategy->resolveForecastAssertions($forecast, $game);

        $this->assertTrue(in_array(ForecastAssertion::RESULT, $assertions->all()));
    }

    public function testResolveForecastAssertionsForTieBreakExistenceOnly()
    {
        $strategy = $this->getStrategy();

        $forecast = new Forecast();
        $forecast->home_score = 2;
        $forecast->away_score = 2;
        $forecast->home_tie_break_score = 5;
        $forecast->away_tie_break_score = 3;

        $game = new Game();
        $game->home_score = 1;
        $game->away_score = 1;
        $game->home_tie_break_score = 3;
        $game->away_tie_break_score = 5;

        $assertions = $strategy->resolveForecastAssertions($forecast, $game);

        $this->assertTrue(in_array(ForecastAssertion::TIEBREAK_EXISTENCE, $assertions->all()));
    }

    public function testResolveForecastAssertionsForWrongResult()
    {
        $strategy = $this->getStrategy();

        $forecast = new Forecast();
        $forecast->home_score = 2;
        $forecast->away_score = 1;

        $game = new Game();
        $game->home_score = 1;
        $game->away_score = 1;
        $game->home_tie_break_score = 4;
        $game->away_tie_break_score = 5;

        $assertions = $strategy->resolveForecastAssertions($forecast, $game);

        $this->assertEquals([], $assertions->all());
    }

    /**
     * @return GameWithTieBreakStrategy
     */
    private function getStrategy()
    {
        return new GameWithTieBreakStrategy();
    }
}
