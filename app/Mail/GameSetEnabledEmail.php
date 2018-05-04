<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Prode\Domain\Model\GameSet;

class GameSetEnabledEmail extends Mailable
{
    use Queueable, SerializesModels;

    private $gameSet;

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
