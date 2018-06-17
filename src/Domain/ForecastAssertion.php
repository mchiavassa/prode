<?php

namespace Prode\Domain;

use InvalidArgumentException;

class ForecastAssertion
{
    const RESULT = 'result';
    const SCORE = 'score';
    const TIEBREAK_SCORE = 'tiebreak_score';
    const TIEBREAK_EXISTENCE = 'tiebreak_existence';

    private $assertions = [
        self::RESULT,
        self::SCORE,
        self:: TIEBREAK_SCORE,
        self::TIEBREAK_EXISTENCE,
    ];

    private $result;

    public function __construct($result)
    {
        $this->result = $this->validateAndParse($result);
    }

    /**
     * @return string
     */
    public function __toString()
    {
        return $this->result;
    }

    private function validateAndParse($assertion)
    {
        $normalizedAssertion = strtolower($assertion);

        if (!in_array($normalizedAssertion, $this->assertions)) {
            throw new InvalidArgumentException(sprintf('The assertion [%s] is not valid.', $assertion));
        }

        return $normalizedAssertion;
    }
}
