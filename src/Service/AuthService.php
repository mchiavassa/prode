<?php

namespace Prode\Service;

use Prode\Domain\Model\UserLogin;
use Prode\Domain\SocialNetworkProvider;
use Prode\Domain\Model\User;
use Prode\Infrastructure\Auth\Model\ExternalUser;

class AuthService
{
    private $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * @param ExternalUser $user
     * @param SocialNetworkProvider $provider Social auth provider
     *
     * @return User
     */
    public function findOrCreateUser(ExternalUser $user, SocialNetworkProvider $provider)
    {
        $authUser = $this->getUserWithLogin($provider, $user->getId());

        if ($authUser) {
            $authUser->name = $user->getName();
            $authUser->email = $user->getEmail();
            $authUser->picture_url = $user->getPictureUrl();
            $authUser->save();

            return $authUser;
        }

        return $this->registerExternalUser($user);
    }

    /**
     * @param SocialNetworkProvider $provider
     * @param $providerKey
     *
     * @return User|null
     */
    private function getUserWithLogin(SocialNetworkProvider $provider, $providerKey)
    {
        return $this->user
            ->with('logins')
            ->whereHas('logins', function ($query) use ($provider, $providerKey) {
                $query->where([
                    ['provider', $provider->__toString()],
                    ['provider_key', $providerKey],
                ]);
            })
            ->first();
    }

    /**
     * Registers an external user with a role.
     *
     * @param ExternalUser $externalUser
     *
     * @return User
     */
    private function registerExternalUser(ExternalUser $externalUser)
    {
        $user = new User();
        $user->name = $externalUser->getName();
        $user->email = $externalUser->getEmail();
        $user->picture_url = $externalUser->getPictureUrl();
        $user->save();

        $userLogin = new UserLogin();
        $userLogin->provider = $externalUser->getProvider();
        $userLogin->provider_key = $externalUser->getId();
        $user->logins()->save($userLogin);

        return $user;
    }
}
