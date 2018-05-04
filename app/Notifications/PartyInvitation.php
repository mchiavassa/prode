<?php

namespace App\Notifications;

use App\Mail\PartyInvitationEmail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use Prode\Domain\Model\Party;

class PartyInvitation extends Notification implements ShouldQueue
{
    use Queueable;

    private $party;

    public function __construct(Party $party)
    {
        $this->party = $party;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }


    public function toMail($notifiable)
    {
        return (new PartyInvitationEmail($this->party))
            ->subject(sprintf('Bienvenido a "%s"', $this->party->name))
            ->to($notifiable->email);
    }
}
