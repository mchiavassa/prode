<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGroup;
use Illuminate\Support\Facades\Auth;
use Prode\Domain\Model\Party;

class PartyController extends Controller
{
    private $party;

    public function __construct(Party $party)
    {
        $this->middleware('auth');

        $this->party = $party;
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
            return view('party.join', ['party' => $party]);
        }

        return view('party.details', ['party' => $party]);
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
}
