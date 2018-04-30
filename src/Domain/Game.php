<?php

namespace Prode\Domain;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    public function set()
    {
        return $this->belongsTo(GameSet::class);
    }

    public function forecasts()
    {
        return $this->hasMany(Forecast::class);
    }
}
