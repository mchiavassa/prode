<?php

namespace Prode\Domain\Model;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use SoftDeletes;
    use Notifiable;

    protected $dates = ['deleted_at'];

    public function logins()
    {
        return $this->hasMany(UserLogin::class);
    }

    public function parties()
    {
        return $this->belongsToMany(Party::class)->withPivot('is_admin');
    }

    /**
     * @return bool
     */
    public function isAdmin()
    {
        return in_array($this->email, config('auth.admins'));
    }
}
