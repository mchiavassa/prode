<?php

namespace App\Notifications;

use App\Mail\PartyJoinRequestAcceptedEmail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use Prode\Domain\Model\Party;

class PartyJoinRequestAccepted extends Notification implements ShouldQueue
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
        return (new PartyJoinRequestAcceptedEmail($this->party))
            ->subject(sprintf('Bienvenido a %s', $this->party->name))
            ->to($notifiable->email);
    }
}
