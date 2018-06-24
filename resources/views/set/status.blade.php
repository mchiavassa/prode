@switch($slot)
    @case(\Prode\Domain\Model\GameSet::STATUS_DRAFT)
        <span class="badge badge-pill badge-warning">{{ucfirst(__('domain.set.status.'.$slot))}}</span>
        @break
    @case(\Prode\Domain\Model\GameSet::STATUS_ENABLED)
        <span class="badge badge-pill badge-success">{{ucfirst(__('domain.set.status.'.$slot))}}</span>
        @break
    @case(\Prode\Domain\Model\GameSet::STATUS_FINISHED)
        <span class="badge badge-pill badge-light">{{ucfirst(__('domain.set.status.'.$slot))}}</span>
        @break
@endswitch
