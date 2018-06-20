<?php

namespace App\Console;

use App\Console\Commands\CreateParty;
use App\Console\Commands\InviteUserToParty;
use App\Console\Commands\NotifyGamesWithoutForecast;
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
        NotifyGamesWithoutForecast::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
         $schedule->command('notify:forecasts:pending')
             ->everyThirtyMinutes()
             ->between('5:30', '17:00')
             ->emailOutputTo(config('auth.admins'));
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
