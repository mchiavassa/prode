<?php

namespace App\Services\Auth;

use App\Models\User;
use App\Models\UserLogin;
use App\Models\UserTempToken;
use App\Notifications\PasswordRecovery;
use App\Services\UserService;
use App\Utils\DateTimes;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Hash;
use Ramsey\Uuid\Uuid;


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

    public function isValidPasswordRecoveryToken(string $token) : bool
    {
        /** @var UserTempToken $userToken */
        $userToken = $this->userTempToken
            ->where('token', $token)
            ->where('token_type', UserTempToken::TYPE_PASSWORD_RECOVERY)
            ->first();

        return !empty($userToken) && !$userToken->isExpired();
    }

    public function recoverPassword(string $email): void
    {
        $user = $this->user->where('email', $email)->first();

        if (empty($user)) {
            return;
        }

        if (!$user->emailIsVerified()) {
            return;
        }

        /** @var UserTempToken $userToken */
        $userToken = $this->userTempToken
            ->where('user_id', $user->id)
            ->where('token_type', UserTempToken::TYPE_PASSWORD_RECOVERY)
            ->first();

        if (empty($userToken)) {
            $userToken = new UserTempToken();
        } else if (!$userToken->isExpired()) {
            return; // if the current token is not expired, we don't send another one
        }

        $userToken->created_at = DateTimes::now();
        $userToken->token_type = UserTempToken::TYPE_PASSWORD_RECOVERY;
        $token = Uuid::uuid4();
        $userToken->token = $token;
        $user->tokens()->save($userToken);

        $user->notify(new PasswordRecovery($token));
    }

    public function restorePassword(string $token, string $password): bool
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

            $userToken->delete();

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

        $userUpdated = false;

        if (empty($providerLogin)) {
            $this->addProviderLogin($user, $externalUser);
        } else {
            $user->picture_url = $externalUser->getPictureUrl();
            $userUpdated = true;
        }

        // a login with external provider validates the email
        if (!$user->emailIsVerified()) {
            $user->email_verified_at = DateTimes::now();
            $userUpdated = true;
        }

        if ($userUpdated) {
            $user->save();
        }

        return $user;
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

    private function addProviderLogin(User $user, ExternalUser $externalUser): void
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

    private function getUserByEmail(string $email): ?User
    {
        return $this->user
            ->withTrashed()
            ->with('logins')
            ->where('email', $email)
            ->first();
    }
}
