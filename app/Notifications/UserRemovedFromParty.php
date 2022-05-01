<?php

namespace App\Notifications;

use App\Mail\UserRemovedFromPartyEmail;
use App\Models\Party;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;


class UserRemovedFromParty extends Notification implements ShouldQueue
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

    public function viaQueues()
    {
        return ['mail' => 'emails',];
    }

    public function tags()
    {
        return ['emails'];
    }

    public function toMail($notifiable)
    {
        return (new UserRemovedFromPartyEmail($this->party))
            ->subject(sprintf(__('emails.party-user-removed.subject'), $this->party->name))
            ->to($notifiable->email);
    }
}
