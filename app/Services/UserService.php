<?php

namespace App\Services;

use App\Models\Forecast;
use App\Models\Party;
use App\Models\PartyJoinRequest;
use App\Models\User;
use App\Models\UserLogin;
use Illuminate\Database\DatabaseManager;

class UserService
{
    private DatabaseManager $db;
    private Party $party;
    private Forecast $forecast;
    private PartyJoinRequest $partyJoinRequest;
    private UserLogin $userLogin;

    public function __construct(
        DatabaseManager $db,
        Party $party,
        Forecast $forecast,
        PartyJoinRequest $partyJoinRequest,
        UserLogin $userLogin
    )
    {
        $this->db = $db;
        $this->party = $party;
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

            // delete user
            $user->delete();
        });
    }
}
