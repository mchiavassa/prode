<div class="card p-3 mb-3 bg-dark text-white">
    <h4 class="mb-4">Puntos</h4>
    <h1>
        <strong>
            {{$points}}
        </strong>
    </h1>
</div>

<div class="card p-3 mb-3 bg-light">
    <h6 class="mb-4">Pronósticos enviados</h6>
    <h3>
        <strong>{{$forecastsCount}}</strong>
        <small class="text-muted">({{$forecastComputedCount}} computados)</small>
    </h3>
</div>

<div class="card p-3 mb-3 bg-light border-success">
    <h6 class="mb-4">Acertaste el resultado de</h6>
    <h3>
        <strong>{{$matchResultForecastsCount}}</strong>
        <small class="text-muted">({{number_format($matchResultForecastsPercentage, 0)}}%)</small>
    </h3>
</div>

<div class="card p-3 mb-3 bg-light border-success">
    <h6 class="mb-4">Acertaste el marcador de</h6>
    <h3>
        <strong>{{$matchScoreForecastsCount}}</strong>
        <small class="text-muted">({{number_format($matchScoreForecastsPercentage, 0)}}%)</small>
    </h3>
</div>

<div class="card p-3 mb-3 bg-light border-danger">
    <h6 class="mb-4">No acertados</h6>
    <h3>
        <strong>{{$noMatchForecastsCount}}</strong>
        <small class="text-muted">({{number_format($noMatchForecastsPercentage, 0)}}%)</small>
    </h3>
</div>
