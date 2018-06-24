<div class="row">
    <div class="col-md-2">
        <div class="card p-3 mb-3 bg-dark text-white">
            <h6>Puntos</h6>
            <h3>
                <strong>
                    {{$points}}
                </strong>
            </h3>
        </div>
    </div>
    <div class="col-md-2">
        <div class="card p-3 mb-3 bg-light border-success">
            <h6>
                {{__('domain.forecast.assertion.'.\Prode\Domain\ForecastAssertion::RESULT)}}
                <i class="fas fa-question-circle text-muted" data-toggle="tooltip" data-placement="top" title="Partidos donde acertaste el resutado."></i>
            </h6>
            <h3>
                <strong>{{$matchResultForecastsCount}}</strong>
                <small class="text-muted">({{number_format($matchResultForecastsPercentage, 0)}}%)</small>
            </h3>
        </div>
    </div>
    <div class="col-md-2">
        <div class="card p-3 mb-3 bg-light border-success">
            <h6>
                {{__('domain.forecast.assertion.'.\Prode\Domain\ForecastAssertion::SCORE)}}
                <i class="fas fa-question-circle text-muted" data-toggle="tooltip" data-placement="top" title="Partidos donde acertaste el marcador."></i>
            </h6>
            <h3>
                <strong>{{$matchScoreForecastsCount}}</strong>
                <small class="text-muted">({{number_format($matchScoreForecastsPercentage, 0)}}%)</small>
            </h3>
        </div>
    </div>
    <div class="col-md-2">
        <div class="card p-3 mb-3 bg-light border-success">
            <h6>
                {{__('domain.forecast.assertion.'.\Prode\Domain\ForecastAssertion::TIEBREAK_EXISTENCE)}}
                <i class="fas fa-question-circle text-muted" data-toggle="tooltip" data-placement="top" title="Partidos donde acertaste la existencia de penales."></i>
            </h6>
            <h3>
                <strong>{{$matchTieBreakExistenceForecastsCount}}</strong>
                <small class="text-muted">({{number_format($matchTieBreakExistenceForecastsPercentage, 0)}}%)</small>
            </h3>
        </div>
    </div>
    <div class="col-md-2">
        <div class="card p-3 mb-3 bg-light border-success">
            <h6>
                {{__('domain.forecast.assertion.'.\Prode\Domain\ForecastAssertion::TIEBREAK_SCORE)}}
                <i class="fas fa-question-circle text-muted" data-toggle="tooltip" data-placement="top" title="Partidos donde acertaste la cantidad exacta de penales."></i>
            </h6>
            <h3>
                <strong>{{$matchTieBreakScoreForecastsCount}}</strong>
                <small class="text-muted">({{number_format($matchTieBreakScoreForecastsPercentage, 0)}}%)</small>
            </h3>
        </div>
    </div>
    <div class="col-md-2">
        <div class="card p-3 mb-3 bg-light border-danger">
            <h6>
                Sin aciertos
            </h6>
            <h3>
                <strong>{{$noMatchForecastsCount}}</strong>
                <small class="text-muted">({{number_format($noMatchForecastsPercentage, 0)}}%)</small>
            </h3>
        </div>
    </div>
</div>

<script>
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });
</script>
