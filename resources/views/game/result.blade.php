@extends('layouts.app')

@section('content')
    <h2 class="mb-4">{{ $game->set->name }}</h2>

    <div class="card">
        <div class="card-body">
            <form method="POST" action="{{ route('game.result', ['id' =>  $game->id]) }}">
                @csrf
                @if ($errors->any())
                    <div class="alert alert-danger">
                        Errores
                        <ul>
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                <div class="row">
                    <div class="col-md-4">
                        <img class="float-left mr-2" src="{{ asset('img/flags/'.$game->home.'.svg') }}" height="50" />
                        <h3 class="card-text float-left">{{ config('domain.teams.'.$game->home) }}</h3>
                    </div>
                    <div class="col-md-1">
                        <label>Goles</label>
                        {{ Form::text('home_score', $game->home_score, ['class' => 'form-control mb-2']) }}
                    </div>
                    <div class="col-md-1 border-right">
                        <label>Penales</label>
                        {{ Form::text('home_tie_break_score', $game->home_tie_break_score, ['class' => 'form-control mb-2']) }}
                    </div>
                    <div class="col-md-1">
                        <label>Goles</label>
                        {{ Form::text('away_score', $game->away_score, ['class' => 'form-control mb-2']) }}
                    </div>
                    <div class="col-md-1">
                        <label>Penales</label>
                        {{ Form::text('away_tie_break_score',  $game->away_tie_break_score, ['class' => 'form-control mb-2']) }}
                    </div>
                    <div class="col-md-4">
                        <img class="float-right ml-2" src="{{ asset('img/flags/'.$game->away.'.svg') }}" height="50" />
                        <h3 class="card-text float-right">{{ config('domain.teams.'.$game->away) }}</h3>
                    </div>
                </div>
                <div class="row text-center mt-2">
                    <div class="col-md-12">
                        <input type="submit" class="btn btn-primary" value="Guardar">
                        <a href="{{ route('set.details', ['id' => $game->set->id]) }}" class="btn btn-default">Volver</a>
                    </div>
                </div>
            </form>
        </div>
    </div>
@endsection
