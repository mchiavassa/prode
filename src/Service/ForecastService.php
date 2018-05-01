<?php

namespace Prode\Service;

use InvalidArgumentException;
use Prode\Domain\Model\Forecast;
use Prode\Domain\Model\Game;
use Prode\Domain\Model\GameSet;

class ForecastService
{
    private $gameSet;
    private $forecast;

    public function __construct(GameSet $gameSet, Forecast $forecast)
    {
        $this->gameSet = $gameSet;
        $this->forecast = $forecast;
    }

    /**
     * @param $id id of the GameSet
     */
    public function computeGameSet($id)
    {
        $setGames = $this->gameSet->with('games')->find($id);

        if (!$setGames->isCompleted()) {
            throw new InvalidArgumentException('Set is not completed.');
        }

        $games = $setGames->games->mapWithKeys(function ($item) {
            return [$item['id'] => $item];
        });

        $forecasts = $this->forecast
            ->with('partyUser')
            ->whereIn('game_id', $games->keys()->all())
            ->get();

        /** @var Forecast $forecast */
        foreach ($forecasts as $forecast) {
            $game = $games[$forecast->game_id];

            $this->computeForecast($forecast, $game);
        }
    }

    /**
     * @param Forecast $forecast
     * @param Game $game
     */
    private function computeForecast(Forecast $forecast, Game $game)
    {
        $points = 0;

        if ($forecast->getResult() === $game->getResult()) {
            $points += config('domain.points.result');
        }

        if ($forecast->home_score === $game->home_score &&
            $forecast->away_score === $game->away_score &&
            $forecast->home_tie_brek_score === $game->home_tie_brek_score &&
            $forecast->away_tie_brek_score === $game->away_tie_brek_score
        ) {
            $points += config('domain.points.score');
        }

        $forecast->points_earned = $points;
        $forecast->partyUser->points += $points;

        $forecast->partyUser->save();
        $forecast->save();
    }
}
