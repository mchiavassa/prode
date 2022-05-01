<?php

namespace App\Notifications;

use App\Mail\GameSetEnabledEmail;
use App\Models\GameSet;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class GameSetEnabled extends Notification implements ShouldQueue
{
    use Queueable;

    private GameSet $gameSet;

    public function __construct(GameSet $gameSet)
    {
        $this->gameSet = $gameSet;
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
        return (new GameSetEnabledEmail($this->gameSet))
            ->subject(__('emails.set.subject'))
            ->to($notifiable->email);
    }
}
