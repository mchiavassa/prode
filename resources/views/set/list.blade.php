@if($gameSets->isEmpty())
    <div class="text-center font-italic">
        Aún no hay fechas cargadas para pronosticar
    </div>
@else
    @foreach ($gameSets->sortByDesc('forecast_deadline') as $gameSet)
        <div class="card party mb-2">
            <a href="{{route('set.details', ['id' => $gameSet->id])}}">
                <img class="float-left rounded p-2" height="100px" src="{{asset('img/logo.png')}}" alt="{{ $gameSet->name }}">
                <div class="card-body float-left">
                    <h5 class="card-title">{{ $gameSet->name }}</h5>
                    <p class="card-text">
                        <small class="text-muted">
                            Fecha límite: <strong>{{ $gameSet->forecast_deadline->tz(-3)->format('d/m/Y H:i') }}</strong>
                        </small>
                        <span class="badge badge-pill badge-dark">
                            {{$gameSet->games->count()}} partidos
                        </span>
                        @if(Auth::user()->isAdmin())
                            <span class="badge badge-pill badge-light">
                                {{$gameSet->enabled ? 'habilitada' : 'deshabilitada'}}
                            </span>
                        @endif

                    </p>
                </div>
            </a>
        </div>
    @endforeach
@endif
