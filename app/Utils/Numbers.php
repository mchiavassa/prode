<?php

namespace App\Utils;

class Numbers
{
    /**
     * Return a standard format for numbers with 2 decimals.
     */
    public static function format($var): string
    {
        return sprintf(round($var, 2) == intval($var) ? "%d" : "%.2f", $var);
    }
}
