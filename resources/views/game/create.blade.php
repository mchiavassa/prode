@extends('layouts.app')

@section('content')
    <h2 class="mb-4">{{ $gameSet->name }}</h2>

    <div class="card col-md-6 offset-md-3">
        <div class="card-body">
            <h4>Nuevo Partido</h4>
            <form method="POST" action="{{ route('game.create', ['id' =>  $gameSet->id]) }}">
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

                <div class="form-group">
                    <label for="home">Local</label>
                    {{ Form::select('home', \Prode\Domain\Team::list(), old('home'), ['class' => 'form-control mb-2']) }}
                </div>
                <div class="form-group">
                    <label for="away">Visitante</label>
                    {{ Form::select('away', \Prode\Domain\Team::list(), old('away'), ['class' => 'form-control']) }}
                </div>
                <div class="form-group">
                    <label for="away">Fecha y hora</label>
                    {{ Form::text('date_and_hour', '', ['class' => 'form-control']) }}
                    <small class="form-text text-muted">Formato: 2018-04-30 20:30:00</small>
                </div>
                <div class="form-group">
                    <label for="away">Grupo</label>
                    {{ Form::text('group', '', ['class' => 'form-control']) }}
                </div>
                <div class="form-group">
                    <label for="infoUrl">Info URL</label>
                    {{ Form::text('info_url', '', ['class' => 'form-control']) }}
                </div>
                <div class="form-group">
                    <label for="away">Incluye penales</label>
                    {{ Form::select('tie_break_required', [1 => 'Si', 0 => 'No'], old('tie_break_required'), ['class' => 'form-control mb-2']) }}
                </div>
                <input type="submit" class="btn btn-primary" value="Crear">
                <a href="{{ route('set.details', ['id' => $gameSet->id]) }}" class="btn">Volver</a>
            </form>
        </div>
    </div>
@endsection
