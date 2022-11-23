<div class="row">
    <div class="col-md-12">
        <div class="card p-3 mb-3">
            <div class="col-md-12">
                <h4 class="mb-4">{{__('stats.top_users')}}</h4>
            </div>
            @include('common.user-ranking', ['ranking' => $usersRanking])
        </div>
    </div>
</div>
