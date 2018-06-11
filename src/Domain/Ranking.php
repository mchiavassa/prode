<?php

namespace Prode\Domain;

use Illuminate\Support\Collection;

class Ranking extends Collection
{
    /**
     * Ranking constructor.
     *
     * @param Collection $users
     */
    public function __construct(Collection $users)
    {
        $sortedUsers = $users->sort(function ($a, $b) {
            if($a->points === $b->points) {
                if(strtolower($a->name) === strtolower($b->name)) {
                    return 0;
                }
                return strtolower($a->name) < strtolower($b->name) ? -1 : 1;
            }
            return $a->points > $b->points ? -1 : 1;
        });

        $ranking = [];
        $position = 1;

        foreach ($sortedUsers as $user) {
            $ranking[$position] = $user;
            $position++;
        }

        parent::__construct($ranking);
    }
}
