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
                        {{$party->users->isNotEmpty() ? \App\Utils\Numbers::format($party->users->sum('points') / $party->users->count()) : 0}}
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
    @include('party.apply-button', ['party' => $party, 'joinRequest' => $joinRequest])
@endsection
