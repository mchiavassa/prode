@extends('layouts.app')

@section('content')
    @include('set.header', ['gameSet' => $gameSet])

    @if($gameSet->isDraft())
        <a href="{{route('game.create.show', ['id' => $gameSet->id])}}" class="btn btn-primary">Agregar Partido</a>
        @if($gameSet->games->isNotEmpty())
            <a href="{{route('set.enable', ['id' => $gameSet->id])}}" class="btn btn-success">Habilitar</a>
        @endif
    @endif

    <a href="{{route('set')}}" class="btn btn-dark mb-3">Volver</a>

    <div class="async-list" data-source-url="{{route('game.list.admin', ['id' => $gameSet->id])}}">
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="loading text-center mt-1" style="display: none">
                <img class="small" src="{{asset('img/loading.svg')}}" />
            </div>
        </div>
    </div>
@endsection
