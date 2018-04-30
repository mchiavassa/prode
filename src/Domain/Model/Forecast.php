<?php

namespace Prode\Domain\Model;

use Illuminate\Database\Eloquent\Model;

class Forecast extends Model
{
    public function game()
    {
        return $this->belongsTo(Game::class);
    }

    public function partyUser()
    {
        return $this->belongsTo(PartyUser::class);
    }
}
