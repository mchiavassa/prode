<?php

namespace App\Notifications;

use App\Mail\GameForecastsPendingEmail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Collection;

class GameForecastsPending extends Notification implements ShouldQueue
{
    use Queueable;

    private $games;

    public function __construct(Collection $games)
    {
        $this->games = $games;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }


    public function toMail($notifiable)
    {
        return (new GameForecastsPendingEmail($this->games))
            ->subject('No te olvides de tus pronósticos!')
            ->to($notifiable->email);
    }
}
