@extends('layouts.app')

@section('content')
    <h2 class="mb-4">{{ $gameSet->name }}</h2>

    <div class="card col-md-6 offset-3">
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
                    <label for="away">Visitante</label>
                    {{ Form::select('away', \Prode\Domain\Team::list(), old('away'), ['class' => 'form-control']) }}
                </div>
                <input type="submit" class="btn btn-primary" value="Crear">
                <a href="{{ route('set.details', ['id' => $gameSet->id]) }}" class="btn btn-default">Volver</a>
            </form>
        </div>
    </div>
@endsection
