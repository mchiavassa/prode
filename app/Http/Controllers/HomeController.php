<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Prode\Domain\Model\Forecast;
use Prode\Domain\Model\Game;
use Prode\Domain\Model\GameSet;
use Prode\Domain\Model\User;

class HomeController extends Controller
{
    private $forecast;
    private $user;
    private $gameSet;
    private $game;

    public function __construct(Forecast $forecast, User $user, GameSet $gameSet, Game $game)
    {
        $this->middleware('auth');

        $this->forecast = $forecast;
        $this->user = $user;
        $this->gameSet = $gameSet;
        $this->game = $game;
    }

    public function index()
    {
        return view('home.index');
    }

    public function rules()
    {
        return view('home.rules');
    }

    public function stats()
    {
        $todayForecasts = $this->forecast->whereDate('created_at', Carbon::now()->toDateString())->get();
        $todayUsers = $this->user->whereDate('created_at', Carbon::now()->toDateString())->count();
        $totalPoints = $this->user->sum('points');
        $topUsers = $this->user->where('points', '>', 0)->orderBy('points', 'desc')->take(5)->get();

        $topGameSets = collect();
        foreach ($this->gameSet->with('games', 'games.forecasts')->get() as $gameSet) {
            $points = $gameSet->games->map(function ($game) {
                return $game->forecasts->sum('points_earned');
            })->sum();

            $topGameSets->push((object)['name' => $gameSet->name, 'points' => $points]);
        }

        $topGames = collect();
        foreach($this->game->with('forecasts')->get() as $game) {
            $points = $game->forecasts->sum('points_earned');

            $topGames->push((object)[
                'name' => sprintf('%s - %s', config('domain.teams.'.$game->home), config('domain.teams.'.$game->away)),
                'points' => $points
            ]);
        }

        $todayForecasters = collect();
        foreach ($todayForecasts->groupBy('user_id') as $userId => $forecasts) {
            $user = $forecasts->first()->user;
            $user->points = $forecasts->count();
            $todayForecasters->push($user);
        }

        return view('home.stats', [
            'todayForecasts' => $todayForecasts->count(),
            'todayUsers' => $todayUsers,
            'totalPoints' => $totalPoints,
            'topUsers' => $topUsers,
            'topGameSets' => $topGameSets->where('points', '>', 0)->take(5),
            'topGames' => $topGames->where('points', '>', 0)->take(5),
            'todayForecasters' => $todayForecasters,
        ]);
    }
}
