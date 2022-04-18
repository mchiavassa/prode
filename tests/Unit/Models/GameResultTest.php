<?php

namespace Tests\Unit\Models;

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
}
