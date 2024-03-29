<?php

namespace App\Console\Commands;

use App\Models\Party;
use App\Models\User;
use App\Notifications\PartyJoinRequestAccepted;
use Illuminate\Console\Command;
use InvalidArgumentException;

class InviteUserToParty extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'party:invite
                             {--email= : Email of the User}
                             {--party_id= : Id of the Party}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Invites a user to a Party.';

    private Party $party;
    private User $user;

    public function __construct(Party $party, User $user)
    {
        parent::__construct();

        $this->party = $party;
        $this->user = $user;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        /** @var Party $party */
        $party = $this->party->findOrFail($this->option('party_id'));

        /** @var User $user */
        $user = $this->user->where('email', $this->option('email'))->first();

        if (!$user) {
            throw new InvalidArgumentException('User not found');
        }

        $this->info('Inviting user to Party...');

        $this->table(['user', 'party'], [[$user->name, $party->name]]);

        $party->users()->attach($user->id, ['is_admin' => false]);
        $party->save();

        $user->notify(new PartyJoinRequestAccepted($party));

        $this->info('User invited!');
    }
}
