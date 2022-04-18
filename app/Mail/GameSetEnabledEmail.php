<?php

namespace App\Mail;

use App\Models\GameSet;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class GameSetEnabledEmail extends Mailable
{
    use Queueable, SerializesModels;

    private GameSet $gameSet;

    public function __construct(GameSet $gameSet)
    {
        $this->gameSet = $gameSet;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('email.game-set-enabled', [ 'gameSet' => $this->gameSet ]);
    }
}
