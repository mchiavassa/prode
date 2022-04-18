<?php

namespace App\Models;

use InvalidArgumentException;

/**
 * Represents an asserted aspect of the game forecasted.
 */
class ForecastAssertion
{
    /**
     * Assertion of which team won, loose or if the game was tied.
     */
    const RESULT = 'result';

    /**
     * Assertion of the game score (goals from each team)
     */
    const SCORE = 'score';

    /**
     * Assertion of the tiebreak score (exact amount of penalties from each team)
     */
    const TIEBREAK_SCORE = 'tiebreak_score';

    /**
     * Assertion of existence of tiebreak in the game
     */
    const TIEBREAK_EXISTENCE = 'tiebreak_existence';

    private array $assertions = [
        self::RESULT,
        self::SCORE,
        self:: TIEBREAK_SCORE,
        self::TIEBREAK_EXISTENCE,
    ];

    private string $result;

    public function __construct($result)
    {
        $this->result = $this->validateAndParse($result);
    }

    public function __toString()
    {
        return $this->result;
    }

    private function validateAndParse($assertion): string
    {
        $normalizedAssertion = strtolower($assertion);

        if (!in_array($normalizedAssertion, $this->assertions)) {
            throw new InvalidArgumentException(sprintf('The assertion [%s] is not valid.', $assertion));
        }

        return $normalizedAssertion;
    }
}
