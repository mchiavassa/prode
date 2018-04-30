<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGame;
use App\Http\Requests\StoreGameResult;
use Prode\Domain\Model\Game;
use Prode\Domain\Model\GameSet;

class GameController extends Controller
{
    private $game;
    private $gameSet;

    public function __construct(GameSet $gameSet, Game $game)
    {
        $this->middleware('auth');

        $this->game = $game;
        $this->gameSet = $gameSet;
    }

    public function showCreate($id)
    {
        $gameSet = $this->gameSet->find($id);

        return view('game.create', ['gameSet' => $gameSet]);
    }

    public function showResultSet($id)
    {
        $game = $this->game->with('set')->find($id);

        return view('game.result', ['game' => $game]);
    }

    public function setResult(StoreGameResult $request, $id)
    {
        $validated = $request->validated();

        $game = $this->game->with('set')->find($id);

        $game->home_score = array_get($validated, 'home_score');
        $game->away_score = array_get($validated, 'away_score');
        $game->home_tie_break_score = array_get($validated, 'home_tie_break_score');
        $game->away_tie_break_score = array_get($validated, 'away_tie_break_score');
        $game->save();

        return redirect()->route('set.details', ['id' => $game->set->id]);
    }

    public function create(StoreGame $request, $id)
    {
        $validated = $request->validated();

        $gameSet = $this->gameSet->find($id);

        $game = new Game();
        $game->home = array_get($validated, 'home');
        $game->away = array_get($validated, 'away');
        $game->set()->associate($gameSet);
        $game->save();

        return redirect()->route('set.details', ['id' => $id]);
    }

    public function listAdmin($id)
    {
        $games = $this->game->where('set_id', $id)->get();

        return view('game.list-admin', ['games' => $games]);
    }
}
