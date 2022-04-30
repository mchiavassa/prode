<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGroup;
use App\Models\Forecast;
use App\Models\GameSet;
use App\Models\Party;
use App\Models\PartyJoinRequest;
use App\Models\Ranking;
use App\Notifications\PartyJoinRequestAccepted;
use App\Notifications\UserRemovedFromParty;
use Illuminate\Database\DatabaseManager;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

class PartyController extends Controller
{
    private Party $party;
    private PartyJoinRequest $partyJoinRequest;
    private Forecast $forecast;
    private GameSet $gameSet;
    private DatabaseManager $db;

    public function __construct(
        Party $party,
        PartyJoinRequest $partyJoinRequest,
        Forecast $forecast,
        GameSet $gameSet,
        DatabaseManager $db
    )
    {
        $this->middleware('auth');

        $this->party = $party;
        $this->partyJoinRequest = $partyJoinRequest;
        $this->forecast = $forecast;
        $this->gameSet = $gameSet;
        $this->db = $db;
    }

    /**
     * Displays the main view for Parties
     */
    public function index()
    {
        return view('party.index');
    }

    /**
     * Retrieves a partial view with the entire list visible parties in the app
     */
    public function listOthers()
    {
        $parties = $this->party
            ->whereDoesntHave('users', function($query) {
                $query->where('user_id', Auth::user()->id);
            })
            ->where('hidden', false)
            ->get()
            ->sortBy('name');

        return view('party.list', ['parties' => $parties]);
    }

    /**
     * Retrieves a partial view with the list of parties from the logged user
     */
    public function listMine()
    {
        $parties = $this->party
            ->whereHas('users', function($query) {
                $query->where('user_id', Auth::user()->id);
            })
            ->get()
            ->sortBy('name');

        return view('party.list', ['parties' => $parties]);
    }

    /**
     * Displays the view to create a new Party
     */
    public function showCreate()
    {
        return view('party.create');
    }

    /**
     * POST operation that creates a new Party
     */
    public function create(StoreGroup $request)
    {
        $validated = $request->validated();

        $party = new Party();
        $party->name = Arr::get($validated, 'name');
        $party->save();

        $party->users()->attach(Auth::user()->id, ['is_admin' => true]);
        $party->save();

        return redirect()->route('party.details', ['id' => $party->id]);
    }

    /**
     * PATCH operation that updates the description of an existing Party
     */
    public function updateDescription(Request $request, int $id)
    {
        /** @var Party $party */
        $party = $this->party
            ->with('users')
            ->findOrFail($id);

        $this->assertLoggedUserIsPartyAdmin($party);

        $party->description = Arr::get($request->all(), 'description');
        $party->save();

        return $this->jsonSuccess();
    }

    /**
     * If the logged user belong to the party (or is Prode admin), retrieves the view of the details of a Party,
     * otherwise returns the view to send a request to join.
     */
    public function details(int $id)
    {
        /** @var Party $party */
        $party = $this->party
            ->with('users')
            ->findOrFail($id);

        if (Auth::user()->isAdmin()) {
            $joinRequest = $this->partyJoinRequest->where('user_id', Auth::user()->id)->first();
            $sets = $this->getActiveSets();

            return view(
                'party.details',
                [
                    'party' => $party,
                    'joinRequest' => $joinRequest,
                    'sets' => $sets
                ]
            );
        }

        if (!$this->loggedUserBelongsToParty($party)) {
            $joinRequest = $this->partyJoinRequest->where('user_id', Auth::user()->id)->first();

            return view('party.apply', ['party' => $party, 'joinRequest' => $joinRequest]);
        }

        $sets = $this->getActiveSets();

        return view('party.details', ['party' => $party, 'sets' => $sets]);
    }

