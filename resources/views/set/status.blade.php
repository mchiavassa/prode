@switch($slot)
    @case(\App\Models\GameSet::STATUS_DRAFT)
        <span class="badge rounded-pill bg-warning text-dark">{{ucfirst(__('domain.set.status.'.$slot))}}</span>
        @break
    @case(\App\Models\GameSet::STATUS_ENABLED)
        <span class="badge rounded-pill bg-success">{{ucfirst(__('domain.set.status.'.$slot))}}</span>
        @break
    @case(\App\Models\GameSet::STATUS_FINISHED)
        <span class="badge rounded-pill bg-light text-dark">{{ucfirst(__('domain.set.status.'.$slot))}}</span>
        @break
@endswitch
