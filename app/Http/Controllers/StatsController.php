<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Prode\Domain\ForecastAssertion;
use Prode\Domain\Model\Forecast;
use Prode\Domain\Model\Game;
use Prode\Domain\Model\GameSet;
use Prode\Domain\Model\Party;
use Prode\Domain\Model\User;

class StatsController extends Controller
{
    private $forecast;
    private $user;
    private $gameSet;
    private $game;
    private $party;

    public function __construct(Forecast $forecast, User $user, GameSet $gameSet, Game $game, Party $party)
    {
        $this->middleware('auth');

        $this->forecast = $forecast;
        $this->user = $user;
        $this->gameSet = $gameSet;
        $this->game = $game;
        $this->party = $party;
    }

    public function admin()
    {
        $allUsers = $this->user->get();

        $todayUsers = $this->user->whereDate('created_at', Carbon::now()->toDateString())->get();
        $todayParties = $this->party->whereDate('created_at', Carbon::now()->toDateString())->count();
        $totalPoints = $allUsers->sum('points');
        $usersWithPoints = $allUsers->where('points', '>', 0);

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

        $todayForecasts = $this->forecast->with('user')->whereDate('created_at', Carbon::now()->toDateString())->get();
        $todayForecasters = $allUsers->whereIn('id', $todayForecasts->groupBy('user_id')->keys()->all());

        return view('stats.admin', [
            'todayForecasts' => $todayForecasts->count(),
            'todayUsers' => $todayUsers,
            'todayParties' => $todayParties,
            'totalPoints' => $totalPoints,
            'totalAverage' => number_format($totalPoints / $allUsers->count(), 2),
            'usersWithPoints' => $usersWithPoints,
            'topGameSets' => $topGameSets->where('points', '>', 0)->take(5),
            'topGames' => $topGames->where('points', '>', 0)->take(5),
            'todayForecasters' => $todayForecasters,
        ]);
    }

    public function mine()
    {
        $userForecastsComputed = $this->forecast->where('user_id', Auth::user()->id)->where('assertions', '<>', null)->get();
        $userForecastsComputedCount = $userForecastsComputed->count();
        $matchResultForecastsCount = $userForecastsComputed
            ->where('assertions', [ForecastAssertion::RESULT])->count();
        $matchScoreForecastsCount = $userForecastsComputed
            ->where('assertions', [ForecastAssertion::RESULT, ForecastAssertion::SCORE])->count();
        $noMatchForecastsCount = $userForecastsComputed
            ->where('assertions', [])->count();

        return view('stats.mine', [
            'points' => Auth::user()->points,
            'matchResultForecastsCount' => $matchResultForecastsCount,
            'matchResultForecastsPercentage' => $userForecastsComputedCount == 0
                ? 0
                : ($matchResultForecastsCount / $userForecastsComputedCount) * 100,
            'matchScoreForecastsCount' => $matchScoreForecastsCount,
            'matchScoreForecastsPercentage' => $userForecastsComputedCount == 0
                ? 0
                : ($matchScoreForecastsCount / $userForecastsComputedCount) * 100,
            'noMatchForecastsCount' => $noMatchForecastsCount,
            'noMatchForecastsPercentage' => $userForecastsComputedCount == 0
                ? 0
                : ($noMatchForecastsCount / $userForecastsComputedCount) * 100,
        ]);
    }
}
