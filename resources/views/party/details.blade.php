@extends('layouts.app')

@section('content')
    <h2 class="mb-4">{{$party->name}}</h2>

    <div class="card-columns">
        <div class="card p-3">
            <h4 class="mb-4">Puntos</h4>

            <h1>
                <strong>
                    {{$party->users->where('user_id', Auth::user()->id)->first()->points}}
                </strong>
            </h1>
        </div>
        <div class="card p-3">
            <h4 class="mb-4">Fechas</h4>

            <div class="async-list" data-source-url="{{route('set.list', ['enabled' => true])}}">
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="loading text-center mt-1" style="display: none">
                        <img class="small" src="{{asset('img/loading.svg')}}" />
                    </div>
                </div>
            </div>
        </div>
        <div class="card p-3">
            <h4 class="mb-4">Posiciones</h4>

            @include('party.ranking', ['partyUsers' => $party->users])
        </div>
    </div>
@endsection
