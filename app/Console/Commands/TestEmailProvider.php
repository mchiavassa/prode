<?php

namespace App\Console\Commands;

use App\Notifications\TestNotification;
use Illuminate\Console\Command;
use Mockery\Exception;
use Prode\Domain\Model\User;

class TestEmailProvider extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'notify:test';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test the email provider.';

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
        $adminEmails = collect(config('auth.admins'));

        $this->info(sprintf('User to notify: %s', $adminEmails->count()));

        foreach ($adminEmails as $email) {
            $user = $this->user->where('email', $email)->first();

            if (!$user) {
                throw new Exception(sprintf('User with email [%s] not found', $email));
            }

            $user->notify(new TestNotification());
        }

        $this->info('Users notified!');
    }
}