    /**
     * Retrieves the partial view of the users ranking of a Party
     */
    public function partyRanking(Request $request, int $id)
    {
        /** @var Party $party */
        $party = $this->party->with('users')->findOrFail($id);

        if (!Auth::user()->isAdmin() && !$this->loggedUserBelongsToParty($party)) {
            abort(404);
        }

        $partyUsers = $party->users;

        $setId = $request->query('setId');

        if (empty($setId)) {
            return view('party.ranking', ['ranking' => new Ranking($partyUsers), 'party' => $party]);
        }

        $set = $this->gameSet->findOrFail($setId);

        $setForecasts = $this->forecast
            ->whereIn('user_id', $partyUsers->pluck('id')->all())
            ->whereHas('game', function($query) use ($set) {
                $query->where('set_id', $set->id);
            })
            ->get();

        $setForecasts = $setForecasts->groupBy('user.id');

        $users = $partyUsers->map(function($user) use ($setForecasts) {
            $forecasts = Arr::get($setForecasts, $user->id);
            $newUser = clone $user;
            $newUser->points = $forecasts ? $forecasts->sum('points_earned') : 0;

            return $newUser;
        });

        return view('party.ranking', ['ranking' => new Ranking($users), 'party' => $party]);
    }

    /**
     * POST operation from the logged user to request to join a particular Party
     */
    public function requestJoin(int $id)
    {
        /** @var Party $party */
        $party = $this->party
            ->with('users')
            ->findOrFail($id);

        if ($this->loggedUserBelongsToParty($party)) {
            return redirect()->route('party.details', ['id' => $id])->with(
                self::ERROR_MESSAGE,
                __('party.apply.belong_already')
            );
        }

        $joinRequest = $this->partyJoinRequest->where('user_id', Auth::user()->id)->first();

        if ($joinRequest) {
            return redirect()->route('party.details', ['id' => $id])->with(
                self::ERROR_MESSAGE,
                __('party.apply.sent_already')
            );
        }

        $joinRequest = new PartyJoinRequest();
        $joinRequest->party()->associate($party);
        $joinRequest->user()->associate(Auth::user());
        $joinRequest->save();

        return redirect()->route('party.details', ['id' => $id]);
    }

    /**
     * POST operation from a logged party admin to reply to a join request to their party.
     * If the user is accepted, a notification is being sent.
     */
    public function replyJoinRequest(Request $request, int $partyId, int $joinRequestId)
    {
        /** @var Party $party */
        $party = $this->party
            ->with('users')
            ->findOrFail($partyId);

        $joinRequest = $this->partyJoinRequest
            ->with('user')
            ->findOrFail($joinRequestId);

        $this->assertLoggedUserIsPartyAdmin($party);

        $this->db->connection()->transaction(function () use ($request, $party, $joinRequest) {
            if ($request->query('accept', false)) {
                $party->users()->attach($joinRequest->user->id, ['is_admin' => false]);
                $party->save();

                $joinRequest->user->notify(new PartyJoinRequestAccepted($party));
            }

            $joinRequest->delete();
        });

        return redirect()->route('party.details', ['id' => $partyId]);
    }

    /**
     * POST operation from a logged party admin to make another user admin of a Party as well
     */
    public function makeAdmin(int $partyId, int $userId)
    {
        /** @var Party $party */
        $party = $this->party
            ->with('users')
            ->findOrFail($partyId);

        $this->assertLoggedUserIsPartyAdmin($party);

        $party->users()->updateExistingPivot($userId, ['is_admin' => true]);

        return redirect()->route('party.details', ['id' => $partyId]);
    }

    /**
     * POST operation that removes a particular user from the party
     */
    public function removeUser(int $partyId, int $userId)
    {
        /** @var Party $party */
        $party = $this->party
            ->with('users')
            ->findOrFail($partyId);

        $selfRemoval = Auth::user()->id === $userId;

        if (!$selfRemoval) {
            $this->assertLoggedUserIsPartyAdmin($party);
        }

        $userToRemove = $party->users->where('id', $userId)->first();
        if ($userToRemove == null) {
            abort(404);
        }

        $party->users()->detach($userId);

        // if no more admins in the party, then assign any other
        if ($party->users
                ->where('pivot.is_admin', true)
                ->where('id', '<>', $userToRemove->id)
                ->count() == 0) {
            $otherUser = $party->users->where('id', '<>',$userId)->first();
            if ($otherUser != null) {
                $party->users()->updateExistingPivot($otherUser->id, [
                    'is_admin' => true,
                ]);
            }
        }
        $party->save();

        if (!$selfRemoval) {
            $userToRemove->notify(new UserRemovedFromParty($party));
        }

        return $selfRemoval
            ? redirect()->route('home')
            : redirect()->route('party.details', ['id' => $partyId]);
    }

