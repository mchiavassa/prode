<?php

namespace App\Console\Commands;

use App\Notifications\PartyInvitation;
use Illuminate\Console\Command;
use InvalidArgumentException;
use Prode\Domain\Model\Party;
use Prode\Domain\Model\User;

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

    private $party;
    private $user;

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

        $party->users()->attach($user->id);
        $party->save();

        $user->notify(new PartyInvitation($party));

        $this->info('User invited!');
    }
}
