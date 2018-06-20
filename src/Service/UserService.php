<?php

namespace Prode\Service;

use Illuminate\Database\DatabaseManager;
use Prode\Domain\Model\Forecast;
use Prode\Domain\Model\Party;
use Prode\Domain\Model\PartyJoinRequest;
use Prode\Domain\Model\User;
use Prode\Domain\Model\UserLogin;

class UserService
{
    private $db;
    private $user;
    private $party;
    private $forecast;
    private $partyJoinRequest;
    private $userLogin;

    public function __construct(
        DatabaseManager $db,
        User $user,
        Party $party,
        Forecast $forecast,
        PartyJoinRequest $partyJoinRequest,
        UserLogin $userLogin
    )
    {
        $this->db = $db;
        $this->user = $user;
        $this->party = $party;
        $this->forecast = $forecast;
        $this->partyJoinRequest = $partyJoinRequest;
        $this->userLogin = $userLogin;
    }

    /**
     * @param User $user
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
