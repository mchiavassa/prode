<div class="row">
    <div class="col-md-6">
        <div class="card p-3 mb-3">
            <div class="col-md-12">
                <h4 class="mb-4">{{__('stats.top_matches')}}</h4>
            </div>
            @include('common.ranking', ['ranking' => $topGamesRanking])
        </div>
    </div>
    <div class="col-md-6">
        <div class="card p-3 mb-3">
            <div class="col-md-12">
                <h4 class="mb-4">{{__('stats.worst_matches')}}</h4>
            </div>
            @include('common.ranking', ['ranking' => $worstGamesRanking])
        </div>
    </div>
</div>
