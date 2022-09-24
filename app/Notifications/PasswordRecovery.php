<?php

namespace App\Notifications;

use App\Mail\PasswordRecoveryEmail;
use App\Mail\VerificationEmail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;


class PasswordRecovery extends Notification implements ShouldQueue
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

    public function shouldSend($notifiable, $channel)
    {
        return $notifiable->emailIsVerified();
    }

    public function toMail($notifiable)
    {
        return (new PasswordRecoveryEmail(route('login.restore_password.show', ['token' => $this->token])))
            ->subject(__('emails.password_recovery.subject'))
            ->to($notifiable->email);
    }
}
