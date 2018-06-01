<?php

namespace Prode\Service;

use Illuminate\Database\DatabaseManager;
use Prode\Domain\ForecastResult;
use Prode\Domain\Model\Forecast;
use Prode\Domain\Model\Game;

class ForecastService
{
    private $pointsService;
    private $db;
    private $forecast;

    public function __construct(PointsService $pointsService, DatabaseManager $db, Forecast $forecast)
    {
        $this->pointsService = $pointsService;
        $this->db = $db;
        $this->forecast = $forecast;
    }

    /**
     * @param Forecast $forecast
     * @param Game $game
     *
     * @return ForecastResult
     */
    public function resolveForecastResult(Forecast $forecast, Game $game)
    {
        if ($this->resultMatches($forecast, $game)) {
            if ($this->scoreMatches($forecast, $game)) {
                return new ForecastResult(ForecastResult::MATCH_SCORE);
            }

            return new ForecastResult(ForecastResult::MATCH_RESULT);
        }

        return new ForecastResult(ForecastResult::NO_MATCH);
    }

    /**
     * @param Game $game
     */
    public function computeGame(Game $game)
    {
        $forecasts = $this->forecast
            ->with('user')
            ->where('game_id', $game->id)
            ->get();

        $this->db->connection()->transaction(function () use ($game, $forecasts) {
            /** @var Forecast $forecast */
            foreach ($forecasts as $forecast) {

                /** @var ForecastResult $result */
                $result = $this->resolveForecastResult($forecast, $game);
                $points = $this->pointsService->getForecastResultPoints($result);

                $forecast->points_earned = $points;
                $forecast->result = (string) $result;
                $forecast->user->points += $points;

                $forecast->user->save();
                $forecast->save();
            }

            $game->computed = true;
            $game->save();
        });
    }

    /**
     * @param Forecast $forecast
     * @param Game $game
     *
     * @return bool
     */
    private function resultMatches(Forecast $forecast, Game $game)
    {
        return $forecast->getResult() === $game->getResult();
    }

    /**
     * @param Forecast $forecast
     * @param Game $game
     *
     * @return bool
     */
    private function scoreMatches(Forecast $forecast, Game $game)
    {
        return $forecast->home_score === $game->home_score &&
            $forecast->away_score === $game->away_score &&
            $forecast->home_tie_brek_score === $game->home_tie_brek_score &&
            $forecast->away_tie_brek_score === $game->away_tie_brek_score;
    }
}
