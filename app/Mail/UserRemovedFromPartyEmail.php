<?php

namespace App\Mail;

use App\Models\Party;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UserRemovedFromPartyEmail extends Mailable
{
    use Queueable, SerializesModels;

    private Party $party;

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
        return $this->view('email.party-removed', [ 'party' => $this->party ]);
    }
}
