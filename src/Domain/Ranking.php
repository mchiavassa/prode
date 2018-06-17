<?php

namespace Prode\Domain;

use Illuminate\Support\Collection;

class Ranking extends Collection
{
    /**
     * Ranking constructor.
     *
     * @param Collection $item
     * @param int $limit
     */
    public function __construct(Collection $item, $limit = null)
    {
        $sortedItems = $item->sort(function ($a, $b) {
            if($a->points === $b->points) {
                if(strtolower($a->name) === strtolower($b->name)) {
                    return 0;
                }
                return strtolower($a->name) < strtolower($b->name) ? -1 : 1;
            }
            return $a->points > $b->points ? -1 : 1;
        });

        $ranking = [];

        if ($limit) {
            $sortedItems = $sortedItems->take($limit);
        }

        $position = 1;
        $currentPoints = $sortedItems->first()->points;

        foreach ($sortedItems as $item) {
            if ($item->points < $currentPoints) {
                $currentPoints = $item->points;
                $position++;
            }

            $ranking[] = (object) ['position' => $position, 'item' => $item];
        }

        parent::__construct($ranking);
    }
}
