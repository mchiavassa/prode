<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PartyJoinRequest extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function party()
    {
        return $this->belongsTo(Party::class);
    }
}
