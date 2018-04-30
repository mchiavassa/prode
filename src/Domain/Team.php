<?php

namespace Prode\Domain;

class Team
{
    public static function list()
    {
        $teams = collect(config('domain.teams'));

        return $teams->sort();
    }
}
