<?php

namespace App\Notifications;

use App\Mail\PartyJoinRequestAcceptedEmail;
use App\Models\Party;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;


class PartyJoinRequestAccepted extends Notification implements ShouldQueue
{
    use Queueable;

    private Party $party;

    public function __construct(Party $party)
    {
        $this->party = $party;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function tags()
    {
        return ['emails'];
    }

    public function viaQueues()
    {
        return ['mail' => 'emails',];
    }

    public function toMail($notifiable)
    {
        return (new PartyJoinRequestAcceptedEmail($this->party))
            ->subject(sprintf(__('emails.party.subject'), $this->party->name))
            ->to($notifiable->email);
    }
}
