<?php

namespace Tests\Unit\Models;

use App\Models\Forecast;
use App\Models\Game;
use App\Models\GameResult;
use Tests\TestCase;

class GameResultTest extends TestCase
{
    public function testTieBreakResultsInvalid()
    {
        $this->assertFalse(GameResult::resultIsValid(1, 1, true));
        $this->assertFalse(GameResult::resultIsValid(1, 1, true, 1, 1));
        $this->assertFalse(GameResult::resultIsValid(2, 1, true, 1, 1));
        $this->assertFalse(GameResult::resultIsValid(1, 2, true, 1, 1));
        $this->assertFalse(GameResult::resultIsValid(1, 2, true, 1, 2));
        $this->assertFalse(GameResult::resultIsValid(1, 2, true, 0, 0));
        $this->assertFalse(GameResult::resultIsValid(1, 2, true, null, 0));
        $this->assertFalse(GameResult::resultIsValid(1, 2, true, 0, null));
    }

    public function testTieBreakResultsValid()
    {
        $this->assertTrue(GameResult::resultIsValid(1, 2, true));
        $this->assertTrue(GameResult::resultIsValid(1, 1, true, 1, 2));
        $this->assertTrue(GameResult::resultIsValid(1, 1, true, 2, 1));
        $this->assertTrue(GameResult::resultIsValid(1, 1, true, 2, 0));
    }

    public function testNonTieBreakResultsInvalid()
    {
        $this->assertFalse(GameResult::resultIsValid(2, 1, false, 1, 1));
        $this->assertFalse(GameResult::resultIsValid(1, 2, false, 1, 1));
        $this->assertFalse(GameResult::resultIsValid(1, 1, false, 2, 1));
        $this->assertFalse(GameResult::resultIsValid(1, 1, false, 1, 2));
    }

    public function testNonTieBreakResultsValid()
    {
        $this->assertTrue(GameResult::resultIsValid(1, 2, false));
        $this->assertTrue(GameResult::resultIsValid(2, 1, false));
        $this->assertTrue(GameResult::resultIsValid(2, 2, false));
    }

    public function testGameResults()
    {
        $game = new Game();
        $game->home_score = 2;
        $game->away_score = 1;
        $game->home_tie_break_score = '';
        $game->away_tie_break_score = '';

        $result = GameResult::buildFromGame($game);
        $this->assertEquals(GameResult::HOME_WINS, $result->get());

        $game2 = new Game();
        $game2->home_score = 0;
        $game2->away_score = 3;
        $game2->home_tie_break_score = '';
        $game2->away_tie_break_score = '';

        $result2 = GameResult::buildFromGame($game2);
        $this->assertEquals(GameResult::AWAY_WINS, $result2->get());

        $game3 = new Game();
        $game3->home_score = 1;
        $game3->away_score = 1;
        $game3->home_tie_break_score = null;
        $game3->away_tie_break_score = null;

        $result3 = GameResult::buildFromGame($game3);
        $this->assertEquals(GameResult::TIED, $result3->get());

        $game4 = new Game();
        $game4->home_score = 1;
        $game4->away_score = 1;
        $game4->home_tie_break_score = 5;
        $game4->away_tie_break_score = 4;

        $result4 = GameResult::buildFromGame($game4);
        $this->assertEquals(GameResult::HOME_WINS, $result4->get());

        $game5 = new Game();
        $game5->home_score = 1;
        $game5->away_score = 1;
        $game5->home_tie_break_score = 3;
        $game5->away_tie_break_score = 4;

        $result5 = GameResult::buildFromGame($game5);
        $this->assertEquals(GameResult::AWAY_WINS, $result5->get());
    }

    public function testForecastResults()
    {
        $forecast = new Forecast();
        $forecast->home_score = 2;
        $forecast->away_score = 1;
        $forecast->home_tie_break_score = '';
        $forecast->away_tie_break_score = '';

        $result = GameResult::buildFromForecast($forecast);
        $this->assertEquals(GameResult::HOME_WINS, $result->get());

        $forecast2 = new Forecast();
        $forecast2->home_score = 0;
        $forecast2->away_score = 3;
        $forecast2->home_tie_break_score = '';
        $forecast2->away_tie_break_score = '';

        $result2 = GameResult::buildFromForecast($forecast2);
        $this->assertEquals(GameResult::AWAY_WINS, $result2->get());

        $forecast3 = new Forecast();
        $forecast3->home_score = 1;
        $forecast3->away_score = 1;
        $forecast3->home_tie_break_score = null;
        $forecast3->away_tie_break_score = null;

        $result3 = GameResult::buildFromForecast($forecast3);
        $this->assertEquals(GameResult::TIED, $result3->get());

        $forecast4 = new Forecast();
        $forecast4->home_score = 1;
        $forecast4->away_score = 1;
        $forecast4->home_tie_break_score = 5;
        $forecast4->away_tie_break_score = 4;

        $result4 = GameResult::buildFromForecast($forecast4);
        $this->assertEquals(GameResult::HOME_WINS, $result4->get());

        $forecast5 = new Forecast();
        $forecast5->home_score = 1;
        $forecast5->away_score = 1;
        $forecast5->home_tie_break_score = 3;
        $forecast5->away_tie_break_score = 4;

        $result5 = GameResult::buildFromForecast($forecast5);
        $this->assertEquals(GameResult::AWAY_WINS, $result5->get());
    }
}
