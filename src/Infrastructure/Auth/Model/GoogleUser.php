<?php

namespace Prode\Infrastructure\Auth\Model;

use Prode\Domain\SocialNetworkProvider;

class GoogleUser extends ExternalUser
{
    /**
     * @return string
     */
    public function getProvider()
    {
        return SocialNetworkProvider::GOOGLE;
    }
}
