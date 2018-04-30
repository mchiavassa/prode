<?php

namespace Prode\Domain\Model;

use Illuminate\Database\Eloquent\Model;

class Party extends Model
{
    public function users()
    {
        return $this->hasMany(PartyUser::class);
    }
}
