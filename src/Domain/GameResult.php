<?php

namespace Prode\Domain;

use InvalidArgumentException;
use Prode\Domain\Model\Forecast;
use Prode\Domain\Model\Game;

class GameResult
{
    const HOME_WINS = 'home_wins';
    const AWAY_WINS = 'away_wins';
    const TIED = 'tied';

    private $homeScore;
    private $awayScore;
    private $homeTieBreakScore;
    private $awayTieBreakScore;

    /**
     * Result constructor.
     * @param $homeScore
     * @param $awayScore
     * @param null $homeTieBreakScore
     * @param null $awayTieBreakScore
     */
    private function __construct($homeScore, $awayScore, $homeTieBreakScore = null, $awayTieBreakScore = null)
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
    ) {
        if ($homeScore === $awayScore && $tie_break_required) {
            return $homeTieBreakScore !== null && $awayTieBreakScore !== null && $homeTieBreakScore != $awayTieBreakScore;
        }

        return $homeTieBreakScore == null && $awayTieBreakScore == null;
    }

    /**
     * @param Forecast $forecast
     * @return GameResult
     */
    public static function buildFromForecast(Forecast $forecast)
    {
        return new self(
            $forecast->home_score,
            $forecast->away_score,
            $forecast->home_tie_break_score,
            $forecast->away_tie_break_score
        );
    }

    public static function buildFromGame(Game $game)
    {
        return new self(
            $game->home_score,
            $game->away_score,
            $game->home_tie_break_score,
            $game->away_tie_break_score
        );
    }

    /**
     * @return string result
     */
    public function get()
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
