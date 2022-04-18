<?php

namespace App\Services\Auth;

use InvalidArgumentException;

class SocialNetworkProvider
{
    const FACEBOOK = 'facebook';
    const GOOGLE = 'google';
    const GITHUB = 'github';

    private $provider;

    private static $types = [
        self::FACEBOOK,
        self::GOOGLE,
        self::GITHUB
    ];

    public function __construct($provider)
    {
        $this->provider = $this->validateAndParse($provider);
    }

    public function __toString()
    {
        return $this->provider;
    }

    public static function isValid($provider)
    {
        return in_array(strtolower($provider), SocialNetworkProvider::$types);
    }

    private function validateAndParse($provider)
    {
        $normalizedProvider = strtolower($provider);

        if (!self::isValid($normalizedProvider)) {
            throw new InvalidArgumentException(sprintf('[%s] is not a valid provider.', $provider));
        }

        return $normalizedProvider;
    }
}
