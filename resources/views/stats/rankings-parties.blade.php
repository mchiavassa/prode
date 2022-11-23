<div class="row">
    <div class="col-md-12">
        <div class="card p-3 mb-3">
            <div class="row">
                <div class="col-md-6">
                    <h4 class="mb-4">{{__('stats.top_parties')}}</h4>
                </div>
                <div class="col-md-6">
                    <div class="text-muted" style="text-align: right">{{__('stats.top_parties_detail')}}</div>
                </div>
            </div>

            @include('common.ranking', ['ranking' => $partiesRanking])
        </div>
    </div>
</div>
