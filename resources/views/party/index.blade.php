@extends('layouts.app')

@section('content')
    <a href="{{route('party.create.show')}}" class="btn btn-primary">{{__('party.create.title')}}</a>

    <div class="async-list mt-4" data-source-url="{{route('party.list.mine')}}">
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="loading text-center mt-1" style="display: none">
                <img class="small" src="{{asset('img/loading.svg')}}" />
            </div>
        </div>
    </div>

    <hr />

    <div class="async-list mt-4" data-source-url="{{route('party.list.others')}}">
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="loading text-center mt-1" style="display: none">
                <img class="small" src="{{asset('img/loading.svg')}}" />
            </div>
        </div>
    </div>
@endsection
