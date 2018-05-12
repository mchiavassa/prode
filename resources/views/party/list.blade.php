@if($parties->isEmpty())
    <div class="text-center">
        <div>
            <a href="{{route('party.create.show')}}" class="btn btn-primary">Creá tu grupo</a>
        </div>
        <div>o</div>
        <div>
            <a href="{{route('party')}}" class="btn btn-default">Unite a uno existente</a>
        </div>
    </div>
@else
    @foreach ($parties as $party)
            <div class="card party mb-2">
                <a href="{{ route('party.details', ['id' => $party->id]) }}">
                    <img class="float-left rounded p-2" height="50px" src="{{asset('img/logo.png')}}" alt="{{ $party->name }}">
                    <div class="card-body float-left">
                        <h5 class="card-title">{{ $party->name }}</h5>
                        <span class="badge badge-pill badge-dark">{{$party->users->count()}} jugadores</span>
                    </div>
                    <div class="card-body float-right text-right">
                        <span class="text-muted">Promedio</span>
                        <h3 class="m-0">{{number_format($party->users->sum('points') / $party->users->count(), 2)}}</h3>
                    </div>
                </a>
            </div>
    @endforeach
@endif
