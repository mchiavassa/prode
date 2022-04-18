<?php

namespace App\Console;

use App\Console\Commands\AdjustUserPoints;
use App\Console\Commands\CreateParty;
use App\Console\Commands\InviteUserToParty;
use App\Console\Commands\TestEmailProvider;
use App\Jobs\NotifyGamesWithMissingForecast;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        CreateParty::class,
        InviteUserToParty::class,
        TestEmailProvider::class,
        AdjustUserPoints::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->job(new NotifyGamesWithMissingForecast())
            ->cron(config('domain.reminders.forecasts.cron'))
            ->timezone(config('domain.tournament.schedule.timezone'))
            ->between(
                config('domain.tournament.schedule.from'),
                config('domain.tournament.schedule.to')
            );
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
