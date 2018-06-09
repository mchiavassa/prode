@extends('layouts.app')

@section('content')
    <div class="mb-4">
        <h2>Estadísticas</h2>
    </div>

    <div class="row">
        <div class="col-md-6">
            <div class="row">
                <div class="col-md-6">
                    <div class="card p-3 mb-3">
                        <h4 class="mb-4">Puntos</h4>
                        <h1>
                            <strong>
                                {{$totalPoints}}
                            </strong>
                        </h1>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card p-3 mb-3">
                        <h4 class="mb-4">Promedio</h4>
                        <h1>
                            <strong>
                                {{$totalAverage}}
                            </strong>
                        </h1>
                    </div>
                </div>
            </div>

            <div class="card p-3 mb-3">
                <h4 class="mb-4">Top 5 usuarios</h4>
                @include('common.user-ranking', ['ranking' => new \Prode\Domain\Ranking($topUsers)])
            </div>
        </div>
        <div class="col-md-6">
            <div class="row">
                <div class="col-md-6">
                    <div class="card p-3 mb-3">
                        <h4 class="mb-4">Usuarios hoy</h4>
                        <h1>
                            <strong>
                                {{$todayUsers->count()}}
                            </strong>
                        </h1>
                        @include('common.user-grid', ['users' => $todayUsers])
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card p-3 mb-3">
                        <h4 class="mb-4">Grupos hoy</h4>
                        <h1>
                            <strong>
                                {{$todayParties}}
                            </strong>
                        </h1>
                    </div>
                </div>
            </div>

            <div class="card p-3 mb-3">
                <h4 class="mb-4">Pronósticos enviados hoy</h4>
                <h1>
                    <strong>
                        {{$todayForecasts}}
                    </strong>
                </h1>
                @include('common.user-grid', ['users' => $todayForecasters])
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6">
            <div class="card p-3 mb-3">
                <h4 class="mb-4">Top 5 fechas</h4>
                @include('common.ranking', ['ranking' => new \Prode\Domain\Ranking($topGameSets)])
            </div>
        </div>
        <div class="col-md-6">
            <div class="card p-3 mb-3">
                <h4 class="mb-4">Top 5 partidos</h4>
                @include('common.ranking', ['ranking' => new \Prode\Domain\Ranking($topGames)])
            </div>
        </div>
    </div>
@endsection

@push('script')
    <script src="//cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
    <script>
        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });
    </script>
@endpush
