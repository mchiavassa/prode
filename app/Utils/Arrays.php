<?php

namespace App\Utils;

use Illuminate\Support\Arr;

class Arrays
{
    /**
     * Return the received array without the element to exclude
     */
    public static function allBut(array $arr, string $but): array
    {
        $newArr = array();
        foreach ($arr as $value) {
            if ($value !== $but) $newArr[] = $value;
        }
        return $newArr;
    }
}
