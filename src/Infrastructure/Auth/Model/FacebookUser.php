<?php

namespace Prode\Infrastructure\Auth\Model;

use Prode\Domain\SocialNetworkProvider;

class FacebookUser extends ExternalUser
{
    /**
     * @return string
     */
    public function getProvider()
    {
        return SocialNetworkProvider::FACEBOOK;
    }
}
