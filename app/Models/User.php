<?php

namespace App\Models;

use Illuminate\Contracts\Translation\HasLocalePreference;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements HasLocalePreference
{
    use SoftDeletes;
    use Notifiable;

    protected $dates = ['deleted_at', 'email_verified_at'];

    public function logins()
    {
        return $this->hasMany(UserLogin::class);
    }

    public function parties()
    {
        return $this->belongsToMany(Party::class)->withPivot('is_admin');
    }

    public function forecasts()
    {
        return $this->hasMany(Forecast::class);
    }

    public function tokens()
    {
        return $this->hasMany(UserTempToken::class);
    }

    /**
     * @return bool
     */
    public function isAdmin()
    {
        return in_array($this->email, config('auth.admins'));
    }

    public function getPictureUrlAttribute($value)
    {
        return empty($value) ? asset('img/user-avatar.png') : $value;
    }

    /**
     * Get the user's preferred locale.
     * To notifications (emails) in the user language.
     *
     * @return string
     */
    public function preferredLocale()
    {
        return $this->locale;
    }

    public function emailIsVerified()
    {
        return !empty($this->email_verified_at);
    }

    /**
     * Get the user's average points based on the computed forecasts
     *
     * @return float|int
     */
    public function average()
    {
        $computedForecastsCount = $this->forecasts
            ->filter(function(Forecast $forecast) {
                return $forecast->computed();
            })->count();

        return $computedForecastsCount == 0 ? 0 : $this->points / $computedForecastsCount;
    }
}
