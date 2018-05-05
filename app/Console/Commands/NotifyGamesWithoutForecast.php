<?php

namespace App\Console\Commands;

use App\Notifications\GameForecastsPending;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Prode\Domain\Model\Game;
use Prode\Domain\Model\User;

class NotifyGamesWithoutForecast extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'notify:forecasts:pending';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Notifies to users games without forecast that start in the next half hour.';

    private $game;
    private $user;

    public function __construct(Game $game, User $user)
    {
        parent::__construct();

        $this->game = $game;
        $this->user = $user;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $gamesAboutToStart = $this->game
            ->with('forecasts')
            ->whereBetween('date_and_hour', [Carbon::now()->addMinutes(10), Carbon::now()->addMinutes(40)])
            ->get();

        $allUsers = $this->user->get();

        $usersToNotify = [];

        /** @var User $user */
        foreach ($gamesAboutToStart as $game) {
            $usersToNotifyForGame = $allUsers->whereNotIn('id', $game->forecasts->pluck('user_id')->all());

            foreach ($usersToNotifyForGame as $user) {
                $usersToNotify[$user->id][] = $game;
            }
        }

        foreach ($usersToNotify as $id => $games) {
            $allUsers->where('id', $id)->first()->notify(new GameForecastsPending(collect($games)));
        }

        $this->info('Users notified!');
    }
}
