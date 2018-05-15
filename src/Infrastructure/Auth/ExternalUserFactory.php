<?php

namespace Prode\Infrastructure\Auth;

use Prode\Domain\SocialNetworkProvider;
use Prode\Infrastructure\Auth\Model\ExternalUser;
use Prode\Infrastructure\Auth\Model\FacebookUser;
use Prode\Infrastructure\Auth\Model\GoogleUser;
use Psr\Log\InvalidArgumentException;

class ExternalUserFactory
{
    /**
     * @param SocialNetworkProvider $provider
     * @param array $userData
     * @return ExternalUser
     */
    public static function createExternalUser(SocialNetworkProvider $provider, array $userData)
    {
        switch ((string) $provider) {
            case SocialNetworkProvider::FACEBOOK:
                return new FacebookUser(
                    array_get($userData, 'id'),
                    array_get($userData, 'email'),
                    array_get($userData, 'name'),
                    array_get($userData, 'avatar')
                );
            case SocialNetworkProvider::GOOGLE:
                return new GoogleUser(
                    array_get($userData, 'id'),
                    array_get($userData, 'email'),
                    array_get($userData, 'name'),
                    array_get($userData, 'avatar')
                );
            default:
                throw new InvalidArgumentException('Provided not supported.');
        }
    }
}
