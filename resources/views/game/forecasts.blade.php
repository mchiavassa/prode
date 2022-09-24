@extends('layouts.app')

@section('content')
    <div class="mb-4">
        <div class="feature-icon bg-light bg-gradient">
            <i class="bi-magic audit"></i>
        </div>
        <span class="fs-2 fw-bold">{{__('game.forecasts.title')}}</span>
    </div>

    <a href="{{route('home')}}" class="btn btn-light mb-3">{{__('common.buttons.back')}}</a>

    <div class="row">
        <div class="col-md-4">
            <div class="card p-3 mb-3 text-center">
                <div class="text-muted small">{{$game->group}}</div>
                <div class="text-muted small game-datetime" data-timestamp="{{\App\Utils\DateTimes::toTimestamp($game->date_and_hour)}}"></div>
                @if ($game->isLive())
                    <a href="{{$game->info_url}}" target="_blank">
                        <span class="badge rounded-pill live-badge bg-danger">{{__('domain.game.status.live')}}</span>
                    </a>
                @elseif ($game->computed)
                    <div>
                        <span class="badge rounded-pill bg-dark">{{__('domain.game.status.finished')}}</span>
                    </div>
                @endif
                <div class="row card-body">
                    <div class="col-5">
                        <img class="mb-2 img-fluid flag" src="{{ asset('img/flags/'.$game->home.'.svg') }}" />
                        <p class="card-text">{{ __('domain.teams.'.$game->home) }}</p>
                    </div>
                    <div class="offset-2 col-5">
                        <img class="mb-2 img-fluid flag" src="{{ asset('img/flags/'.$game->away.'.svg') }}" />
                        <p class="card-text">{{ __('domain.teams.'.$game->away) }}</p>
                    </div>
                </div>
                @if(!is_null($game->home_score) && !is_null($game->away_score))
                    <div class="row">
                        <div class="col-6">
                            <h1 class="card-text">{{ $game->home_score }} {{!is_null($game->home_tie_break_score) ? '('.$game->home_tie_break_score.')' : ''}}</h1>
                        </div>
                        <div class="col-6">
                            <h1 class="card-text">{{ $game->away_score }} {{!is_null($game->away_tie_break_score) ? '('.$game->away_tie_break_score.')' : ''}}</h1>
                        </div>
                    </div>
                @endif
            </div>
        </div>
        <div class="col-md-8">
            <div class="card p-3 mb-3">
                <p class="text-muted">{{__('game.forecasts.party_selector')}}</p>
                <form class="mb-4">
                    <select id='forecasts-select' class="form-select">
                        <option selected="selected" value="">{{__('game.forecasts.party_selector_placeholder')}}</option>
                        @foreach($parties as $party)
                            <option value="{{$party['id']}}" data-forecasts-url="{{$party['forecasts_url']}}">
                                {{$party['name']}}
                            </option>
                        @endforeach
                    </select>
                </form>

                <div class="tab-content" id="forecasts">
                    <div class="row">
                        <div class="col-md-12">
                            <div id="loading-forecasts" class="text-center mt-1" style="display: none">
                                <img class="small" src="{{asset('img/loading.svg')}}" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('script')
    <script type="text/javascript">
        let dateTime = $('.game-datetime');
        let timestamp = parseInt(dateTime.attr('data-timestamp'));
        let localTimeZone = moment.tz(moment.tz.guess()).zoneAbbr();
        let localDateTime = moment(timestamp).format('{{__('common.formats.datetime.forecast_box')}}') + ' (' + ((/\d/g).test(localTimeZone) ? 'UTC' + localTimeZone : localTimeZone) + ')';
        dateTime.append(localDateTime);
    </script>
    <script type="text/javascript">
        $(function () {
            $('#forecasts-select').on('change', function (e) {
                const partyId = $(this).val();

                if (!partyId) {
                    $('.tab-pane').hide();
                    return;
                }

                $('.tab-pane').hide();

                const ranking = $('#forecast-' + $(this).val());
                if (ranking.length !== 0) {
                    ranking.show();

                    return;
                }
                let url = $(this).find(':selected').data('forecasts-url');
                let options = {
                    url: url,
                    success: function (response) {
                        $('#forecasts').append('<div class="tab-pane" id="forecast-' + partyId + '">' + response + '</div>');
                        $('#forecast-' + partyId).fadeIn(1000);
                    },
                    error: function () {
                        toastr.error('{{__('common.messages.errors.fetch_data')}}');
                    }
                };

                const loading = $('#loading-forecasts');
                loading.show();

                $.ajax(options).done(function () {
                    loading.fadeOut(500);
                });
            });
        });
    </script>
@endpush
