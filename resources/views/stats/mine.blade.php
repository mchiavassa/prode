<li class="card dropdown-item bg-light border-dark mb-2">
    {{__('stats.mine.forecasts_count')}}
    <h4>
        <strong>{{$userForecastsComputedCount}}</strong>
    </h4>
</li>
<li class="card dropdown-item bg-light border-success mb-2">
    {{__('domain.forecast.assertion.'.\App\Models\ForecastAssertion::RESULT)}}
    <i class="fas fa-question-circle text-muted" data-toggle="tooltip" data-placement="top" title="{{__('stats.mine.result')}}"></i>
    <h4>
        <strong>{{$matchResultForecastsCount}}</strong>
        <small class="text-muted">({{number_format($matchResultForecastsPercentage, 0)}}%)</small>
    </h4>
</li>
<li class="card dropdown-item bg-light border-success mb-2">
    {{__('domain.forecast.assertion.'.\App\Models\ForecastAssertion::SCORE)}}
    <i class="fas fa-question-circle text-muted" data-toggle="tooltip" data-placement="top" title="{{__('stats.mine.score')}}"></i>
    <h4>
        <strong>{{$matchScoreForecastsCount}}</strong>
        <small class="text-muted">({{number_format($matchScoreForecastsPercentage, 0)}}%)</small>
    </h4>
</li>
<li class="card dropdown-item bg-light border-success mb-2">
    {{__('domain.forecast.assertion.'.\App\Models\ForecastAssertion::TIEBREAK_EXISTENCE)}}
    <i class="fas fa-question-circle text-muted" data-toggle="tooltip" data-placement="top" title="{{__('stats.mine.tie_break_existence')}}"></i>
    <h4>
        <strong>{{$matchTieBreakExistenceForecastsCount}}</strong>
        <small class="text-muted">({{number_format($matchTieBreakExistenceForecastsPercentage, 0)}}%)</small>
    </h4>
</li>
<li class="card dropdown-item bg-light border-success mb-2">
    {{__('domain.forecast.assertion.'.\App\Models\ForecastAssertion::TIEBREAK_SCORE)}}
    <i class="fas fa-question-circle text-muted" data-toggle="tooltip" data-placement="top" title="{{__('stats.mine.tie_break_score')}}"></i>
    <h4>
        <strong>{{$matchTieBreakScoreForecastsCount}}</strong>
        <small class="text-muted">({{number_format($matchTieBreakScoreForecastsPercentage, 0)}}%)</small>
    </h4>
</li>
<li class="card dropdown-item bg-light border-danger mb-2">
    Sin aciertos
    <h4>
        <strong>{{$noMatchForecastsCount}}</strong>
        <small class="text-muted">({{number_format($noMatchForecastsPercentage, 0)}}%)</small>
    </h4>
</li>
<li class="dropdown-item disabled text-center">{{__('stats.mine.title')}}</li>

<script type="text/javascript">
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });
</script>
