<div class="container">
    <div class="row mb-1">
        <div class="col-md-12">
            <h4 class="h3 d-inline-block">{{__('stats.mine.title')}}</h4>
            <span class="badge rounded-pill bg-success align-text-bottom">
                <strong>{{$userForecastsCount}}</strong>
                {{__('stats.mine.'.($userForecastsCount == 1 ? 'forecast_count' : 'forecasts_count'))}}
            </span>
            @if($nonForecastedMatchesCount > 0)
            <span class="badge rounded-pill bg-danger align-text-bottom">
                <strong>{{$nonForecastedMatchesCount}}</strong>
                {{__('stats.mine.'.($nonForecastedMatchesCount == 1 ? 'game_not_forecasted_count' : 'games_not_forecasted_count'))}}
            </span>
            @endif
            <span class="badge rounded-pill bg-dark align-text-bottom">
                <strong>{{$computedGamesCount}}</strong>
                {{__('stats.mine.'.($computedGamesCount == 1 ? 'game_computed_count' : 'games_computed_count'))}}
            </span>
        </div>
    </div>
    <div class="row">
        <div class="col-md">
            @include('stats.card', ['stat' => \App\Models\ForecastAssertion::RESULT, 'percentage' => $matchResultForecastsPercentage, 'forecastsCount' => $matchResultForecastsCount, 'total' => $computedGamesCount, 'color' => 'success'])
        </div>
        <div class="col-md">
            @include('stats.card', ['stat' => \App\Models\ForecastAssertion::SCORE, 'percentage' => $matchScoreForecastsPercentage, 'forecastsCount' => $matchScoreForecastsCount, 'total' => $computedGamesCount, 'color' => 'success'])
        </div>
        <div class="col-md">
            @include('stats.card', ['stat' => \App\Models\ForecastAssertion::TIEBREAK_EXISTENCE, 'percentage' => $matchTieBreakExistenceForecastsPercentage, 'forecastsCount' => $matchTieBreakExistenceForecastsCount, 'total' => $computedGamesWithTieBreakResultCount, 'color' => 'success'])
        </div>
        <div class="col-md">
            @include('stats.card', ['stat' => \App\Models\ForecastAssertion::TIEBREAK_SCORE, 'percentage' => $matchTieBreakScoreForecastsPercentage, 'forecastsCount' => $matchTieBreakScoreForecastsCount, 'total' => $computedGamesWithTieBreakResultCount, 'color' => 'success'])
        </div>
        <div class="col-md">
            @include('stats.card', ['stat' => 'nothing', 'percentage' => $noMatchForecastsPercentage, 'forecastsCount' => $noMatchForecastsCount, 'total' => $computedGamesCount, 'color' => 'danger'])
        </div>
    </div>
</div>

<script type="text/javascript">
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });
</script>
