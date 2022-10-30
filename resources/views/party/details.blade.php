@extends('layouts.app')

@php
$isAdmin = $party->users->contains('id', Auth::user()->id) && $party->users->where('id', Auth::user()->id)->first()->pivot->is_admin
@endphp

@section('content')
    <div class="mb-4">
        <div class="feature-icon bg-dark bg-gradient">
            <i class="bi-people-fill"></i>
        </div>
        <span class="fs-2 fw-bold">{{$party->name}}</span>
    </div>
    <div class="row">
        <div class="col-md-12">
            <ul class="nav nav-pills justify-content-end mb-3" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="pills-stats-tab" data-bs-toggle="pill" data-bs-target="#pills-stats" type="button" role="tab" aria-controls="pills-stats" aria-selected="true">
                        {{__('party.stats')}}
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-rules-tab" data-bs-toggle="pill" data-bs-target="#pills-rules" type="button" role="tab" aria-controls="pills-rules" aria-selected="false">
                        {{__('menu.rules')}}
                    </button>
                </li>
                @if($isAdmin)
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-applications-tab" data-bs-toggle="pill" data-bs-target="#pills-applications" type="button" role="tab" aria-controls="pills-applications" aria-selected="false">
                        {{__('party.applications.title')}}
                        <span id="joinRequestsCount" class="badge bg-danger"></span>
                    </button>

                </li>
                @endif
            </ul>
            <div class="tab-content" id="pills-tabContent">
                {{-- Statistics --}}
                <div class="tab-pane fade show active" id="pills-stats" role="tabpanel" aria-labelledby="pills-stats-tab">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="card p-3 mb-3">
                                        <h4 class="mb-2">{{__('party.players')}}</h4>
                                        <h2>
                                            <strong>
                                                {{$party->users->count()}}
                                            </strong>
                                        </h2>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="card p-3 mb-3">
                                        <h4 class="mb-2">{{__('party.points')}}</h4>
                                        <h2>
                                            <strong>
                                                {{$party->users->sum('points')}}
                                            </strong>
                                        </h2>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="card p-3 mb-3">
                                        <h4 class="mb-2">
                                            {{__('party.average')}}
                                            <i class="fas fa-question-circle text-muted" style="font-size: 0.6em" data-toggle="tooltip" data-placement="bottom" title="{{__('party.average_details')}}"></i>
                                        </h4>

                                        <h2>
                                            <strong>
                                                {{$party->users->count() == 0 ? 0 : number_format($party->users->sum('points') / $party->users->count(), 2)}}
                                            </strong>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="card p-3 mb-3">
                                <div class="row">
                                    <div class="col-md-6">
                                        <h4 class="mb-4">{{__('party.ranking-points')}}</h4>
                                    </div>
                                    <div class="col-md-6">
                                        <form class="mb-2">
                                            <select id='rankings-select' class="form-select form-select-sm">
                                                @foreach($sets as $set)
                                                    <option value="{{$set->id}}">{{$set->name}}</option>
                                                @endforeach
                                            </select>
                                        </form>
                                    </div>
                                </div>

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
                        </div>
                        <div class="col-md-6">
                            <div class="card p-3 mb-3">
                                <h4 class="mb-4">
                                    {{__('party.ranking-average')}}
                                    <i class="fas fa-question-circle text-muted" style="font-size: 0.6em" data-toggle="tooltip" data-placement="bottom" title="{{__('party.ranking-average-details')}}"></i>
                                </h4>
                                <div  class="async-list" data-source-url="{{route('party.ranking-averages', ['id' => $party->id])}}">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card p-3 mb-3">
                                <p class="text-muted">{{__('party.share')}}</p>
                                <div class="d-flex">
                                    <input id="link" value="{{route('party.details', ['id' => $party->id])}}" class="form-control me-2" readonly="readonly">
                                    <button class="share btn btn-light" data-clipboard-target="#link">
                                        <i class="bi bi-files"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {{-- Rules --}}
                <div class="tab-pane fade" id="pills-rules" role="tabpanel" aria-labelledby="pills-rules-tab">
                    <div class="row">
                        <div class="col-md-12">
                            @if($isAdmin)
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
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            @if($party->users->contains('id', Auth::user()->id))
                                <div class="card p-3 mb-3">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <form onsubmit="return confirm('{{__('party.quit.user-confirmation')}}');" action="{{route('party.user.remove', ['partyId' => $party->id, 'userId' => Auth::user()->id])}}" method="POST">
                                                @csrf
                                                <input type="submit" class="btn btn-light border-danger text-danger" style="width: 100%" value="{{__('party.quit.button')}}" />
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            @endif
                        </div>
                    </div>
                </div>

                @if($isAdmin)
                {{-- Applications --}}
                <div class="tab-pane fade" id="pills-applications" role="tabpanel" aria-labelledby="pills-applications-tab">
                    <div class="row">
                        <div class="col-md-12">
                            <div id="joinRequests" class="async-list" data-source-url="{{route('party.joinRequest.list', ['id' => $party->id])}}">
                            </div>
                        </div>
                    </div>
                </div>
                @endif
            </div>
        </div>
    </div>
    @if(Auth::user()->isAdmin() && !$party->users->contains('id', Auth::user()->id))
        @include('party.apply-button', ['party' => $party, 'joinRequest' => $joinRequest])
    @endif
@endsection

@if($isAdmin)
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
                $('#rankings .tab-pane').hide();
                $('#' + $(this).val() + '.tab-pane').show();
            });
            $(function () {
                $('[data-toggle="tooltip"]').tooltip();
            });
        });
    </script>
    @if($isAdmin)
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
        <script type="text/javascript">
            $(document).ajaxStop(function () {
                let requests = $('#joinRequests table tbody').children().length;
                if (requests > 0) {
                    $('#joinRequestsCount').text(requests);
                }
            });
        </script>
    @endif
    <script type="text/javascript">
        $(function () {
            $('#rankings-select').on('change', function (e) {
                const setId = $(this).val();
                $('#rankings .tab-pane').hide();

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
