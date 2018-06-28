<?php

namespace App\Notifications;

use App\Mail\GameWrongComputedEmail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class GameWrongComputedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct()
    {
    }

    public function via($notifiable)
    {
        return ['mail'];
    }


    public function toMail($notifiable)
    {
        return (new GameWrongComputedEmail())
            ->subject('Fe de erratas: juego mal computaado!')
            ->to($notifiable->email);
    }
}
