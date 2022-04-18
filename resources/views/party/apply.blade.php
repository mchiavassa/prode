@extends('layouts.app')

@section('content')
    <div class="mb-4">
        <h2>{{$party->name}}</h2>
    </div>

    <a href="{{route('home')}}" class="btn btn-light mb-3">{{__('common.buttons.back')}}</a>

    <div class="row text-center mb-3">
        <div class="col-md-4">
            <div class="card p-3 mb-3 bg-light">
                <h4>{{__('party.players')}}</h4>
                <h3>
                    <strong>
                        {{$party->users->count()}}
                    </strong>
                </h3>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card p-3 mb-3 bg-light">
                <h4>{{__('party.average')}}</h4>
                <h3>
                    <strong>
                        {{$party->users->isNotEmpty() ? number_format($party->users->sum('points') / $party->users->count(), 2) : 0}}
                    </strong>
                </h3>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card p-3 mb-3 bg-light">
                <h4>{{__('party.points')}}</h4>
                <h3>
                    <strong>
                        {{$party->users->sum('points')}}
                    </strong>
                </h3>
            </div>
        </div>
    </div>
    <div class="row text-center">
        <div class="col-md-12">
            @if($joinRequest)
                <div class="alert alert-success" role="alert">
                    {{__('party.apply.sent')}}
                </div>
            @else
                <div class="mb-2">{{__('party.apply.join')}}<strong>{{$party->name}}</strong>?</div>
                <div>
                    <form action="{{route('party.requestJoin', ['id' => $party->id])}}" method="POST">
                        @csrf
                        <input type="submit" class="btn btn-primary" value="{{__('party.apply.send')}}" />
                    </form>
                </div>
            @endif
        </div>
    </div>
@endsection
