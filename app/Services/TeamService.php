<?php

namespace App\Services;

use Illuminate\Support\Collection;
use function collect;

class TeamService
{
    /**
     * Returns a list of all teams from the competition sorted by name
     */
    public static function list(): Collection
    {
        $teams = collect(config('domain.teams'))
            ->mapWithKeys(function($code) {
                return [$code => __('domain.teams.'.$code)];
            });

        return $teams->sort();
    }
}
