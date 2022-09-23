<?php

namespace App\Services\Auth;

use App\Models\User;
use App\Models\UserLogin;
use App\Models\UserTempToken;
use App\Services\UserService;
use App\Utils\DateTimes;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Hash;


class AuthService
{
    private User $user;
    private UserTempToken $userTempToken;
    private UserService $userService;

    public function __construct(User $user, UserTempToken $userTempToken, UserService $userService)
    {
        $this->user = $user;
        $this->userTempToken = $userTempToken;
        $this->userService = $userService;
    }

    public function authenticateUser(string $email, string $password): ?User
    {
        $user = $this->user->where('email', $email)->first();
        if (!empty($user) && $this->passwordIsValid($user, $password)) {
            return $user;
        }
        return null;
    }

    public function createAccount(string $name, string $email, string $password): ?User
    {
        $user = $this->getUserByEmail($email);

        // We don't allow creating another account with the same email.
        if (!empty($user)) {
            return null;
        }

        $user = new User();
        $user->name = $name;
        $user->email = $email;
        $user->password = Hash::make($password);
        $user->locale = App::getLocale();
        $user->save();

        $this->userService->sendEmailVerification($user);

        return $user;
    }

    public function recoverPassword(string $email)
    {
        $user = $this->getUserByEmail($email);

        if (empty($user)) {
            return;
        }

        $this->userService->sendPasswordRecoveryToken($user);
    }

    public function isValidPasswordRecoveryToken(string $token) : bool
    {
        /** @var UserTempToken $userToken */
        $userToken = $this->userTempToken
            ->where('token', $token)
            ->where('token_type', UserTempToken::TYPE_PASSWORD_RECOVERY)
            ->first();

        return !empty($userToken) && !$userToken->isExpired();
    }

    public function restorePassword(string $token, string $password)
    {
        /** @var UserTempToken $userToken */
        $userToken = $this->userTempToken
            ->with('user')
            ->where('token', $token)
            ->where('token_type', UserTempToken::TYPE_PASSWORD_RECOVERY)
            ->first();

        if (!empty($userToken) && !$userToken->isExpired()) {
            $userToken->user->password = Hash::make($password);
            $userToken->user->save();
            return true;
        }
        return false;
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
        $user->email_verified_at = DateTimes::now();
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

    private function passwordIsValid(User $user, string $password): bool
    {
        return !empty($user->password) && Hash::check($password, $user->password);
    }
}
