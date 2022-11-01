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
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class StatsController extends Controller
{
    private const RANKING_CACHE = 3600; // 1 hour

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

    public function rankings()
    {
        $data = Cache::remember('rankings', self::RANKING_CACHE, function () {
            $allUsers = $this->user->with('forecasts')->get();

            $allParties = $this->party
                ->with('users')
                ->has('users', '>=', 2)
                ->get()
                ->map(function($party) {
                    return (object) [
                        'name' => $party->name,
                        'points' => $party->users->sum('points') / $party->users->count()
                    ];
                });

            $allUsersWithAverages = $allUsers->map(function(User $user) {
                // we make use of the User object here to reuse all the ranking view logic
                $avgUser = clone $user;
                $avgUser->points = $user->average();

                return $avgUser;
            });

            $topUsersByResult = $this->sortUsersByAssertion($allUsers, ForecastAssertion::RESULT);
            $topUsersByScore = $this->sortUsersByAssertion($allUsers, ForecastAssertion::SCORE);
            $topUsersByTieBreak = $this->sortUsersByAssertion($allUsers, ForecastAssertion::TIEBREAK_EXISTENCE);
            $topUsersByTieBreakScore = $this->sortUsersByAssertion($allUsers, ForecastAssertion::TIEBREAK_SCORE);

            $topUsersCount = 5;
            $topPartiesCount = 5;

            return [
                'usersRanking' => Ranking::ofItemsWithPositionsAndIncludeItem(
                    $allUsers,
                    $topUsersCount,
                    Auth::user(),
                    function($user, $user2) {
                        return $user->email === $user2->email;
                    }),
                'usersAverageRanking' => Ranking::ofItemsWithPositionsAndIncludeItem(
                    $allUsersWithAverages,
                    $topUsersCount,
                    Auth::user(),
                    function($user, $user2) {
                        return $user->email === $user2->email;
                    }),
                'usersResultRanking' => Ranking::ofItemsWithPositions($topUsersByResult, $topUsersCount),
                'usersScoreRanking' => Ranking::ofItemsWithPositions($topUsersByScore, $topUsersCount),
                'usersTieBreakRanking' => Ranking::ofItemsWithPositions($topUsersByTieBreak, $topUsersCount),
                'usersTieBreakScoreRanking' => Ranking::ofItemsWithPositions($topUsersByTieBreakScore, $topUsersCount),
                'totalUsersCount' => $allUsers->count(),
                'topUsersCount' => $topUsersCount,
                'partiesRanking' => Ranking::ofItemsWithPositions($allParties, $topPartiesCount),
                'topPartiesCount' => $topPartiesCount,
            ];
        });

        return view('stats.rankings', $data);
    }

    private function sortUsersByAssertion(Collection $users, string $assertion): Collection
    {
        return $users->map(function(User $user) use ($assertion) {
            $computedForecastsCount = $user->forecasts
                ->filter(function(Forecast $forecast) {
                    return $forecast->computed();
                })->count();
            $forecastWithResult = $user->forecasts
                ->filter(function(Forecast $forecast) use ($assertion) {
                    return $forecast->withAssertion($assertion);
                })->count();
            // we make use of the User object here to reuse all the ranking view logic
            $avgUser = clone $user;
            $avgUser->points = $computedForecastsCount == 0
                ? 0
                : ($forecastWithResult / $computedForecastsCount) * 100;

            return $avgUser;
        });
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
                'points' => $points ? $points / $gameSet->games->count() : 0
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
            'totalAverage' => $totalPoints / $allUsers->count(),
            'usersWithPoints' => $usersWithPoints,
            'gameSets' => $gameSets->where('points', '>', 0),
            'games' => $games->where('points', '>', 0),
            'todayForecasters' => $todayForecasters,
        ]);
    }

    public function mine()
    {
        $userForecastsComputed = $this->forecast->where('user_id', Auth::user()->id)->get()->filter(function($forecast) {return $forecast->computed();});
        $userForecastsComputedCount = $userForecastsComputed->count();
        $matchResultForecastsCount = $userForecastsComputed->filter(function ($forecast) { return in_array(ForecastAssertion::RESULT, $forecast->assertions);})->count();
        $matchScoreForecastsCount = $userForecastsComputed->filter(function ($forecast) { return in_array(ForecastAssertion::SCORE, $forecast->assertions);})->count();
        $matchTieBreakExistenceForecastsCount = $userForecastsComputed->filter(function ($forecast) { return in_array(ForecastAssertion::TIEBREAK_EXISTENCE, $forecast->assertions);})->count();
        $matchTieBreakScoreForecastsCount = $userForecastsComputed->filter(function ($forecast) { return in_array(ForecastAssertion::TIEBREAK_SCORE, $forecast->assertions);})->count();
        $noMatchForecastsCount = $userForecastsComputed
            ->where('points_earned', 0)->count();

        return view('stats.mine', [
            'points' => Auth::user()->points,
            'userForecastsComputedCount' => $userForecastsComputedCount,

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
