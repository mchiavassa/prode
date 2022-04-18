<?php

namespace App\Services;

use App\Models\Game;
use App\Models\GameSet;
use App\Utils\DateTimes;
use Carbon\Carbon;

class GameService
{
    private Game $game;

    public function __construct(Game $game) {
        $this->game = $game;
    }

    /**
     * Returns a list of upcoming games to forecast from the next 4 days
     */
    public function getUpcomingGamesToForecast()
    {
        $daysAheadToCheck = 4;
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
                // and it's been more than 2 hours since the last one finished
                && DateTimes::now()->addHours(-2)->greaterThanOrEqualTo($nextGames->last()->date_and_hour)
            ) {
                // clean the list and look for tomorrow's games
                $nextGames = collect();
            }

            $currentDay++;
        } while ($nextGames->isEmpty() && $daysAheadToCheck > $currentDay);


        return $nextGames;
    }
}
