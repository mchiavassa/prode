<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGame;
use App\Http\Requests\StoreGameResult;
use App\Models\Game;
use App\Models\GameResult;
use App\Models\GameSet;
use App\Models\Party;
use App\Services\ForecastService;
use Carbon\Carbon;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

class GameController extends Controller
{
    private Game $game;
    private GameSet $gameSet;
    private Party $party;
    private ForecastService $forecastService;

    public function __construct(GameSet $gameSet, Game $game, Party $party, ForecastService $forecastService)
    {
        $this->middleware('auth');

        $this->game = $game;
        $this->gameSet = $gameSet;
        $this->party = $party;
        $this->forecastService = $forecastService;
    }

    /**
     * (App admin only)
     * Displays the view to create a game associated to a set
     */
    public function showCreate(int $id)
    {
        /** @var GameSet $gameSet */
        $gameSet = $this->gameSet->findOrFail($id);

        return view('game.create', ['gameSet' => $gameSet]);
    }

    /**
     * (App admin only)
     * POST operation create a new game associated to a set
     */
    public function create(StoreGame $request, int $id)
    {
        $validated = $request->validated();

        /** @var GameSet $gameSet */
        $gameSet = $this->gameSet->findOrFail($id);

        $game = new Game();
        $game->home = Arr::get($validated, 'home');
        $game->away = Arr::get($validated, 'away');
        $game->group = Arr::get($validated, 'group');
        $game->tie_break_required = Arr::get($validated, 'tie_break_required');
        $game->date_and_hour = Carbon::parse(Arr::get($validated, 'date_and_hour'));
        $game->info_url = Arr::get($validated, 'info_url');
        $game->set()->associate($gameSet);
        $game->save();

        return redirect()->route('set.details', ['id' => $id]);
    }

    /**
     * (App admin only)
     * Displays the view to set the result of a game
     */
    public function showResultSet(int $id)
    {
        /** @var Game $game */
        $game = $this->game->with('set')->findOrFail($id);

        if ($game->computed === true) {
            return redirect()->route('set.details', ['id' => $game->set->id])
                ->with(self::ERROR_MESSAGE, __('game.computed.edit'));
        }

        return view('game.result', ['game' => $game]);
    }

    /**
     * (App admin only)
     * POST operation to set the result of a game
     */
    public function setResult(StoreGameResult $request, int $id)
    {
        $validated = $request->validated();

        /** @var Game $game */
        $game = $this->game->with('set')->findOrFail($id);

        $game->home_score = Arr::get($validated, 'home_score');
        $game->away_score = Arr::get($validated, 'away_score');
        $game->home_tie_break_score = Arr::get($validated, 'home_tie_break_score');
        $game->away_tie_break_score = Arr::get($validated, 'away_tie_break_score');

        if (!GameResult::resultIsValid(
                $game->home_score,
                $game->away_score,
                $game->tie_break_required,
                $game->home_tie_break_score,
                $game->away_tie_break_score
        )) {
            return view('game.result', ['game' => $game])
                ->with(self::ERROR_MESSAGE, __('game.result.invalid'));
        }
        $game->save();

        return redirect()->route('set.details', ['id' => $game->set->id]);
    }

    /**
     * (App admin only)
     * POST operation compute a game with a result saved
     */
    public function compute(int $id)
    {
        /** @var Game $game */
        $game = $this->game
            ->where('computed', 0)
            ->where('id', $id)
            ->first();

        if (!$game) {
            return redirect()->route('set.details', ['id' => $game->set->id])
                ->with(self::ERROR_MESSAGE, __('game.computed.already'));
        }

        $this->forecastService->computeGame($game);

        return redirect()->route('set.details', ['id' => $game->set->id])
            ->with(self::SUCCESS_MESSAGE, __('game.computed.success'));
    }

    /**
     * (App admin only)
     * POST operation revert a computed a game
     */
    public function revertComputed(int $id)
    {
        /** @var Game $game */
        $game = $this->game
            ->where('computed', 1)
            ->where('id', $id)
            ->first();

        if (!$game) {
            return redirect()->route('set.details', ['id' => $game->set->id])
                ->with(self::ERROR_MESSAGE, __('game.computed.not'));
        }

        $this->forecastService->revertComputedGame($game);

        return redirect()->route('set.details', ['id' => $game->set->id])
            ->with(self::SUCCESS_MESSAGE, __('game.computed.reverted'));
    }


    /**
     * (App admin only)
     * Displays a partial view with the list of games from a set
     */
    public function listAdmin(int $id)
    {
        $games = $this->game->where('set_id', $id)->orderBy('date_and_hour')->get();

        return view('game.list-admin', ['games' => $games]);
    }

    /**
     * Displays the audit view so users can verify the forecasts of other users from their parties
     */
    public function forecasts($id)
    {
        /** @var Game $game */
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
                    'forecasts_url' => route('party.game.forecasts', ['gameId' => $game->id, 'partyId' => $party->id]),
                ];
            });

        return view('game.forecasts', ['parties' => $parties, 'game' => $game]);
    }
}
