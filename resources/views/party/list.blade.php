@if($parties->isEmpty())
    <div class="text-center font-italic">
        Actualmente no formás parte de ningún grupo.
    </div>
@else
    @foreach ($parties as $party)
            <div class="card party mb-2">
                <a href="{{ route('party.details', ['id' => $party->id]) }}">
                    <img class="float-left rounded p-2" height="100px" src="{{asset('img/logo.png')}}" alt="{{ $party->name }}">
                    <div class="card-body float-left">
                        <h5 class="card-title">{{ $party->name }}</h5>
                        <span class="badge badge-pill badge-dark">
                        {{$party->users->count()}} jugadores
                    </span>
                    </div>
                </a>
            </div>
    @endforeach
@endif
