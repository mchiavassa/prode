@extends('layouts.app')

@section('content')
    <div class="mb-4">
        <h2>Estadísticas</h2>
    </div>

    <div class="row">
        <div class="col-md-6">
            <div class="card p-3 mb-3">
                <h4 class="mb-4">Top 3 usuarios</h4>
                @include('common.user-ranking', ['ranking' => $usersRanking])
            </div>
        </div>
        <div class="col-md-6">
            <div class="card p-3 mb-3">
                <h4 class="mb-4">Top 5 grupos <small>(con 2 o más jugadores)</small></h4>
                @include('common.ranking', ['ranking' => $partiesRanking])
            </div>
        </div>
    </div>
@endsection
