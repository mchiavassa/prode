@extends('layouts.app')

@section('content')
    <div class="mb-4">
        <h2>{{$party->name}}</h2>
    </div>

    <a href="{{route('home')}}" class="btn btn-dark mb-3">Volver</a>

    <div class="row">
        <div class="col-md-6">
            <div class="card p-3 mb-3">
                <h4 class="mb-4">Jugadores</h4>
                <h1>
                    <strong>
                        {{$party->users->count()}}
                    </strong>
                </h1>
            </div>
            <div class="card p-3 mb-3">
                <h4 class="mb-4">Total puntos</h4>
                <h1>
                    <strong>
                        {{$party->users->sum('points')}}
                    </strong>
                </h1>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card p-3">
                <h4 class="mb-4">Posiciones</h4>
                @include('party.ranking', ['users' => $party->users])
            </div>
        </div>
    </div>
@endsection
