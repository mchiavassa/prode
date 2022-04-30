<?php

namespace App\Utils;

class Localization
{
    public static function getForecastBoxLocalizedStrings() : array
    {
        return [
            'format' => [
                'datetime' => __('common.formats.datetime.forecast_box'),
                'day' => __('common.formats.datetime.day'),
                'hour' => __('common.formats.datetime.hour'),
                'minute' => __('common.formats.datetime.minute'),
                'second' => __('common.formats.datetime.second'),
            ],
            'submit' => __('game.forecasts.submit'),
            'goals' => __('game.result.score'),
            'penalties' => __('game.result.tiebreak'),
            'unexpectedError' => __('common.messages.errors.unexpected'),
            'countdown' => [
                'before' => __('game.forecasts.countdown.before'),
                'after' => __('game.forecasts.countdown.after'),
            ],
            'yourForecast' => __('game.forecasts.your'),
            'update' => __('game.forecasts.update'),
            'cancel' => __('game.forecasts.cancel'),
            'noForecast' => __('game.forecasts.none'),
            'finalResult' => __('game.result.final'),
            'partialResult' => __('game.result.partial'),
            'points' => __('game.forecasts.points'),
            'live' => __('domain.game.status.live'),
            'finished' => __('domain.game.status.finished'),
        ];
    }
}
