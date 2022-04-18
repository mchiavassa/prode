<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGameSet;
use App\Models\GameSet;
use App\Models\User;
use App\Notifications\GameSetEnabled;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Notification;

class GameSetController extends Controller
{
    private GameSet $gameSet;
    private User $user;

    public function __construct(GameSet $gameSet, User $user)
    {
        $this->middleware('auth');

        $this->gameSet = $gameSet;
        $this->user = $user;
    }

    public function indexAdmin()
    {
        return view('set.index-admin');
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
        $gameSet->name = Arr::get($validated, 'name');
        $gameSet->status = GameSet::STATUS_DRAFT;
        $gameSet->save();

        return redirect()->route('set.admin');
    }

    public function enable($id)
    {
        $gameSet = $this->gameSet->findOrFail($id);

        if (!$gameSet->isEnabled()) {
            $gameSet->status = GameSet::STATUS_ENABLED;
            $gameSet->save();

            Notification::send($this->user->get(), new GameSetEnabled($gameSet));
        }
        return redirect()->route('set.details', ['id' => $id])->with(self::SUCCESS_MESSAGE, __('set.enabled'));
    }

    public function finish($id)
    {
        $gameSet = $this->gameSet->with('games')->findOrFail($id);

        if($gameSet->games->where('computed', false)->isNotEmpty()) {
            abort(400, 'There are games to be computed.');
        }

        $gameSet->status = GameSet::STATUS_FINISHED;
        $gameSet->save();

        return redirect()->route('set.details', ['id' => $id])->with(self::SUCCESS_MESSAGE, __('set.finished'));
    }

    public function listAdmin()
    {
        $gameSets = $this->gameSet->with('games')->get();

        return view('set.list-admin', ['gameSets' => $gameSets]);
    }

    public function list(Request $request)
    {
        $gameSets = $this->gameSet
            ->with('games')
            ->whereIn('status', [GameSet::STATUS_ENABLED, GameSet::STATUS_FINISHED]);

        return view('set.list', ['gameSets' => $gameSets->get()]);
    }
}
