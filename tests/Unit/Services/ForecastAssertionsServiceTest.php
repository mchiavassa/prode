<?php

namespace Tests\Unit\Services;

use App\Models\Forecast;
use App\Models\ForecastAssertion;
use App\Models\Game;
use App\Services\ForecastAssertionsService;
use Tests\TestCase;

class ForecastAssertionsServiceTest extends TestCase
{
    public function testRightResultWithoutTieBreak()
    {
        $service = $this->getService();

        $forecast = new Forecast();
        $forecast->home_score = 1;
        $forecast->away_score = 8;

        $game = new Game();
        $game->home_score = 3;
        $game->away_score = 5;

        $assertions = $service->resolveForecastAssertions($forecast, $game);

        $this->assertEquals([ForecastAssertion::RESULT], $assertions->all());
    }

    public function testRightResultWithTieBreakGuess()
    {
        $service = $this->getService();

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

        $assertions = $service->resolveForecastAssertions($forecast, $game);

        $this->assertEquals([ForecastAssertion::RESULT, ForecastAssertion::TIEBREAK_EXISTENCE], $assertions->all());
    }

    public function testRightResultWithoutTieBreakGuess()
    {
        $service = $this->getService();

        $forecast = new Forecast();
        $forecast->home_score = 1;
        $forecast->away_score = 2;

        $game = new Game();
        $game->home_score = 3;
        $game->away_score = 3;
        $game->home_tie_break_score = 3;
        $game->away_tie_break_score = 5;

        $assertions = $service->resolveForecastAssertions($forecast, $game);

        $this->assertEquals([ForecastAssertion::RESULT], $assertions->all());
    }

    public function testRightResultAndForecastWithTieBreak()
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

        $assertions = $service->resolveForecastAssertions($forecast, $game);

        $this->assertEquals([ForecastAssertion::RESULT], $assertions->all());
    }

    public function testRightResultTied()
    {
        $service = $this->getService();

        $forecast = new Forecast();
        $forecast->home_score = 1;
        $forecast->away_score = 1;

        $game = new Game();
        $game->home_score = 3;
        $game->away_score = 3;

        $assertions = $service->resolveForecastAssertions($forecast, $game);

        $this->assertEquals([ForecastAssertion::RESULT], $assertions->all());
    }

    public function testRightResultAndTieBreakGuessAndTieBreakScoreGuess()
    {
        $service = $this->getService();

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

        $assertions = $service->resolveForecastAssertions($forecast, $game);

        $this->assertEquals(
            [ForecastAssertion::RESULT, ForecastAssertion::TIEBREAK_EXISTENCE, ForecastAssertion::TIEBREAK_SCORE],
            $assertions->all()
        );
    }

    public function testRightResultAndScoreGuess()
    {
        $service = $this->getService();

        $forecast = new Forecast();
        $forecast->home_score = 1;
        $forecast->away_score = 8;

        $game = new Game();
        $game->home_score = 1;
        $game->away_score = 8;

        $assertions = $service->resolveForecastAssertions($forecast, $game);

        $this->assertEquals([ForecastAssertion::RESULT, ForecastAssertion::SCORE], $assertions->all());
    }

    public function testRightResultAndTeamScoreGuess()
    {
        $service = $this->getService();

        $forecast = new Forecast();
        $forecast->home_score = 1;
        $forecast->away_score = 9;

        $game = new Game();
        $game->home_score = 1;
        $game->away_score = 8;

        $assertions = $service->resolveForecastAssertions($forecast, $game);

        $this->assertEquals([ForecastAssertion::RESULT, ForecastAssertion::TEAM_SCORE], $assertions->all());
    }

    public function testRightResultAndScoreAndTieBreakGuess()
    {
        $service = $this->getService();

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

        $assertions = $service->resolveForecastAssertions($forecast, $game);

        $this->assertEquals(
            [ForecastAssertion::RESULT, ForecastAssertion::SCORE, ForecastAssertion::TIEBREAK_EXISTENCE],
            $assertions->all()
        );
    }

    public function testRightResultAndScoreTiedGuess()
    {
        $service = $this->getService();

        $forecast = new Forecast();
        $forecast->home_score = 1;
        $forecast->away_score = 1;

        $game = new Game();
        $game->home_score = 1;
        $game->away_score = 1;

        $assertions = $service->resolveForecastAssertions($forecast, $game);

        $this->assertEquals([ForecastAssertion::RESULT, ForecastAssertion::SCORE], $assertions->all());
    }

    public function testWrongResult()
    {
        $service = $this->getService();

        $forecast = new Forecast();
        $forecast->home_score = 1;
        $forecast->away_score = 2;

        $game = new Game();
        $game->home_score = 2;
        $game->away_score = 1;

        $assertions = $service->resolveForecastAssertions($forecast, $game);

        $this->assertEquals([], $assertions->all());
    }

    public function testWrongResultWithTeamScoreGuess()
    {
        $service = $this->getService();

        $forecast = new Forecast();
        $forecast->home_score = 1;
        $forecast->away_score = 0;

        $game = new Game();
        $game->home_score = 1;
        $game->away_score = 2;

        $assertions = $service->resolveForecastAssertions($forecast, $game);

        $this->assertEquals([ForecastAssertion::TEAM_SCORE], $assertions->all());
    }

    public function testWrongResultWithTieBreakGuess()
    {
        $service = $this->getService();

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

        $assertions = $service->resolveForecastAssertions($forecast, $game);

        $this->assertEquals([ForecastAssertion::TIEBREAK_EXISTENCE], $assertions->all());
    }

    public function testWrongResultWithTieBreakMissButTeamScore()
    {
        $service = $this->getService();

        $forecast = new Forecast();
        $forecast->home_score = 2;
        $forecast->away_score = 1;

        $game = new Game();
        $game->home_score = 1;
        $game->away_score = 1;
        $game->home_tie_break_score = 4;
        $game->away_tie_break_score = 5;

        $assertions = $service->resolveForecastAssertions($forecast, $game);

        $this->assertEquals([ForecastAssertion::TEAM_SCORE], $assertions->all());
    }

    public function testWrongResultAndRightScore()
    {
        $service = $this->getService();

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

        $assertions = $service->resolveForecastAssertions($forecast, $game);

        $this->assertEquals([ForecastAssertion::SCORE, ForecastAssertion::TIEBREAK_EXISTENCE], $assertions->all());
    }

    public function testExactGuess()
    {
        $service = $this->getService();

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

        $assertions = $service->resolveForecastAssertions($forecast, $game);

        $this->assertEquals(
            [
                ForecastAssertion::RESULT,
                ForecastAssertion::SCORE,
                ForecastAssertion::TIEBREAK_EXISTENCE,
                ForecastAssertion::TIEBREAK_SCORE
            ],
            $assertions->all()
        );
    }

    /**
     * @return ForecastAssertionsService
     */
    private function getService()
    {
        return new ForecastAssertionsService();
    }
}
