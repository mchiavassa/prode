<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGame;
use App\Http\Requests\StoreGameResult;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Prode\Domain\GameResult;
use Prode\Domain\Model\Game;
use Prode\Domain\Model\GameSet;
use Prode\Domain\Model\Party;
use Prode\Service\ForecastService;

class GameController extends Controller
{
    private $game;
    private $gameSet;
    private $party;
    private $forecastService;

    public function __construct(GameSet $gameSet, Game $game, Party $party, ForecastService $forecastService)
    {
        $this->middleware('auth');

        $this->game = $game;
        $this->gameSet = $gameSet;
        $this->party = $party;
        $this->forecastService = $forecastService;
    }

    public function showCreate($id)
    {
        $gameSet = $this->gameSet->findOrFail($id);

        return view('game.create', ['gameSet' => $gameSet]);
    }

    public function showResultSet($id)
    {
        $game = $this->game->with('set')->findOrFail($id);

        return view('game.result', ['game' => $game]);
    }

    public function setResult(StoreGameResult $request, $id)
    {
        $validated = $request->validated();

        $game = $this->game->with('set')->findOrFail($id);

        $game->home_score = array_get($validated, 'home_score');
        $game->away_score = array_get($validated, 'away_score');
        $game->home_tie_break_score = array_get($validated, 'home_tie_break_score');
        $game->away_tie_break_score = array_get($validated, 'away_tie_break_score');

        if (!GameResult::resultIsValid(
                $game->home_score,
                $game->away_score,
                $game->tie_break_required,
                $game->home_tie_break_score,
                $game->away_tie_break_score
        )) {
            return view('game.result', ['game' => $game])
                ->with(self::ERROR_MESSAGE, 'El resultado es inválido.');
        }
        $game->save();

        return redirect()->route('set.details', ['id' => $game->set->id]);
    }

    public function compute($id)
    {
        $game = $this->game->findOrFail($id);

        $this->forecastService->computeGame($game);

        return redirect()->route('set.details', ['id' => $game->set->id])
            ->with(self::SUCCESS_MESSAGE, 'Juego computado!');
    }

    public function create(StoreGame $request, $id)
    {
        $validated = $request->validated();

        $gameSet = $this->gameSet->findOrFail($id);

        $game = new Game();
        $game->home = array_get($validated, 'home');
        $game->away = array_get($validated, 'away');
        $game->group = array_get($validated, 'group');
        $game->tie_break_required = array_get($validated, 'tie_break_required');
        $game->date_and_hour = Carbon::parse(array_get($validated, 'date_and_hour'));
        $game->info_url = array_get($validated, 'info_url');
        $game->set()->associate($gameSet);
        $game->save();

        return redirect()->route('set.details', ['id' => $id]);
    }

    public function listAdmin($id)
    {
        $games = $this->game->where('set_id', $id)->get();

        return view('game.list-admin', ['games' => $games]);
    }

    public function audit($id)
    {
        $game = $this->game->findOrFail($id);

        if (!$game->isAuditable()) {
            abort(404);
        }

        $parties = $this->party
            ->whereHas('users', function($query) {
                $query->where('user_id', Auth::user()->id);
            })
            ->orderBy('name')
            ->get()
            ->map(function ($party) use ($game) {
                return [
                    'id' => $party->id,
                    'name' => $party->name,
                    'gameForecastsUrl' => route('party.game.forecasts', ['gameId' => $game->id, 'partyId' => $party->id]),
                ];
            });

        return view('game.audit', ['parties' => $parties, 'game' => $game]);
    }
}
