<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Prode\Domain\ForecastResult;
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

        $todayUsers = $this->user->whereDate('created_at', Carbon::now()->toDateString());
        $todayParties = $this->party->whereDate('created_at', Carbon::now()->toDateString())->count();
        $totalPoints = $allUsers->sum('points');
        $topUsers = $allUsers->where('points', '>', 0)->sortByDesc('points')->take(5);

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
            'topUsers' => $topUsers,
            'topGameSets' => $topGameSets->where('points', '>', 0)->take(5),
            'topGames' => $topGames->where('points', '>', 0)->take(5),
            'todayForecasters' => $todayForecasters,
        ]);
    }

    public function mine()
    {
        $userForecasts = $this->forecast->where('user_id', Auth::user()->id)->get();
        $userForecastsComputedCount = $userForecasts->where('result', '<>', null)->count();
        $matchResultForecastsCount = $userForecasts->where('result', (string) (new ForecastResult(ForecastResult::MATCH_RESULT)))->count();
        $matchScoreForecastsCount = $userForecasts->where('result', (string) (new ForecastResult(ForecastResult::MATCH_SCORE)))->count();
        $noMatchForecastsCount = $userForecasts->where('result', (string) (new ForecastResult(ForecastResult::NO_MATCH)))->count();

        return view('stats.mine', [
            'points' => Auth::user()->points,
            'forecastsCount' => $userForecasts->count(),
            'forecastComputedCount' => $userForecastsComputedCount,
            'matchResultForecastsCount' => $matchResultForecastsCount,
            'matchResultForecastsPercentage' => $userForecastsComputedCount == 0 ? 0 : ($matchResultForecastsCount / $userForecastsComputedCount) * 100,
            'matchScoreForecastsCount' => $matchScoreForecastsCount,
            'matchScoreForecastsPercentage' => $userForecastsComputedCount == 0 ? 0 : ($matchScoreForecastsCount / $userForecastsComputedCount) * 100,
            'noMatchForecastsCount' => $noMatchForecastsCount,
            'noMatchForecastsPercentage' => $userForecastsComputedCount == 0 ? 0 : ($noMatchForecastsCount / $userForecastsComputedCount) * 100,
        ]);
    }
}
