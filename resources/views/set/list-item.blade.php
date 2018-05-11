<div class="card party mb-2">
    <a href="{{$link}}">
        <img class="float-left rounded p-2 align-middle" height="50px" src="{{asset('img/logo.png')}}" alt="{{ $gameSet->name }}">
        <div class="card-body float-left">
            <h5 class="card-title">{{ $gameSet->name }}</h5>
            <p class="card-text">
                        <span class="badge badge-pill badge-dark">
                            {{$gameSet->games->count()}} partidos
                        </span>
                @component('set.status') {{ $gameSet->status }} @endcomponent
            </p>
        </div>
    </a>
</div>
