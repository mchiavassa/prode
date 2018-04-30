@extends('layouts.app')

@section('content')
    <h2 class="mb-4">Fechas</h2>

    <a href="{{route('set.create.show')}}" class="btn btn-primary">Nueva Fecha</a>

    <div class="async-list mt-4" data-source-url="{{route('set.list')}}">
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="loading text-center mt-1" style="display: none">
                <img class="small" src="{{asset('img/loading.svg')}}" />
            </div>
        </div>
    </div>
@endsection
