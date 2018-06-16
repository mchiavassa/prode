<div class="row">
    <div class="col-md-3">
        <div class="card p-3 mb-3 bg-dark text-white">
            <h6>Puntos</h6>
            <h3>
                <strong>
                    {{$points}}
                </strong>
            </h3>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card p-3 mb-3 bg-light border-success">
            <h6>Acertaste el resultado de</h6>
            <h3>
                <strong>{{$matchResultForecastsCount}}</strong>
                <small class="text-muted">({{number_format($matchResultForecastsPercentage, 0)}}%)</small>
            </h3>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card p-3 mb-3 bg-light border-success">
            <h6>Acertaste el marcador de</h6>
            <h3>
                <strong>{{$matchScoreForecastsCount}}</strong>
                <small class="text-muted">({{number_format($matchScoreForecastsPercentage, 0)}}%)</small>
            </h3>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card p-3 mb-3 bg-light border-danger">
            <h6>No acertados</h6>
            <h3>
                <strong>{{$noMatchForecastsCount}}</strong>
                <small class="text-muted">({{number_format($noMatchForecastsPercentage, 0)}}%)</small>
            </h3>
        </div>
    </div>
</div>
