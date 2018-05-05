<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Collection;

class GameForecastsPendingEmail extends Mailable
{
    use Queueable, SerializesModels;

    private $games;

    public function __construct(Collection $games)
    {
        $this->games = $games;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('email.game-forecasts-pending', ['games' => $this->games]);
    }
}
