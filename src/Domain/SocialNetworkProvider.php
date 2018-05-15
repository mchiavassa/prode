<?php

namespace Prode\Domain;

use InvalidArgumentException;

class SocialNetworkProvider
{
    const FACEBOOK = 'facebook';
    const GOOGLE = 'google';

    private $provider;

    private $types = [
        self::FACEBOOK,
        self::GOOGLE,
    ];

    public function __construct($provider)
    {
        $this->provider = $this->validateAndParse($provider);
    }

    public function __toString()
    {
        return $this->provider;
    }

    private function validateAndParse($provider)
    {
        $normalizedProvider = strtolower($provider);

        if (!in_array($normalizedProvider, $this->types)) {
            throw new InvalidArgumentException(sprintf('[%s] is not a valid provider.', $provider));
        }

        return $normalizedProvider;
    }
}
