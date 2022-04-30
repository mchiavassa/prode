@extends('layouts.app')

@section('content')
    <div class="mb-4">
        <div class="feature-icon bg-dark bg-gradient">
            <i class="bi-people-fill"></i>
        </div>
        <span class="fs-2 fw-bold">{{$party->name}}</span>
    </div>

    <a href="{{route('home')}}" class="btn btn-light mb-3">{{__('common.buttons.back')}}</a>

    <div class="row">
        <div class="col-md-6 order-2 order-md-1">
            <div class="row">
                <div class="col-md-4">
                    <div class="card p-3 mb-3">
                        <h4 class="mb-4">{{__('party.average')}}</h4>
                        <h1>
                            <strong>
                                {{$party->users->count() == 0 ? 0 : number_format($party->users->sum('points') / $party->users->count(), 2)}}
                            </strong>
                        </h1>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card p-3 mb-3">
                        <h4 class="mb-4">{{__('party.points')}}</h4>
                        <h1>
                            <strong>
                                {{$party->users->sum('points')}}
                            </strong>
                        </h1>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card p-3 mb-3">
                        <h4 class="mb-4">{{__('party.players')}}</h4>
                        <h1>
                            <strong>
                                {{$party->users->count()}}
                            </strong>
                        </h1>
                    </div>
                </div>
            </div>
            @if($party->users->contains('id', Auth::user()->id) && $party->users->where('id', Auth::user()->id)->first()->pivot->is_admin)
            <div class="card p-3 mb-3">
                <div id="editor" class="mb-2">
                    {!! $party->description !!}
                </div>
                <button id="btnSaveDescription" class="btn btn-primary">{{__('common.buttons.save')}}</button>
            </div>
            @elseif ($party->description)
            <div class="card p-3 mb-3">
                {!! $party->description !!}
            </div>
            @endif

        </div>
        <div class="col-md-6 order-1 order-md-2">
            @if($party->users->contains('id', Auth::user()->id) && $party->users->where('id', Auth::user()->id)->first()->pivot->is_admin)
                <div class="async-list" data-source-url="{{route('party.joinRequest.list', ['id' => $party->id])}}">
                </div>
            @endif
            <div class="card p-3 mb-3">
                <h4 class="mb-4">{{__('party.ranking')}}</h4>

                <form class="mb-4">
                    <select id='rankings-select' class="form-select">
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
                <p class="text-muted">{{__('party.share')}}</p>
                <div class="d-flex">
                    <input id="link" value="{{route('party.details', ['id' => $party->id])}}" class="form-control me-2" readonly="readonly">
                    <button class="share btn btn-light" data-clipboard-target="#link">
                        <i class="bi bi-files"></i>
                    </button>
                </div>
            </div>
            <div class="card p-3 mb-3">
                <div class="row">
                    <div class="col-md-12">
                        <form onsubmit="return confirm('{{__('party.quit.user-confirmation')}}');" action="{{route('party.user.remove', ['partyId' => $party->id, 'userId' => Auth::user()->id])}}" method="POST">
                            @csrf
                            <input type="submit" class="btn btn-danger" style="width: 100%" value="{{__('party.quit.button')}}" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @if(Auth::user()->isAdmin() && !$party->users->contains('id', Auth::user()->id))
        @include('party.apply-button', ['party' => $party, 'joinRequest' => $joinRequest])
    @endif
@endsection

@if($party->users->contains('id', Auth::user()->id) && $party->users->where('id', Auth::user()->id)->first()->pivot->is_admin)
    @push('css')
        <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
    @endpush
@endif
@push('script')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js"></script>
    <script type="text/javascript">
        new ClipboardJS('.share');
        $(function () {
            $('#dates').on('change', function (e) {
                $('.tab-pane').hide();
                $('#' + $(this).val() + '.tab-pane').show();
            });
        });
    </script>
    @if($party->users->contains('id', Auth::user()->id) && $party->users->where('id', Auth::user()->id)->first()->pivot->is_admin)
        <script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>
        <script type="text/javascript">
            $(function () {
                var quill = new Quill('#editor', {
                    theme: 'snow',
                    placeholder: '{{__('party.description.placeholder')}}'
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
                                toastr.success("{{__('party.description.saved')}}");
                            } else {
                                toastr.error("{{__('party.description.error')}}");
                            }
                        },
                        error: function () {
                            toastr.error("{{__('party.description.error')}}");
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
                        $('#ranking-' + setId).fadeIn(1000);
                    },
                    error: function () {
                        toastr.error('{{__('common.messages.errors.fetch_data')}}');
                    }
                };

                const loading = $('#loading-rankings');
                loading.show();

                $.ajax(options).done(function () {
                    loading.fadeOut(500);
                });
            });

            $('#rankings-select').change();
        });
    </script>
@endpush
