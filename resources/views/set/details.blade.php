@extends('layouts.app')

@section('content')
    <div class="mb-4">
        <h2>{{$gameSet->name}}</h2>
        <div>
            <div class="text-muted">
                Fecha límite: <strong>{{ $gameSet->forecast_deadline->tz(-3)->format('d/m/Y H:i') }}</strong>
            </div>
            <span class="badge badge-pill badge-dark">
                {{$gameSet->games->count()}} partidos
            </span>
            @component('set.status') {{ $gameSet->status }} @endcomponent
        </div>
    </div>

    @if($gameSet->isDraft())
        <a href="{{route('game.create.show', ['id' => $gameSet->id])}}" class="btn btn-primary">Agregar Partido</a>
        @if($gameSet->games->isNotEmpty())
            <a href="{{route('set.enable', ['id' => $gameSet->id])}}" class="btn btn-success">Habilitar</a>
        @endif
    @endif

    @if($gameSet->isEnabled() && $gameSet->gamesAreCompleted())
        <a href="{{route('set.compute', ['id' => $gameSet->id])}}" class="btn btn-success">Computar pronósticos</a>
    @endif

    <a href="{{route('set')}}" class="btn ">Volver</a>

    <div class="async-list mt-4" data-source-url="{{route('game.list.admin', ['id' => $gameSet->id])}}">
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="loading text-center mt-1" style="display: none">
                <img class="small" src="{{asset('img/loading.svg')}}" />
            </div>
        </div>
    </div>
@endsection
