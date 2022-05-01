<?php

namespace App\Notifications;

use App\Mail\TestEmail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class TestNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct()
    {
    }

    public function tags()
    {
        return ['emails', 'testing'];
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
        return (new TestEmail())
            ->subject(__('emails.test.subject'))
            ->to($notifiable->email);
    }
}
