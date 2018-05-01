@switch($slot)
    @case('draft')
        <span class="badge badge-pill badge-warning">{{ucfirst(__('domain.set.status.'.$slot))}}</span>
        @break
    @case('enabled')
        <span class="badge badge-pill badge-success">{{ucfirst(__('domain.set.status.'.$slot))}}</span>
        @break
    @case('computed')
        <span class="badge badge-pill badge-primary">{{ucfirst(__('domain.set.status.'.$slot))}}</span>
        @break
@endswitch
