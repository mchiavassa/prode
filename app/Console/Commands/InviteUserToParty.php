<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use InvalidArgumentException;
use Prode\Domain\Model\Party;
use Prode\Domain\Model\PartyUser;
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
        $party = $this->party->find($this->option('party_id'));
        $user = $this->user->where('email', $this->option('email'))->first();

        if (!$user) {
            throw new InvalidArgumentException('User not found');
        }

        $this->info('Inviting user to Party...');

        $this->table(['user', 'party'], [[$user->name, $party->name]]);

        $partyUser = new PartyUser();
        $partyUser->party()->associate($party);
        $partyUser->user()->associate($user);
        $partyUser->save();

        // TODO: send email!

        $this->info('User invited!');
    }
}
