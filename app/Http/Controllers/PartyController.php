<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGroup;
use App\Notifications\PartyJoinRequestAccepted;
use Illuminate\Database\DatabaseManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Prode\Domain\Model\Forecast;
use Prode\Domain\Model\Game;
use Prode\Domain\Model\GameSet;
use Prode\Domain\Model\Party;
use Prode\Domain\Model\PartyJoinRequest;
use Prode\Domain\Ranking;

class PartyController extends Controller
{
    private $party;
    private $partyJoinRequest;
    private $forecast;
    private $gameSet;
    private $db;

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

    public function index()
    {
        return view('party.index');
    }

    public function showCreate()
    {
        return view('party.create');
    }

    public function create(StoreGroup $request)
    {
        $validated = $request->validated();

        $party = new Party();
        $party->name = array_get($validated, 'name');
        $party->save();

        $party->users()->attach(Auth::user()->id, ['is_admin' => true]);
        $party->save();

        return redirect()->route('party.details', ['id' => $party->id]);
    }

    public function updateDescription(Request $request, $id)
    {
        /** @var Party $party */
        $party = $this->party
            ->with('users')
            ->findOrFail($id);

        if (!$this->loggedUserBelongsToParty($party)) {
            return abort(404);
        }

        $party->description = array_get($request->all(), 'description');
        $party->save();

        return $this->jsonSuccess();
    }

    public function details($id)
    {
        $party = $this->party
            ->with('users')
            ->findOrFail($id);

        if (!$this->loggedUserBelongsToParty($party)) {
            $joinRequest = $this->partyJoinRequest->where('user_id', Auth::user()->id)->first();

            return view('party.apply', ['party' => $party, 'joinRequest' => $joinRequest]);
        }

        return view('party.details', ['party' => $party]);
    }

    public function partyRankings($id)
    {
        $party = $this->party->with('users')->findOrFail($id);
        $partyUsers = $party->users;

        $activeSets = $this->gameSet
            ->whereIn('status', [GameSet::STATUS_ENABLED, GameSet::STATUS_FINISHED])
            ->get()
            ->sortByDesc('created_at');

        $setsForecasts = $this->forecast
            ->whereIn('user_id', $partyUsers->pluck('id')->all())
            ->whereHas('game', function($query) use ($activeSets) {
            $query->whereIn('set_id', $activeSets->pluck('id'));
        })->get();

        $rankings = collect();
        $rankings->push((object)[
            'id' => 'general',
            'name' => 'General',
            'list' => new Ranking($partyUsers)
        ]);

        foreach ($activeSets as $set) {
            $setForecasts = $setsForecasts->where('game.set_id', $set->id)->groupBy('user.id');

            $users = $partyUsers->map(function($user) use ($setForecasts) {
                $forecasts = array_get($setForecasts, $user->id);
                $newUser = clone $user;
                $newUser->points = $forecasts ? $forecasts->sum('points_earned') : 0;

                return $newUser;
            });

            $rankings->push((object)[
                'id' => $set->id,
                'name' => $set->name,
                'list' => new Ranking($users)
            ]);
        }

        return view('party.rankings', ['rankings' => $rankings, 'party' => $party]);
    }

    public function requestJoin($id)
    {
        $party = $this->party
            ->with('users')
            ->findOrFail($id);

        if ($this->loggedUserBelongsToParty($party)) {
            return redirect()->route('party.details', ['id' => $id])->with(
                self::ERROR_MESSAGE,
                'Ya pertenecés a este equipo.'
            );
        }

        $joinRequest = $this->partyJoinRequest->where('user_id', Auth::user()->id)->first();

        if ($joinRequest) {
            return redirect()->route('party.details', ['id' => $id])->with(
                self::ERROR_MESSAGE,
                'Tu solicitud para entrar al grupo ya fue enviada.'
            );
        }

        $joinRequest = new PartyJoinRequest();
        $joinRequest->party()->associate($party);
        $joinRequest->user()->associate(Auth::user());
        $joinRequest->save();

        return redirect()->route('party.details', ['id' => $id]);
    }

    public function replyJoinRequest(Request $request, $partyId, $joinRequestId)
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

    public function makeAdmin($partyId, $userId)
    {
        /** @var Party $party */
        $party = $this->party
            ->with('users')
            ->findOrFail($partyId);

        $this->assertLoggedUserIsPartyAdmin($party);

        $party->users()->updateExistingPivot($userId, ['is_admin' => true]);

        return redirect()->route('party.details', ['id' => $partyId]);
    }

    public function joinRequestList($id)
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

    public function list()
    {
        $parties = $this->party
            ->with('users')
            ->where('hidden', false)
            ->get()
            ->sortBy('name');

        return view('party.list', ['parties' => $parties]);
    }

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

    public function gameForecastsOfPartyUsers($partyId, $gameId)
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

            $homeScore = $forecast->home_score.($forecast->home_tie_break_score ? '('.$forecast->home_tie_break_score.')' : '');
            $awayScore = $forecast->away_score.($forecast->away_tie_break_score ? '('.$forecast->away_tie_break_score.')' : '');
            $score = sprintf('%s-%s', $homeScore, $awayScore);

            return sprintf('#%s %s %s', $user->id, $user->name, $score);
        });

        $formatted = implode(' | ', $forecasts->all());

        return $this->jsonSuccess([
            'forecasts' => $formatted,
        ]);
    }


    private function assertLoggedUserIsPartyAdmin(Party $party)
    {
        $partyUser = $party->users->where('id', Auth::user()->id)->first();

        if (!$partyUser || !$partyUser->pivot->is_admin) {
            abort(401);
        }
    }

    /**
     * @param Party $party
     * @return boolean
     */
    private function loggedUserBelongsToParty(Party $party)
    {
        return $party->users->where('id', Auth::user()->id)->isNotEmpty();
    }
}