    /**
     * Retrieves a partial view with the list of join requests to a particular Party
     */
    public function joinRequestList(int $id)
    {
        /** @var Party $party */
        $party = $this->party
            ->with('users')
            ->findOrFail($id);

        $this->assertLoggedUserIsPartyAdmin($party);

        $joinRequests = $this->partyJoinRequest
            ->with('user')
            ->where('party_id', $party->id)
            ->get()
            ->sortByDesc('created_date');

        return view('party.joinRequests', ['joinRequests' => $joinRequests]);
    }

    /**
     * Retrieves a partial view with all the party forecasts of a particular game
     */
    public function gameForecastsOfPartyUsers(int $partyId, int $gameId)
    {
        /** @var Party $party */
        $party = $this->party
            ->with('users')
            ->findOrFail($partyId);

        if (!$this->loggedUserBelongsToParty($party)) {
            abort(404);
        }

        $partyUsersGameForecasts = $this->forecast
            ->where('game_id', $gameId)
            ->whereIn('user_id', $party->users->pluck('id'))
            ->get();

        $forecasts = $partyUsersGameForecasts->map(function (Forecast $forecast) use ($party) {
            $user = $party->users->where('id', $forecast->user_id)->first();

            return [
                'user' => [
                    'name' => $user->name,
                    'picture_url' => $user->picture_url,
                ],
                'home_score' => $forecast->home_score.($forecast->home_tie_break_score ? '('.$forecast->home_tie_break_score.')' : ''),
                'away_score' => $forecast->away_score.($forecast->away_tie_break_score ? '('.$forecast->away_tie_break_score.')' : ''),
            ];
        });

        $formatted = implode(
            "\n",
            $partyUsersGameForecasts->map(function (Forecast $forecast) use ($party) {
                $user = $party->users->where('id', $forecast->user_id)->first();

                $homeScore = $forecast->home_score.($forecast->home_tie_break_score ? '('.$forecast->home_tie_break_score.')' : '');
                $awayScore = $forecast->away_score.($forecast->away_tie_break_score ? '('.$forecast->away_tie_break_score.')' : '');
                $score = sprintf('%s-%s', $homeScore, $awayScore);

                return sprintf('#%s %s %s', $user->id, $user->name, $score);
            })->all()
        );

        return view(
            'party.game-forecasts-list',
            [
                'forecasts' => $forecasts,
                'forecasts_text' => $formatted,
                'party_name' => $party->name
            ]
        );
    }


    private function assertLoggedUserIsPartyAdmin(Party $party)
    {
        $partyUser = $party->users->where('id', Auth::user()->id)->first();

        if (!$partyUser || !$partyUser->pivot->is_admin) {
            abort(401);
        }
    }

    private function loggedUserBelongsToParty(Party $party): bool
    {
        return $party->users->where('id', Auth::user()->id)->isNotEmpty();
    }

    /**
     * @return Collection
     */
    private function getActiveSets(): Collection
    {
        $sets = collect();
        $sets->push((object)['id' => '', 'name' => 'General']);

        /** @var Collection $activeSets */
        $activeSets = $this->gameSet
            ->whereIn('status', [GameSet::STATUS_ENABLED, GameSet::STATUS_FINISHED])
            ->get()
            ->sortByDesc('created_at')
            ->map(function ($set) {
                return (object)[
                    'id' => $set->id,
                    'name' => $set->name
                ];
            });

        return $sets->merge($activeSets);
    }
}
