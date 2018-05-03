<div class="mb-4">
    <h2>{{$gameSet->name}}</h2>
    <div>
        <span class="badge badge-pill badge-dark">
            {{$gameSet->games->count()}} partidos
        </span>
        @component('set.status') {{ $gameSet->status }} @endcomponent
    </div>
</div>

