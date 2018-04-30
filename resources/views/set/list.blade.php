@if($gameSets->isEmpty())
    <div class="text-center font-italic">
        Aún no hay fechas cargadas para pronosticar
    </div>
@else
    <div class="card-columns">
        @foreach ($gameSets->sortBy('created_at') as $gameSet)
            <div class="card p-4">
                <a href="#">
                    <img class="card-img-top" src="{{asset('img/logo.png')}}" alt="{{ $gameSet->name }}">
                    <div class="card-body">
                        <h5 class="card-title">{{ $gameSet->name }}</h5>
                    </div>
                </a>
            </div>
        @endforeach
    </div>
@endif
