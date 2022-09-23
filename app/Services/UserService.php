<?php

namespace App\Services;

use App\Models\Forecast;
use App\Models\Party;
use App\Models\PartyJoinRequest;
use App\Models\User;
use App\Models\UserLogin;
use App\Models\UserTempToken;
use App\Notifications\EmailVerification;
use App\Notifications\PasswordRecovery;
use App\Utils\DateTimes;
use Illuminate\Database\DatabaseManager;
use Illuminate\Support\Facades\Hash;
use Ramsey\Uuid\Uuid;

class UserService
{
    private DatabaseManager $db;
    private Party $party;
    private UserTempToken $userTempToken;
    private Forecast $forecast;
    private PartyJoinRequest $partyJoinRequest;
    private UserLogin $userLogin;

    public function __construct(
        DatabaseManager $db,
        Party $party,
        UserTempToken $userTempToken,
        Forecast $forecast,
        PartyJoinRequest $partyJoinRequest,
        UserLogin $userLogin
    )
    {
        $this->db = $db;
        $this->party = $party;
        $this->userTempToken = $userTempToken;
        $this->forecast = $forecast;
        $this->partyJoinRequest = $partyJoinRequest;
        $this->userLogin = $userLogin;
    }

    /**
     * Deletes a user with all their associated entities from the app
     */
    public function delete(User $user)
    {
        $this->db->connection()->transaction(function () use ($user) {
            $userParties = $this->party
                ->whereHas('users', function($query) use ($user) {
                    $query->where('user_id', $user->id);
                })
                ->get();

            /** @var Party $party */
            foreach ($userParties as $party) {

                // if user is the only one, delete group.
                if ($party->users->count() === 1) {
                    $party->users()->detach($user->id);
                    $party->delete();
                    continue;
                }

                $admins = $party->users()->wherePivot('is_admin', true);

                // if user was the only admin, then name another one as admin.
                if ($admins->count() === 1 && $admins->first()->id === $user->id) {
                    $otherUser = $party->users->where('id', '<>', $user->id)->first();
                    $party->users()->updateExistingPivot($otherUser->id, ['is_admin' => true]);
                }

                $party->users()->detach($user->id);
            }

            // delete all join requests
            $this->partyJoinRequest->where('user_id', $user->id)->delete();

            // delete all forecasts
            $this->forecast->where('user_id', $user->id)->delete();

            // delete all user logins
            $this->userLogin->where('user_id', $user->id)->delete();

            // delete all tokens
            $this->userTempToken->where('user_id', $user->id)->delete();

            // delete user
            $user->delete();
        });
    }

    public function sendEmailVerification(User $user)
    {
        if ($user->emailIsVerified()) {
            return;
        }

        /** @var UserTempToken $userToken */
        $userToken = $this->userTempToken
            ->where('user_id', $user->id)
            ->where('token_type', UserTempToken::TYPE_EMAIL_CONFIRMATION)
            ->first();

        if (empty($userToken)) {
            $userToken = new UserTempToken();
        } else if (!$userToken->isExpired()) {
            return; // if the current token is not expired, we don't send another notification
        }

        $userToken->created_at = DateTimes::now();
        $userToken->token_type = UserTempToken::TYPE_EMAIL_CONFIRMATION;
        $token = Uuid::uuid4();
        $userToken->token = $token;
        $user->tokens()->save($userToken);

        $user->notify(new EmailVerification($token));
    }

    public function sendPasswordRecoveryToken(User $user)
    {
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

    public function verifyEmail($userId, string $token) : bool
    {
        $userToken = $this->userTempToken
            ->with('user')
            ->where('user_id', $userId)
            ->where('token_type', UserTempToken::TYPE_EMAIL_CONFIRMATION)
            ->first();

        $validToken = !empty($userToken) && $userToken->token == $token && !$userToken->isExpired();

        if ($validToken) {
            $userToken->user->email_verified_at = DateTimes::now();
            $userToken->user->save();
            $userToken->delete();
        }

        return $validToken;
    }

    public function updateProfile($user, $name, $password)
    {
        $user->name = $name;

        // only change password if it's present
        if (!empty($password)) {
            $user->password = Hash::make($password);
        }

        $user->save();
    }
}
