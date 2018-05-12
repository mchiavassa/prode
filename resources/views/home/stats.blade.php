@extends('layouts.app')

@section('content')
    <div class="mb-4">
        <h2>Estadísticas</h2>
    </div>

    <div class="row">
        <div class="col-md-6">
            <div class="card p-3 mb-3">
                <h4 class="mb-4">Pronósticos enviados hoy</h4>
                <h1>
                    <strong>
                        {{$todayForecasts}}
                    </strong>
                </h1>
            </div>
            <div class="card p-3 mb-3">
                <h4 class="mb-4">Quienes pronosticaron</h4>
                @include('common.user-ranking', ['ranking' => new \Prode\Domain\Ranking($todayForecasters)])
            </div>
            <div class="card p-3 mb-3">
                <h4 class="mb-4">Top 5 fechas</h4>
                @include('common.ranking', ['ranking' => new \Prode\Domain\Ranking($topGameSets)])
            </div>
            <div class="card p-3 mb-3">
                <h4 class="mb-4">Top 5 partidos</h4>
                @include('common.ranking', ['ranking' => new \Prode\Domain\Ranking($topGames)])
            </div>
        </div>
        <div class="col-md-6">
            <div class="card p-3 mb-3">
                <h4 class="mb-4">Total puntos entregados</h4>
                <h1>
                    <strong>
                        {{$totalPoints}}
                    </strong>
                </h1>
            </div>
            <div class="card p-3 mb-3">
                <h4 class="mb-4">Top 5 usuarios</h4>
                @include('party.ranking', ['ranking' => new \Prode\Domain\Ranking($topUsers)])
            </div>
            <div class="card p-3 mb-3">
                <h4 class="mb-4">Usuarios nuevos hoy</h4>
                <h1>
                    <strong>
                        {{$todayUsers}}
                    </strong>
                </h1>
            </div>
        </div>
    </div>
@endsection
