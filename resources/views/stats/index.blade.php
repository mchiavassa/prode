@extends('layouts.app')

@section('content')
    <div class="mb-4">
        <h2>{{__('stats.title')}}</h2>
    </div>

    <div class="row">
        <div class="col-md-6">
            <div class="card p-3 mb-3">
                <h4 class="mb-4">{{__('stats.top_users')}}</h4>
                @include('common.user-ranking', ['ranking' => $usersRanking])
            </div>
        </div>
        <div class="col-md-6">
            <div class="card p-3 mb-3">
                <h4 class="mb-4">{{__('stats.top_parties')}} <small>({{__('stats.top_parties_detail')}})</small></h4>
                @include('common.ranking', ['ranking' => $partiesRanking])
            </div>
        </div>
    </div>
@endsection
