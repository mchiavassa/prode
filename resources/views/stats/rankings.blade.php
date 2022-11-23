@extends('layouts.app')

@section('content')
    <div class="mb-4">
        <h2>{{__('stats.rankings_title')}}</h2>
    </div>

    <div class="row">
        <div class="col-md-12">

            <ul class="nav nav-pills mb-3" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="pills-players-tab" data-bs-toggle="pill" data-bs-target="#pills-players" type="button" role="tab" aria-controls="pills-players" aria-selected="true">
                        <i class="bi-person-fill"></i> {{__('party.players')}}
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-assertions-tab" data-bs-toggle="pill" data-bs-target="#pills-assertions" type="button" role="tab" aria-controls="pills-assertions" aria-selected="false">
                        <i class="bi-magic"></i> {{__('users.forecasts.assertions')}}
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-groups-tab" data-bs-toggle="pill" data-bs-target="#pills-groups" type="button" role="tab" aria-controls="pills-groups" aria-selected="false">
                        <i class="bi-people-fill"></i> {{__('users.parties')}}
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-games-tab" data-bs-toggle="pill" data-bs-target="#pills-games" type="button" role="tab" aria-controls="pills-games" aria-selected="false">
                        <i class="bi-card-checklist"></i> {{__('set.list.matches')}}
                    </button>
                </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-players" role="tabpanel" aria-labelledby="pills-players-tab">
                    @include('stats.rankings-users', ['usersRanking' => $usersRanking])
                </div>
                <div class="tab-pane fade" id="pills-assertions" role="tabpanel" aria-labelledby="pills-top-assertions">
                    @include('stats.rankings-assertions', ['usersResultRanking' => $usersResultRanking, 'usersScoreRanking' => $usersScoreRanking, 'usersTeamScoreRanking' => $usersTeamScoreRanking, 'usersTieBreakRanking' => $usersTieBreakRanking, 'usersTieBreakScoreRanking' => $usersTieBreakScoreRanking])
                </div>
                <div class="tab-pane fade" id="pills-groups" role="tabpanel" aria-labelledby="pills-top-groups">
                    @include('stats.rankings-parties', ['partiesRanking' => $partiesRanking])
                </div>
                <div class="tab-pane fade" id="pills-games" role="tabpanel" aria-labelledby="pills-top-games">
                    @include('stats.rankings-games', ['topGamesRanking' => $topGamesRanking, 'worstGamesRanking', $worstGamesRanking])
                </div>
            </div>


        </div>
    </div>
@endsection
