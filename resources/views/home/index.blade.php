@extends('layouts.app')

@section('content')
    <div class="mb-4">
        <h2>Mundial Rusia 2018</h2>
    </div>

    <div class="row">
        <div class="col-md-4">
            <div class="card p-3 mb-3">
                <h4 class="mb-4">Puntos</h4>
                <h1>
                    <strong>
                        {{Auth::user()->points}}
                    </strong>
                </h1>
            </div>

            <div class="card p-3 mb-3">
                <h4 class="mb-4">Mis grupos</h4>
                <div class="async-list" data-source-url="{{route('party.list.mine')}}">
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="loading text-center mt-1" style="display: none">
                            <img class="small" src="{{asset('img/loading.svg')}}" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="next-game">
                <div class="async-list" data-source-url="{{route('forecast.next')}}">
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="loading text-center mt-1" style="display: none">
                            <img class="small" src="{{asset('img/loading.svg')}}" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
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
        </div>
    </div>
@endsection
