<?php

namespace App\Jobs;

use App\Models\Game;
use App\Models\User;
use App\Notifications\GameForecastsPending;
use App\Utils\DateTimes;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUniqueUntilProcessing;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class NotifyGamesWithMissingForecast implements ShouldQueue, ShouldBeUniqueUntilProcessing
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->onQueue('scheduled');
    }

    public function tags()
    {
        return ['scheduled'];
    }

    /**
     * Look for games starting in an interval of 'window_minutes' minutes, in 'offset_minutes' minutes from now.
     *
     * If games are found, it identifies users that haven't submitted a forecast for them,
     * compiles all games for each user, and sends an email notification reminder to all of them.
     *
     * @return void
     */
    public function handle(Game $game, User $user)
    {
        $start = config('domain.reminders.forecasts.offset_minutes');
        $end = $start + config('domain.reminders.forecasts.window_minutes');

        $gamesAboutToStart = $game
            ->with('forecasts')
            ->whereBetween('date_and_hour', [
                DateTimes::now()->addMinutes($start),
                DateTimes::now()->addMinutes($end)
            ])
            ->get();

        // TODO add logs
        // $this->info(sprintf('Games Found: %s', $gamesAboutToStart->count()));

        $allUsers = $user->get();

        $usersToNotify = [];

        /** @var User $user */
        foreach ($gamesAboutToStart as $game) {
            $usersToNotifyForGame = $allUsers->whereNotIn('id', $game->forecasts->pluck('user_id')->all());

            foreach ($usersToNotifyForGame as $u) {
                $usersToNotify[$u->id][] = $game;
            }
        }

        foreach ($usersToNotify as $id => $games) {
            $allUsers->where('id', $id)->first()->notify(new GameForecastsPending(collect($games)));
        }

        // $this->info('Users notified!');
    }
}
