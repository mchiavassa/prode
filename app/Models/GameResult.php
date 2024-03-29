<?php

namespace App\Models;

use InvalidArgumentException;

class GameResult
{
    const HOME_WINS = 'home_wins';
    const AWAY_WINS = 'away_wins';
    const TIED = 'tied';

    private int $homeScore;
    private int $awayScore;
    private ?int $homeTieBreakScore;
    private ?int $awayTieBreakScore;

    private function __construct(
        int $homeScore,
        int $awayScore,
        ?int $homeTieBreakScore = null,
        ?int $awayTieBreakScore = null
    )
    {
        $this->homeScore = $homeScore;
        $this->awayScore = $awayScore;
        $this->homeTieBreakScore = $homeTieBreakScore;
        $this->awayTieBreakScore = $awayTieBreakScore;
    }

    public static function resultIsValid(
        $homeScore,
        $awayScore,
        $tie_break_required,
        $homeTieBreakScore = null,
        $awayTieBreakScore = null
    ): bool
    {
        if ($homeScore === $awayScore && $tie_break_required) {
            return $homeTieBreakScore !== null && $awayTieBreakScore !== null && $homeTieBreakScore != $awayTieBreakScore;
        }

        return $homeTieBreakScore === null && $awayTieBreakScore === null;
    }

    public static function buildFromForecast(Forecast $forecast): GameResult
    {
        return new self(
            (int) $forecast->home_score,
            (int) $forecast->away_score,
            empty($forecast->home_tie_break_score) ? null : (int) $forecast->home_tie_break_score,
            empty($forecast->away_tie_break_score) ? null : (int) $forecast->away_tie_break_score
        );
    }

    public static function buildFromGame(Game $game): GameResult
    {
        return new self(
            (int) $game->home_score,
            (int) $game->away_score,
            empty($game->home_tie_break_score) ? null : (int) $game->home_tie_break_score,
            empty($game->away_tie_break_score) ? null : (int) $game->away_tie_break_score
        );
    }

    public function get(): string
    {
        if ($this->homeScore > $this->awayScore) {
            return self::HOME_WINS;
        }

        if ($this->homeScore < $this->awayScore) {
            return self::AWAY_WINS;
        }

        if (is_null($this->homeTieBreakScore) && is_null($this->awayTieBreakScore)) {
            return self::TIED;
        }

        if ($this->homeTieBreakScore > $this->awayTieBreakScore) {
            return self::HOME_WINS;
        }

        if ($this->homeTieBreakScore < $this->awayTieBreakScore) {
            return self::AWAY_WINS;
        }

        throw new InvalidArgumentException('Could not resolve result');
    }
}
