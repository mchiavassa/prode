<div class="col">
    <div class="card party card-cover h-100 mb-4 overflow-hidden text-white bg-dark rounded-5 shadow-lg">
        <a href="{{$link}}">
            <div class="d-flex flex-column p-5 pb-3 text-white text-shadow-1">
                <h2 class="mb-4 display-6 lh-1 fw-bold">{{ $gameSet->name }}</h2>
                <ul class="d-lg-flex list-unstyled mt-auto">
                    <li class="me-auto">
                        <div class="feature-icon bg-gradient">
                            <i class="bi-card-checklist"></i>
                        </div>
                    </li>
                    <li class="d-flex align-items-center me-2 mt-2 mb-2">
                        @component('set.status') {{ $gameSet->status }} @endcomponent
                    </li>
                    <li class="d-flex align-items-center">
                        <div class="text-muted m-1">{{__('set.list.matches')}}</div>
                        <h3 class="m-0">{{$gameSet->games->count()}}</h3>
                    </li>
                </ul>
            </div>
        </a>
    </div>
</div>
