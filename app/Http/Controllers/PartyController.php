<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGroup;
use App\Notifications\PartyJoinRequestAccepted;
use Illuminate\Database\DatabaseManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Prode\Domain\Model\Party;
use Prode\Domain\Model\PartyJoinRequest;

class PartyController extends Controller
{
    private $party;
    private $partyJoinRequest;
    private $db;

    public function __construct(Party $party, PartyJoinRequest $partyJoinRequest, DatabaseManager $db)
    {
        $this->middleware('auth');

        $this->party = $party;
        $this->partyJoinRequest = $partyJoinRequest;
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

    public function details($id)
    {
        $party = $this->party
            ->with('users')
            ->findOrFail($id);

        if ($party->users->where('id', Auth::user()->id)->isEmpty()) {

            $joinRequest = $this->partyJoinRequest->where('user_id', Auth::user()->id)->first();

            return view('party.apply', ['party' => $party, 'joinRequest' => $joinRequest]);
        }

        return view('party.details', ['party' => $party]);
    }

    public function requestJoin($id)
    {
        $party = $this->party
            ->with('users')
            ->findOrFail($id);

        if ($party->users->where('id', Auth::user()->id)->isNotEmpty()) {
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

    private function assertLoggedUserIsPartyAdmin(Party $party)
    {
        $partyUser = $party->users->where('id', Auth::user()->id)->first();

        if (!$partyUser || !$partyUser->pivot->is_admin) {
            abort(401);
        }
    }
}
