<?php

namespace App\Notifications;

use App\Mail\GameSetEnabledEmail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use Prode\Domain\Model\GameSet;

class GameSetEnabled extends Notification implements ShouldQueue
{
    use Queueable;

    private $gameSet;

    public function __construct(GameSet $gameSet)
    {
        $this->gameSet = $gameSet;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }


    public function toMail($notifiable)
    {
        return (new GameSetEnabledEmail($this->gameSet))
            ->subject('Nueva fecha habilitada')
            ->to($notifiable->email);
    }
}
