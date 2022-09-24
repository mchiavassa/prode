<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordRecoveryEmail extends Mailable
{
    use Queueable, SerializesModels;

    private string $recoveryUrl;

    public function __construct(string $recoveryUrl)
    {
        $this->recoveryUrl = $recoveryUrl;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('email.password-recovery', ['url' => $this->recoveryUrl]);
    }
}
