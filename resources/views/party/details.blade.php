@extends('layouts.app')

@section('content')
    <div class="mb-4">
        <h2>{{$party->name}}</h2>
    </div>

    <a href="{{route('home')}}" class="btn btn-dark mb-3">Volver</a>

    <div class="row">
        <div class="col-md-6">
            <div class="card p-3 mb-3">
                <h4 class="mb-4">Promedo</h4>
                <h1>
                    <strong>
                        {{number_format($party->users->sum('points') / $party->users->count(), 2)}}
                    </strong>
                </h1>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="card p-3 mb-3">
                        <h4 class="mb-4">Puntos</h4>
                        <h1>
                            <strong>
                                {{$party->users->sum('points')}}
                            </strong>
                        </h1>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card p-3 mb-3">
                        <h4 class="mb-4">Jugadores</h4>
                        <h1>
                            <strong>
                                {{$party->users->count()}}
                            </strong>
                        </h1>
                    </div>
                </div>
            </div>
            <div class="card p-3 mb-3">
                <p class="text-muted">
                    Invitá a tus amigos compartiendo el link del grupo.
                    Una vez enviada su solicitud cualquier Admin del grupo podrán aceptarla.
                </p>
                <input id="link" value="{{route('party.details', ['id' => $party->id])}}" class="form-control mb-1">
                <button class="share btn btn-light" data-clipboard-target="#link">
                    Copiar
                </button>
            </div>
            @if($party->users->where('id', Auth::user()->id)->first()->pivot->is_admin)
                <div class="async-list" data-source-url="{{route('party.joinRequest.list', ['id' => $party->id])}}">
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="loading text-center mt-1" style="display: none">
                            <img class="small" src="{{asset('img/loading.svg')}}" />
                        </div>
                    </div>
                </div>
            @endif
        </div>
        <div class="col-md-6">
            <div class="card p-3">
                <h4 class="mb-4">Posiciones</h4>
                @include('party.ranking', ['ranking' => new \Prode\Domain\Ranking($party->users)])
            </div>
        </div>
    </div>
@endsection

@push('script')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js"></script>
    <script>
        new ClipboardJS('.share');
    </script>
@endpush
