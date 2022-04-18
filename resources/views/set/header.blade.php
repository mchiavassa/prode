<div class="mb-4">
    <div class="feature-icon bg-dark bg-gradient">
        <i class="bi-card-checklist"></i>
    </div>
    <span class="fs-2 fw-bold">{{$gameSet->name}}</span>
    <div class="mt-2">
        @component('set.status') {{ $gameSet->status }} @endcomponent
        <span class="badge rounded-pill bg-dark">
            {{$gameSet->games->count()}} {{__('set.matches')}}
        </span>
    </div>
</div>


