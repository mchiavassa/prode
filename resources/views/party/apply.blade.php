@extends('layouts.app')

@section('content')
    <div class="mb-4">
        <h2>{{$party->name}}</h2>
    </div>

    <a href="{{route('home')}}" class="btn btn-dark mb-3">Volver</a>

    <div class="row text-center">
        <div class="col-md-6">
            <h4>Jugadores</h4>
            <h3>
                <strong>
                    {{$party->users->count()}}
                </strong>
            </h3>
        </div>
        <div class="col-md-6">
            <h4>Total puntos</h4>
            <h3>
                <strong>
                    {{$party->users->sum('points')}}
                </strong>
            </h3>
        </div>
    </div>
    <div class="row text-center">
        <div class="col-md-12">
            @if($joinRequest)
                <div class="text-muted">
                    Tu solicitud para ingresar al grupo fue enviada.
                </div>
            @else
                <div class="mb-2">¿Querés formar parte de <strong>{{$party->name}}</strong>?</div>
                <div>
                    <form action="{{route('party.requestJoin', ['id' => $party->id])}}" method="POST">
                        @csrf
                        <input type="submit" class="btn btn-primary" value="Enviar solicitud" />
                    </form>
                </div>
            @endif
        </div>
    </div>
@endsection
