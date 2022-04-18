@if($parties->isEmpty())
    <div class="text-center">
        <div>
            <a href="{{route('party.create.show')}}" class="btn btn-primary">{{__('party.create.title')}}</a>
        </div>
        <div>o</div>
        <div>
            <a href="{{route('party')}}" class="btn btn-light">{{__('party.join')}}</a>
        </div>
    </div>
@else
    @foreach ($parties as $party)
            <div class="col">
                <div class="card party card-cover h-100 mb-4 overflow-hidden text-white bg-dark rounded-5 shadow-lg">
                    <a href="{{ route('party.details', ['id' => $party->id]) }}">
                        <div class="d-flex flex-column p-5 pb-3 text-white text-shadow-1">
                            <h2 class="mb-4 display-6 lh-1 fw-bold">{{ $party->name }}</h2>
                            <ul class="d-lg-flex list-unstyled mt-auto">
                                <li class="me-auto">
                                    <div class="feature-icon bg-gradient">
                                        <i class="bi-people-fill"></i>
                                    </div>
                                </li>
                                <li class="d-flex align-items-center">
                                    <div class="text-muted m-1">{{__('party.average')}}</div>
                                    <h3 class="m-0">{{$party->users->isNotEmpty() ? number_format($party->users->sum('points') / $party->users->count(), 2) : '0.00'}}</h3>
                                </li>
                            </ul>
                        </div>
                    </a>
                </div>
            </div>
    @endforeach
@endif
