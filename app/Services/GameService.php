<?php

namespace App\Services;

use App\Models\Game;
use App\Models\GameSet;
use App\Utils\DateTimes;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class GameService
{
    private Game $game;

    public function __construct(Game $game) {
        $this->game = $game;
    }

    /**
     * Returns a list of upcoming games to forecast.
     *
     * It will retrieve and display games from today until 2 hours after the last game finishes.
     * If there are no games for the current day, it will check the following day until it finds some.
     * It will check for games up to 4 days ahead.
     */
    public function getUpcomingGamesToForecast()
    {
        $maxDaysAheadToCheck = 4;
        $maxHoursDisplayingFinishedGames = 2; // A match usually lasts 2 hours
        $currentDay = 0;

        do {
            $nextGames = $this->game
                ->whereHas('set', function ($query) {
                    $query->whereIn('status', [GameSet::STATUS_ENABLED, GameSet::STATUS_FINISHED]);
                })
                ->whereDate('date_and_hour', DateTimes::now()->addDay($currentDay)->toDateString())
                ->orderBy('date_and_hour')
                ->get();

            // if we have games
            if ($nextGames->isNotEmpty()
                // for today
                && DateTimes::now()->toDateString() === $nextGames->last()->date_and_hour->toDateString()
                // and it's been more than $maxHoursDisplayingFinishedGames hours since the last one finished
                && DateTimes::now()
                    ->addHours(-$maxHoursDisplayingFinishedGames)
                    ->greaterThanOrEqualTo($nextGames->last()->date_and_hour)
            ) {
                // clean the list and look for tomorrow's games
                $nextGames = collect();
            }

            $currentDay++;
        } while ($nextGames->isEmpty() && $maxDaysAheadToCheck > $currentDay);


        return $nextGames;
    }

    /**
     * Returns a list of upcoming games to forecast.
     *
     * It will retrieve future games, including live ones up to 4 hours from the start.
     * It will group them by date and return the immediate upcoming ones.
     * If there are less than 2 upcoming games, it will try to pull games from the following date.
     */
    public function getUpcomingGamesToForecast2()
    {
        $minGamesToDisplay = 2;
        $maxMinutesDisplayingFinishedGames = 240;
        $gamesFrom = DateTimes::now()->addMinutes(-$maxMinutesDisplayingFinishedGames)->toDateTimeString();

        $futureGames = $this->game
            ->whereHas('set', function ($query) {
                $query->whereIn('status', [GameSet::STATUS_ENABLED, GameSet::STATUS_FINISHED]);
            })
            ->where('date_and_hour', '>=' , $gamesFrom)
            ->orderBy('date_and_hour')
            ->get();

        // group by date
        $gamesByDate = $futureGames->groupBy(function($item, $key) {
            return $item->date_and_hour->toDateString();
        });

        $upcomingGames = collect();

        foreach ($gamesByDate->all() as $games) {
            $games->each(function($game) use ($upcomingGames) {
                $upcomingGames->push($game);
            });

            if ($upcomingGames->count() >= $minGamesToDisplay) {
                break;
            }
        }
        return $upcomingGames;
    }
}
