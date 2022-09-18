<?php

namespace App\Notifications;

use App\Mail\VerificationEmail;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;


class EmailVerification extends Notification implements ShouldQueue
{
    use Queueable;

    private string $token;

    public function __construct(string $token)
    {
        $this->token = $token;
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
        return (new VerificationEmail(route('email.verify', ['token' => $this->token])))
            ->subject(__('emails.verification.subject'))
            ->to($notifiable->email);
    }
}
