<div class="row">
    <div class="col-md-12">
        <div class="text-muted">
            {{__('stats.mine.forecast_progress', ['games' => $gamesCount, 'forecasts' => $forecastsCount])}}
        </div>
        <div class="progress">
            <div class="progress-bar bg-success"
                 role="progressbar"
                 style="width: {{\App\Utils\Numbers::format($percentage)}}%"
                 aria-valuenow="{{\App\Utils\Numbers::format($percentage)}}"
                 aria-valuemin="0"
                 aria-valuemax="100">
                {{\App\Utils\Numbers::format($percentage)}}%
            </div>
        </div>
    </div>
</div>
