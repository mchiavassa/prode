<?php

namespace App\Models;

use Illuminate\Support\Collection;

/**
 * Represents a ranking of entities that contain the 'name' and 'points' attribute.
 */
class Ranking extends Collection
{
    private const DESC = 'desc';
    private const ASC = 'asc';

    private function __construct(Collection $items, $positions = null, $includeItem = null, $compareFunc = null, $sort = self::ASC)
    {
        $sortedItems = $items->sort(function ($a, $b) use ($sort) {
            if($a->points === $b->points) {
                if(strtolower($a->name) === strtolower($b->name)) {
                    return 0;
                }
                return strtolower($a->name) < strtolower($b->name) ? -1 : 1;
            }
            return $sort == self::ASC
                ? ($a->points > $b->points ? -1 : 1)
                : ($a->points < $b->points ? -1 : 1);
        });

        $ranking = [];

        $position = 1;
        $currentPoints = $sortedItems->isNotEmpty() ? $sortedItems->first()->points : 0;

        $includeItemFound = $includeItem == null; // if there's no item to find, then true
        $topRankingCompleted = false;

        foreach ($sortedItems as $item) {
            if ($item->points != $currentPoints) {
                $currentPoints = $item->points;
                $position++;

                // If we reached to the expected positions
                if ($positions && $position > $positions) {
                    $topRankingCompleted = true;
                    if ($includeItemFound) break;
                }
            }

            // if we haven't found the item we compare it with the current one
            if (!$includeItemFound) {
                $includeItemFound = $compareFunc != null
                    ? $compareFunc($includeItem, $item)
                    : $includeItem == $item;

                // if we found the item, we add it to the ranking!
                if ($includeItemFound) {
                    $ranking[] = (object) ['position' => $position, 'item' => $item];
                    continue;
                }
            }

            // keep adding items as the ranking is not completed
            if (!$topRankingCompleted) {
                $ranking[] = (object) ['position' => $position, 'item' => $item];
            }
        }

        parent::__construct($ranking);
    }

    public static function ofItems(Collection $items): Ranking
    {
        return new self($items, null);
    }

    public static function ofItemsWithPositions(Collection $items, int $positions): Ranking
    {
        return new self($items, $positions);
    }

    public static function ofItemsWithPositionsDescendant(Collection $items, int $positions): Ranking
    {
        return new self($items, $positions, null, null,self::DESC);
    }

    public static function ofItemsWithPositionsAndIncludeItem(
        Collection $items,
        int        $positions,
                   $includeItem,
                   $compareFunc): Ranking
    {
        return new self($items, $positions, $includeItem, $compareFunc);
    }
}
