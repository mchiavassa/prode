<?php

namespace App\Notifications;

use App\Mail\TieBreakRulesEmail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class TieBreakRulesNotification extends Notification implements ShouldQueue
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
        return (new TieBreakRulesEmail())
            ->subject('Se vienen las definiciones por penales!')
            ->to($notifiable->email);
    }
}
