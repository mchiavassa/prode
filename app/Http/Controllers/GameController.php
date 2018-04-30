<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGame;
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
