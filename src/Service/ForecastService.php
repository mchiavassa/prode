<?php

namespace Prode\Service;

use InvalidArgumentException;
use Prode\Domain\Model\Forecast;
use Prode\Domain\Model\GameSet;

class ForecastService
{
    private $pointsService;
    private $gameSet;
    private $forecast;

    public function __construct(PointsService $pointsService, GameSet $gameSet, Forecast $forecast)
    {
        $this->pointsService = $pointsService;
        $this->gameSet = $gameSet;
        $this->forecast = $forecast;
    }

    /**
     * @param $gameSetId
     */
    public function computeForecastsFromGameSet($gameSetId)
    {
        $gameSet = $this->gameSet->with('games')->find($gameSetId);

        $games = $gameSet->games->mapWithKeys(function ($item) {
            return [$item['id'] => $item];
        });

        $forecasts = $this->forecast
            ->with('user')
            ->whereIn('game_id', $games->keys()->all())
            ->get();

        /** @var Forecast $forecast */
        foreach ($forecasts as $forecast) {
            $game = $games[$forecast->game_id];

            $points = $this->pointsService->resolveForecastPoints($forecast, $game);

            $forecast->points_earned = $points;
            $forecast->user->points += $points;

            $forecast->user->save();
            $forecast->save();
        }

        $gameSet->status = GameSet::STATUS_COMPUTED;
        $gameSet->save();
    }
}
