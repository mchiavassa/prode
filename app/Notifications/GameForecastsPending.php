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

    private Collection $games;

    public function __construct(Collection $games)
    {
        $this->games = $games;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function viaQueues()
    {
        return ['mail' => 'emails',];
    }

    public function toMail($notifiable)
    {
        return (new GameForecastsPendingEmail($this->games))
            ->subject(__('emails.forecasts.subject'))
            ->to($notifiable->email);
    }
}
