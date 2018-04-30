<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGameSet;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Prode\Domain\Model\GameSet;

class GameSetController extends Controller
{
    private $gameSet;

    public function __construct(GameSet $gameSet)
    {
        $this->middleware('auth');

        $this->gameSet = $gameSet;
    }

    public function index()
    {
        return view('set.index');
    }

    public function showCreate()
    {
        return view('set.create');
    }

    public function showDetails($id)
    {
        $gameSet = $this->gameSet->find($id);

        return view('set.details', ['gameSet' => $gameSet]);
    }

    public function create(StoreGameSet $request)
    {
        $validated = $request->validated();

        $gameSet = new GameSet();
        $gameSet->name = array_get($validated, 'name');
        $gameSet->forecast_deadline = Carbon::parse(array_get($validated, 'forecast_deadline'))->tz('UTC');
        $gameSet->save();

        return redirect()->route('set');
    }

    public function enable($id)
    {
        $gameSet = $this->gameSet->find($id);

        if (!$gameSet->enabled) {
            $gameSet->enabled = true;
            $gameSet->save();

            // TODO: send email to all users
        }
        return redirect()->route('set.details', ['id' => $id]);
    }

    public function listAdmin(Request $request)
    {
        $gameSets = $this->gameSet->with('games');

        if ($request->query('enabled')) {
            $gameSets = $gameSets->where('enabled', $request->query('enabled'));
        }

        return view('set.list-admin', ['gameSets' => $gameSets->get()]);
    }

    public function list(Request $request)
    {
        $gameSets = $this->gameSet->with('games');

        if ($request->query('enabled')) {
            $gameSets = $gameSets->where('enabled', $request->query('enabled'));
        }

        return view('set.list', ['gameSets' => $gameSets->get()]);
    }
}
