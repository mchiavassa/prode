<?php

namespace App\Http\Controllers;

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

    public function details($id)
    {
        $party = $this->party
            ->with('users')
            ->findOrFail($id);

        if ($party->users->where('id', Auth::user()->id)->isEmpty()) {
            return redirect()->route('home');
        }

        return view('party.details', ['party' => $party]);
    }

    public function list()
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
