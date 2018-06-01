<?php

namespace Prode\Domain;

use InvalidArgumentException;

class ForecastResult
{
    const MATCH_RESULT = 'match_result';
    const MATCH_SCORE = 'match_score';
    const NO_MATCH = 'no_match';

    private $results = [
        self::MATCH_RESULT,
        self::MATCH_SCORE,
        self::NO_MATCH,
    ];

    private $result;

    public function __construct($result)
    {
        $this->result = $this->validateAndParseOs($result);
    }

    /**
     * @return string
     */
    public function __toString()
    {
        return $this->result;
    }

    private function validateAndParseOs($result)
    {
        $normalizedResult = strtolower($result);

        if (!in_array($normalizedResult, $this->results)) {
            throw new InvalidArgumentException(sprintf('The Result [%s] is not valid.', $result));
        }

        return $normalizedResult;
    }
}
