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
     * @param ExternalUser $externalUser
     * @param SocialNetworkProvider $provider Social auth provider
     *
     * @return User
     */
    public function findOrCreateUser(ExternalUser $externalUser, SocialNetworkProvider $provider)
    {
        $user = $this->getUserWithLogin($provider, $externalUser->getId());

        if (empty($user)) {
            $user = $this->getUserByEmail($externalUser->getEmail());

            if (empty($user)) {
                return $this->registerExternalUser($externalUser);
            }
        }

        $providerLogin = $user->logins
            ->where('provider', (string) $provider)
            ->where('provider_key', $externalUser->getId())
            ->first();

        if (empty($providerLogin)) {
            $this->addProviderLogin($user, $externalUser);
        } else {
            $user->name = $externalUser->getName();
            $user->picture_url = $externalUser->getPictureUrl();
            $user->save();
        }

        return $user;
    }

    /**
     * @param $email
     *
     * @return User|null
     */
    private function getUserByEmail($email)
    {
        return $this->user
            ->with('logins')
            ->where('email', $email)
            ->first();
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

        $this->addProviderLogin($user, $externalUser);

        return $user;
    }

    /**
     * @param User $user
     * @param ExternalUser $externalUser
     */
    private function addProviderLogin(User $user, ExternalUser $externalUser)
    {
        $userLogin = new UserLogin();
        $userLogin->provider = $externalUser->getProvider();
        $userLogin->provider_key = $externalUser->getId();

        $user->logins()->save($userLogin);
    }
}
