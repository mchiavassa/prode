@extends('layouts.app')

@section('content')
    <div class="row mb-4">
        <div class="offset-md-5 col-md-2 text-center">
            <img src="{{asset('img/competition-logo.png')}}" class="img-fluid" />
        </div>
    </div>

    <div class="row">
        <div class="col-md-4 order-2 order-lg-1">
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
        <div class="col-md-4 order-3 order-lg-2">
            <div class="async-list" data-source-url="{{route('stats.mine')}}">
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="loading text-center mt-1" style="display: none">
                        <img class="small" src="{{asset('img/loading.svg')}}" />
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4 order-1 order-lg-3">
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

            <div class="card p-3 mb-3">
                <h4 class="mb-4">Fechas</h4>
                <div class="async-list" data-source-url="{{route('set.list')}}">
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
