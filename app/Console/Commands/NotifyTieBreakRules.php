<?php

namespace App\Console\Commands;

use App\Notifications\TieBreakRulesNotification;
use Illuminate\Console\Command;
use Prode\Domain\Model\User;

class NotifyTieBreakRules extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'notify:tiebreak';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Notifies to users the new tie break score rules.';

    private $user;

    public function __construct(User $user)
    {
        parent::__construct();

        $this->user = $user;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $allUsers = $this->user->get();

        $this->info(sprintf('User to notify: %s', $allUsers->count()));

        foreach ($allUsers as $user) {
            $user->notify(new TieBreakRulesNotification());
        }

        $this->info('Users notified!');
    }
}
