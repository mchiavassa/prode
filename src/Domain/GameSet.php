<?php

namespace Prode\Domain;

use Illuminate\Database\Eloquent\Model;

class GameSet extends Model
{
    protected $dates = ['forecast_deadline'];

    public function games()
    {
        return $this->hasMany(Game::class);
    }
}
