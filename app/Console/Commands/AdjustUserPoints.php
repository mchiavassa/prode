<?php

namespace App\Console\Commands;

use function foo\func;
use Illuminate\Console\Command;
use Illuminate\Database\DatabaseManager;
use Prode\Domain\Model\Forecast;
use Prode\Domain\Model\User;

class AdjustUserPoints extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:points:adjust';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Adjust user points by sum all forecasts.';

    private $forecast;
    private $user;
    private $db;

    public function __construct(Forecast $forecast, User $user, DatabaseManager $db)
    {
        parent::__construct();

        $this->forecast = $forecast;
        $this->user = $user;
        $this->db = $db;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $usersFixed = $this->db->connection()->transaction(function () {
            $allUsers = $this->user->get();
            $usersFixed = collect();

            foreach ($allUsers as $user) {
                $forecasts = $this->forecast->where('user_id', $user->id)->get();
                $realPoints = $forecasts->sum('points_earned');
                $oldPoints = $user->points;
                if ($oldPoints != $realPoints) {

                    $user->points = $realPoints;
                    $user->save();

                    $usersFixed->push((object)[
                        'id' => $user->id,
                        'name' => $user->name,
                        'oldPoints' => $oldPoints,
                        'realPoints' => $realPoints,
                    ]);
                    $this->warn(sprintf('User: #%s %s [%s] DIFF', $user->id, $user->name, $user->email));
                } else {
                    $this->info(sprintf('User: #%s %s [%s] OK', $user->id, $user->name, $user->email));
                }
            }

            return $usersFixed;
        });


        $this->info(sprintf('Users fixed: %s', $usersFixed->count()));

        $this->table(
            ['id', 'name', 'Wrong Points', 'Real Points'],
            $usersFixed->map(function($user) {
                return [$user->id, $user->name, $user->oldPoints, $user->realPoints];
            })->all()
        );
    }
}
