<?php

namespace App\Models;

use Illuminate\Support\Collection;

/**
 * Represents a ranking of entities that contain the 'name' and 'points' attribute.
 */
class Ranking extends Collection
{
    public function __construct(Collection $items, int $limit = null, $positions = null)
    {
        $sortedItems = $items->sort(function ($a, $b) {
            if($a->points === $b->points) {
                if(strtolower($a->name) === strtolower($b->name)) {
                    return 0;
                }
                return strtolower($a->name) < strtolower($b->name) ? -1 : 1;
            }
            return $a->points > $b->points ? -1 : 1;
        });

        if ($limit) {
            $sortedItems = $sortedItems->take($limit);
        }

        $ranking = [];

        $position = 1;
        $currentPoints = $sortedItems->isNotEmpty() ? $sortedItems->first()->points : 0;

        foreach ($sortedItems as $item) {
            if ($item->points < $currentPoints) {
                $currentPoints = $item->points;
                $position++;

                if ($positions && $position > $positions) break;
            }

            $ranking[] = (object) ['position' => $position, 'item' => $item];
        }

        parent::__construct($ranking);
    }
}
