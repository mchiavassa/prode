<?php

namespace App\Http\Controllers;

use App\Models\Forecast;
use App\Models\ForecastAssertion;
use App\Models\Game;
use App\Models\GameSet;
use App\Models\Party;
use App\Models\Ranking;
use App\Models\User;
use App\Utils\DateTimes;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class StatsController extends Controller
{
    private Forecast $forecast;
    private User $user;
    private GameSet $gameSet;
    private Game $game;
    private Party $party;

    public function __construct(Forecast $forecast, User $user, GameSet $gameSet, Game $game, Party $party)
    {
        $this->middleware('auth');

        $this->forecast = $forecast;
        $this->user = $user;
        $this->gameSet = $gameSet;
        $this->game = $game;
        $this->party = $party;
    }

    public function index()
    {
        $allUsers = $this->user->get();

        $allParties = $this->party->with('users')->has('users', '>=', 2)->get()->map(function($party) {
            return (object) [
                'name' => $party->name,
                'points' => number_format($party->users->sum('points') / $party->users->count(), 2)
            ];
        });

        return view('stats.index', [
            'usersRanking' => new Ranking($allUsers, null, 3),
            'partiesRanking' => new Ranking($allParties, null, 5),
        ]);
    }

    public function admin()
    {
        $allUsers = $this->user->get();

        $todayUsers = $this->user->whereDate('created_at', DateTimes::now()->toDateString())->get();
        $todayParties = $this->party->whereDate('created_at', DateTimes::now()->toDateString())->count();
        $totalPoints = $allUsers->sum('points');
        $usersWithPoints = $allUsers->where('points', '>', 0);

        $gameSets = collect();
        foreach ($this->gameSet->with('games', 'games.forecasts')->get() as $gameSet) {
            $points = $gameSet->games->map(function ($game) {
                return $game->forecasts->sum('points_earned');
            })->sum();

            $gameSets->push((object)[
                'name' => $gameSet->name,
                'points' => $points ? number_format($points / $gameSet->games->count(), 2) : 0
            ]);
        }

        $games = collect();
        foreach($this->game->with('forecasts')->get() as $game) {
            $points = $game->forecasts->sum('points_earned');

            $games->push((object)[
                'name' => sprintf('%s - %s', __('domain.teams.'.$game->home), __('domain.teams.'.$game->away)),
                'points' => $points
            ]);
        }

        $todayForecasts = $this->forecast->with('user')->whereDate('created_at', DateTimes::now()->toDateString())->get();
        $todayForecasters = $allUsers->whereIn('id', $todayForecasts->groupBy('user_id')->keys()->all());

        return view('stats.admin', [
            'todayForecasts' => $todayForecasts->count(),
            'todayUsers' => $todayUsers,
            'todayParties' => $todayParties,
            'totalPoints' => $totalPoints,
            'totalAverage' => number_format($totalPoints / $allUsers->count(), 2),
            'usersWithPoints' => $usersWithPoints,
            'gameSets' => $gameSets->where('points', '>', 0),
            'games' => $games->where('points', '>', 0),
            'todayForecasters' => $todayForecasters,
        ]);
    }

    public function mine()
    {
        $userForecastsComputed = $this->forecast->where('user_id', Auth::user()->id)->where('assertions', '<>', null)->get();
        $userForecastsComputedCount = $userForecastsComputed->count();
        $matchResultForecastsCount = $userForecastsComputed->filter(function ($forecast) { return in_array(ForecastAssertion::RESULT, $forecast->assertions);})->count();
        $matchScoreForecastsCount = $userForecastsComputed->filter(function ($forecast) { return in_array(ForecastAssertion::SCORE, $forecast->assertions);})->count();
        $matchTieBreakExistenceForecastsCount = $userForecastsComputed->filter(function ($forecast) { return in_array(ForecastAssertion::TIEBREAK_EXISTENCE, $forecast->assertions);})->count();
        $matchTieBreakScoreForecastsCount = $userForecastsComputed->filter(function ($forecast) { return in_array(ForecastAssertion::TIEBREAK_SCORE, $forecast->assertions);})->count();
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

            'matchTieBreakExistenceForecastsCount' => $matchTieBreakExistenceForecastsCount,
            'matchTieBreakExistenceForecastsPercentage' => $matchTieBreakExistenceForecastsCount == 0
                ? 0
                : ($matchTieBreakExistenceForecastsCount / $userForecastsComputedCount) * 100,

            'matchTieBreakScoreForecastsCount' => $matchTieBreakScoreForecastsCount,
            'matchTieBreakScoreForecastsPercentage' => $matchTieBreakScoreForecastsCount == 0
                ? 0
                : ($matchTieBreakScoreForecastsCount / $userForecastsComputedCount) * 100,

            'noMatchForecastsCount' => $noMatchForecastsCount,
            'noMatchForecastsPercentage' => $userForecastsComputedCount == 0
                ? 0
                : ($noMatchForecastsCount / $userForecastsComputedCount) * 100,
        ]);
    }
}
