@extends('layouts.app')

@section('content')
        <div class="async-list" data-source-url="{{route('party.list')}}">
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="loading text-center mt-1" style="display: none">
                    <img class="small" src="{{asset('img/loading.svg')}}" />
                </div>
            </div>
        </div>
    </div>
@endsection
