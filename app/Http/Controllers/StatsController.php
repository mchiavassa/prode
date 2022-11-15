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
use Illuminate\Support\Facades\DB;

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

    public function rankings()
    {
        $allUsers = $this->user->with(['forecasts','forecasts.game'])->get();

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

        $computedGames = $this->game->where('computed', 1)->get();
        $computedGamesCount = $computedGames->count();
        $computedGamesWithTieBreakResultCount = $computedGames
            ->filter(function($game) {return $game->hasResultWithTieBreak();})
            ->count();

        $topUsersByResult = $this->sortUsersByAssertion($allUsers, ForecastAssertion::RESULT, $computedGamesCount);
        $topUsersByScore = $this->sortUsersByAssertion($allUsers, ForecastAssertion::SCORE, $computedGamesCount);
        $topUsersByTieBreak = $this->sortUsersByAssertion($allUsers, ForecastAssertion::TIEBREAK_EXISTENCE, $computedGamesWithTieBreakResultCount);
        $topUsersByTieBreakScore = $this->sortUsersByAssertion($allUsers, ForecastAssertion::TIEBREAK_SCORE, $computedGamesWithTieBreakResultCount);

        $topUsersCount = 5;
        $topPartiesCount = 5;

        $data = [
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

        return view('stats.rankings', $data);
    }

    private function sortUsersByAssertion(Collection $users, string $assertion, int $total): Collection
    {
        return $users->map(function(User $user) use ($assertion, $total) {
            $forecastWithResult = $user->forecasts
                ->filter(function(Forecast $forecast) use ($assertion) {
                    return $forecast->withAssertion($assertion);
                })->count();
            // we make use of the User object here to reuse all the ranking view logic
            $avgUser = clone $user;
            $avgUser->points = $total == 0
                ? 0
                : ($forecastWithResult / $total) * 100;

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
        $userForecasts = $this->forecast->with('game')->where('user_id', Auth::user()->id)->get();
        $userForecastsComputed = $userForecasts->filter(function($forecast) {return $forecast->computed();});

        $computedGames = $this->game->where('computed', 1)->get();
        $computedGamesCount = $computedGames->count();
        $computedGamesWithTieBreakResultCount = $computedGames->filter(function($game) {return $game->hasResultWithTieBreak();})->count();

        $userForecastsCount = $userForecasts->count();
        $matchResultForecastsCount = $userForecastsComputed->filter(function ($forecast) { return in_array(ForecastAssertion::RESULT, $forecast->assertions);})->count();
        $matchScoreForecastsCount = $userForecastsComputed->filter(function ($forecast) { return in_array(ForecastAssertion::SCORE, $forecast->assertions);})->count();
        $matchTieBreakExistenceForecastsCount = $userForecastsComputed->filter(function ($forecast) { return in_array(ForecastAssertion::TIEBREAK_EXISTENCE, $forecast->assertions);})->count();
        $matchTieBreakScoreForecastsCount = $userForecastsComputed->filter(function ($forecast) { return in_array(ForecastAssertion::TIEBREAK_SCORE, $forecast->assertions);})->count();
        $noMatchForecastsCount = $userForecastsComputed
            ->where('points_earned', 0)->count();
        $nonForecastedMatchesCount = $computedGamesCount - $userForecastsComputed->count();

        return view('stats.mine', [
            'points' => Auth::user()->points,
            'userForecastsCount' => $userForecastsCount,
            'computedGamesCount' => $computedGamesCount,
            'computedGamesWithTieBreakResultCount' => $computedGamesWithTieBreakResultCount,

            'matchResultForecastsCount' => $matchResultForecastsCount,
            'matchResultForecastsPercentage' => $computedGamesCount == 0
                ? 0
                : ($matchResultForecastsCount / $computedGamesCount) * 100,

            'matchScoreForecastsCount' => $matchScoreForecastsCount,
            'matchScoreForecastsPercentage' => $computedGamesCount == 0
                ? 0
                : ($matchScoreForecastsCount / $computedGamesCount) * 100,

            'matchTieBreakExistenceForecastsCount' => $matchTieBreakExistenceForecastsCount,
            'matchTieBreakExistenceForecastsPercentage' => $matchTieBreakExistenceForecastsCount == 0
                ? 0
                : ($matchTieBreakExistenceForecastsCount / $computedGamesWithTieBreakResultCount) * 100,

            'matchTieBreakScoreForecastsCount' => $matchTieBreakScoreForecastsCount,
            'matchTieBreakScoreForecastsPercentage' => $matchTieBreakScoreForecastsCount == 0
                ? 0
                : ($matchTieBreakScoreForecastsCount / $computedGamesWithTieBreakResultCount) * 100,

            'noMatchForecastsCount' => $noMatchForecastsCount + $nonForecastedMatchesCount,
            'noMatchForecastsPercentage' => $computedGamesCount == 0
                ? 0
                : (($noMatchForecastsCount + $nonForecastedMatchesCount) / $computedGamesCount) * 100,
        ]);
    }

    public function forecastsProgress()
    {
        $gamesAvailableCount = DB::table('games')
            ->join('game_sets', 'game_sets.id', '=', 'games.set_id')
            ->whereIn('game_sets.status', [GameSet::STATUS_ENABLED, GameSet::STATUS_FINISHED])
            ->count();

        $userForecastsCount = $this->forecast->where('user_id', Auth::user()->id)->count();

        return view(
            'stats.forecasts',
            [
                'gamesCount' => $gamesAvailableCount,
                'forecastsCount' => $userForecastsCount,
                'percentage' =>  $gamesAvailableCount == 0
                    ? 0
                    : ($userForecastsCount / $gamesAvailableCount) * 100
            ]
        );
    }
}
