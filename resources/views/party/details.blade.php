@extends('layouts.app')

@section('content')
    <div class="mb-4">
        <h2>{{$party->name}}</h2>
    </div>

    <a href="{{route('home')}}" class="btn btn-dark mb-3">Volver</a>

    <div class="row">
        <div class="col-md-6 order-2 order-md-1">
            <div class="row">
                <div class="col-md-4">
                    <div class="card p-3 mb-3">
                        <h4 class="mb-4">Promedio</h4>
                        <h1>
                            <strong>
                                {{number_format($party->users->sum('points') / $party->users->count(), 2)}}
                            </strong>
                        </h1>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card p-3 mb-3">
                        <h4 class="mb-4">Puntos</h4>
                        <h1>
                            <strong>
                                {{$party->users->sum('points')}}
                            </strong>
                        </h1>
                    </div>
                </div>
                <div class="col-md-4">
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
            @if($party->users->where('id', Auth::user()->id)->first()->pivot->is_admin)
            <div class="card p-3 mb-3">
                <div id="editor" class="mb-2">
                    {!! $party->description !!}
                </div>
                <button id="btnSaveDescription" class="btn btn-primary">Guardar</button>
            </div>
            @elseif ($party->description)
            <div class="card p-3 mb-3">
                {!! $party->description !!}
            </div>
            @endif

        </div>
        <div class="col-md-6 order-1 order-md-2">
            @if($party->users->where('id', Auth::user()->id)->first()->pivot->is_admin)
                <div class="async-list" data-source-url="{{route('party.joinRequest.list', ['id' => $party->id])}}">
                </div>
            @endif
            <div class="card p-3 mb-3">
                <h4 class="mb-4">Posiciones</h4>

                <form class="mb-4">
                    <select id='rankings-select' class="form-control">
                        @foreach($sets as $set)
                            <option value="{{$set->id}}">{{$set->name}}</option>
                        @endforeach
                    </select>
                </form>

                <div class="tab-content" id="rankings">
                    <div class="row">
                        <div class="col-md-12">
                            <div id="loading-rankings" class="text-center mt-1" style="display: none">
                                <img class="small" src="{{asset('img/loading.svg')}}" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card p-3 mb-3">
                <p class="text-muted">
                    Invitá a tus amigos compartiendo el siguiente link.
                    Una vez enviada su solicitud cualquier Admin del grupo podrá aceptarla.
                </p>
                <input id="link" value="{{route('party.details', ['id' => $party->id])}}" class="form-control mb-1">
                <button class="share btn btn-light" data-clipboard-target="#link">
                    Copiar
                </button>
            </div>
        </div>
    </div>
@endsection

@if($party->users->where('id', Auth::user()->id)->first()->pivot->is_admin)
    @push('css')
        <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
    @endpush
@endif
@push('script')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js"></script>
    <script>
        new ClipboardJS('.share');
        $(function () {
            $('#dates').on('change', function (e) {
                $('.tab-pane').hide();
                $('#' + $(this).val() + '.tab-pane').show();
            });
        });
    </script>
    @if($party->users->where('id', Auth::user()->id)->first()->pivot->is_admin)
        <script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>
        <script>
            $(function () {
                var quill = new Quill('#editor', {
                    theme: 'snow',
                    placeholder: 'Acá podés escribir lo que quieras: reglas internas, mensajes, etc.'
                });

                $('#btnSaveDescription').click(function () {
                    let options = {
                        url: '{{route('party.description', ['id' => $party->id])}}',
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        method: 'PATCH',
                        dataType: 'json',
                        data: {description: $('.ql-editor').html()},
                        success: function (response) {
                            if (response.metadata.code === 200) {
                                toastr.success("Descripción guardada.");
                            } else {
                                toastr.error("Ocurrió un error al intentar guardar la descripción.");
                            }
                        },
                        error: function () {
                            toastr.error("Ocurrió un error al intentar guardar la descripción.");
                        }
                    };

                    $.ajax(options);
                });
            });
        </script>
    @endif
    <script type="text/javascript">
        $(function () {
            $('#rankings-select').on('change', function (e) {
                const setId = $(this).val();
                $('.tab-pane').hide();

                const ranking = $('#ranking-' + $(this).val());
                if (ranking.length !== 0) {
                    ranking.show();

                    return;
                }

                let options = {
                    url: '{{route('party.ranking', ['id' => $party->id])}}' + '?setId=' + setId,
                    success: function (response) {
                        $('#rankings').append('<div class="tab-pane" id="ranking-' + setId + '">' + response + '</div>');
                        $('#ranking-' + setId).show();
                    },
                    error: function () {
                        toastr.error("Ocurrió un error al intentar traer el ranking.");
                    }
                };

                const loading = $('#loading-rankings');
                loading.show();

                $.ajax(options).done(function () {
                    loading.hide();
                });
            });

            $('#rankings-select').change();
        });
    </script>
@endpush
