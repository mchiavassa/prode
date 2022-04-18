<?php

namespace App\Services\Auth;

use App\Models\User;
use App\Models\UserLogin;
use Illuminate\Support\Facades\App;


class AuthService
{
    private User $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function findOrCreateUser(ExternalUser $externalUser, SocialNetworkProvider $provider): User
    {
        $user = $this->getUserWithLogin($provider, $externalUser->getId());

        if (empty($user)) {
            $user = $this->getUserByEmail($externalUser->getEmail());

            if (empty($user)) {
                return $this->registerExternalUser($externalUser);
            }

            if ($user->trashed()) {
                $user->restore();
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

    private function getUserByEmail(string $email): ?User
    {
        return $this->user
            ->withTrashed()
            ->with('logins')
            ->where('email', $email)
            ->first();
    }

    private function getUserWithLogin(SocialNetworkProvider $provider, string $providerKey): ?User
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
     */
    private function registerExternalUser(ExternalUser $externalUser): User
    {
        $user = new User();
        $user->name = $externalUser->getName();
        $user->email = $externalUser->getEmail();
        $user->picture_url = $externalUser->getPictureUrl();
        $user->locale = App::getLocale();
        $user->save();

        $this->addProviderLogin($user, $externalUser);

        return $user;
    }

    private function addProviderLogin(User $user, ExternalUser $externalUser)
    {
        $userLogin = new UserLogin();
        $userLogin->provider = $externalUser->getProvider();
        $userLogin->provider_key = $externalUser->getId();

        $user->logins()->save($userLogin);
    }
}
