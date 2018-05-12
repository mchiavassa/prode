<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Prode\Domain\Model\Party;

class PartyJoinRequestAcceptedEmail extends Mailable
{
    use Queueable, SerializesModels;

    private $party;

    public function __construct(Party $party)
    {
        $this->party = $party;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('email.party-welcome', [ 'party' => $this->party ]);
    }
}
