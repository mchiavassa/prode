<div class="row">
    <div class="col-md-12">
        <div class="card p-3 mb-3">
            <h4 class="mb-4">
                {{__('stats.best_assertions')}}
            </h4>
            <ul class="nav nav-pills mb-3" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="pills-top-results-tab" data-bs-toggle="pill" data-bs-target="#pills-top-results" type="button" role="tab" aria-controls="pills-top-results" aria-selected="true">
                        {{__('domain.forecast.assertion.'.\App\Models\ForecastAssertion::RESULT)}}
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-top-team-scores-tab" data-bs-toggle="pill" data-bs-target="#pills-top-team-scores" type="button" role="tab" aria-controls="pills-top-team-scores" aria-selected="false">
                        {{__('domain.forecast.assertion.'.\App\Models\ForecastAssertion::TEAM_SCORE)}}
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-top-scores-tab" data-bs-toggle="pill" data-bs-target="#pills-top-scores" type="button" role="tab" aria-controls="pills-top-scores" aria-selected="false">
                        {{__('domain.forecast.assertion.'.\App\Models\ForecastAssertion::SCORE)}}
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-top-tiebreak-tab" data-bs-toggle="pill" data-bs-target="#pills-top-tiebreak" type="button" role="tab" aria-controls="pills-top-tiebreak" aria-selected="false">
                        {{__('domain.forecast.assertion.'.\App\Models\ForecastAssertion::TIEBREAK_EXISTENCE)}}
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-top-tiebreak-score-tab" data-bs-toggle="pill" data-bs-target="#pills-top-tiebreak-score" type="button" role="tab" aria-controls="pills-top-tiebreak-score" aria-selected="false">
                        {{__('domain.forecast.assertion.'.\App\Models\ForecastAssertion::TIEBREAK_SCORE)}}
                    </button>
                </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-top-results" role="tabpanel" aria-labelledby="pills-top-results-tab">
                    @include('common.user-ranking', ['ranking' => $usersResultRanking])
                </div>
                <div class="tab-pane fade" id="pills-top-team-scores" role="tabpanel" aria-labelledby="pills-top-team-scores-tab">
                    @include('common.user-ranking', ['ranking' => $usersTeamScoreRanking])
                </div>
                <div class="tab-pane fade" id="pills-top-scores" role="tabpanel" aria-labelledby="pills-top-scores-tab">
                    @include('common.user-ranking', ['ranking' => $usersScoreRanking])
                </div>
                <div class="tab-pane fade" id="pills-top-tiebreak" role="tabpanel" aria-labelledby="pills-top-tiebreak-tab">
                    @include('common.user-ranking', ['ranking' => $usersTieBreakRanking])
                </div>
                <div class="tab-pane fade" id="pills-top-tiebreak-score" role="tabpanel" aria-labelledby="pills-top-tiebreak-score-tab">
                    @include('common.user-ranking', ['ranking' => $usersTieBreakScoreRanking])
                </div>
            </div>
        </div>
    </div>
</div>
