<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGameSet;
use Illuminate\Http\Request;
use Prode\Domain\Model\GameSet;
use Prode\Service\ForecastService;

class GameSetController extends Controller
{
    private $gameSet;
    private $forecastService;

    public function __construct(GameSet $gameSet, ForecastService $forecastService)
    {
        $this->middleware('auth');

        $this->gameSet = $gameSet;
        $this->forecastService = $forecastService;
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
        $gameSet = $this->gameSet->with('games')->findOrFail($id);

        return view('set.details', ['gameSet' => $gameSet]);
    }

    public function create(StoreGameSet $request)
    {
        $validated = $request->validated();

        $gameSet = new GameSet();
        $gameSet->name = array_get($validated, 'name');
        $gameSet->status = GameSet::STATUS_DRAFT;
        $gameSet->save();

        return redirect()->route('set');
    }

    public function enable($id)
    {
        $gameSet = $this->gameSet->findOrFail($id);

        if (!$gameSet->isEnabled()) {
            $gameSet->status = GameSet::STATUS_ENABLED;
            $gameSet->save();

            // TODO: send email to all users
        }
        return redirect()->route('set.details', ['id' => $id]);
    }

    public function compute($id)
    {
        $this->forecastService->computeForecastsFromGameSet($id);

        // TODO: send email to all users

        return redirect()->route('set.details', ['id' => $id]);
    }

    public function listAdmin()
    {
        $gameSets = $this->gameSet->with('games')->get();

        return view('set.list-admin', ['gameSets' => $gameSets]);
    }

    public function list(Request $request)
    {
        $gameSets = $this->gameSet->with('games');

        if ($request->query('enabled')) {
            $gameSets = $gameSets->whereIn('status', [GameSet::STATUS_ENABLED, GameSet::STATUS_COMPUTED]);
        }

        return view('set.list', ['gameSets' => $gameSets->get()]);
    }
}
