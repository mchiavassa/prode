<?php

namespace App\Utils;

use Carbon\Carbon;

class DateTimes
{
    /**
     * A unified way to display date times in the app
     *
     * @param Carbon $dateTime
     * @return string
     */
    public static function display(Carbon $dateTime): string
    {
        return $dateTime->format(__('common.formats.datetime.full')) .' ('. config('app.timezone').')';
    }

    /**
     * Returns the current instant in the timezone of the app
     *
     * @return Carbon
     */
    public static function now(): Carbon
    {
        return Carbon::now(config('app.timezone'));
    }

    /**
     * Returns the timestamp of the current datetime
     *
     * @param Carbon $dateTime
     * @return int
     */
    public static function toTimestamp(mixed $dateTime): int
    {
        return $dateTime->timestamp * 1000;
    }
}
