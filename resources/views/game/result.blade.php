@extends('layouts.app')

@section('content')
    <h2 class="mb-4">{{ $game->set->name }}</h2>

    <div class="card col-md-8 offset-2">
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
                    <div class="col-md-6">
                        <div class="text-center">
                            <img class="mr-2" src="{{ asset('img/flags/'.$game->home.'.svg') }}" height="50" />
                            <h3 class="card-text">{{ config('domain.teams.'.$game->home) }}</h3>
                        </div>

                        <div class="form-group">
                            <label>Goles</label>
                            {{ Form::text('home_score', $game->home_score, ['class' => 'form-control mb-2']) }}
                            <label>Penales</label>
                            {{ Form::text('home_tie_break_score', $game->home_tie_break_score, ['class' => 'form-control mb-2']) }}
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="text-center">
                            <img class="mr-2" src="{{ asset('img/flags/'.$game->away.'.svg') }}" height="50" />
                            <h3 class="card-text">{{ config('domain.teams.'.$game->away) }}</h3>
                        </div>

                        <div class="form-group">
                            <label>Goles</label>
                            {{ Form::text('away_score', $game->away_score, ['class' => 'form-control mb-2']) }}
                            <label>Penales</label>
                            {{ Form::text('away_tie_break_score',  $game->away_tie_break_score, ['class' => 'form-control mb-2']) }}
                        </div>
                    </div>
                </div>
                <input type="submit" class="btn btn-primary" value="Guardar">
                <a href="{{ route('set.details', ['id' => $game->set->id]) }}" class="btn btn-default">Volver</a>
            </form>
        </div>
    </div>
@endsection
