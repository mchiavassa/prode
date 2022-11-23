@if($forecasts->isEmpty())
    <div class="text-center">
        {{__('party.forecasts.empty')}}
    </div>
@else
    <table class="table">
        <thead>
            <tr>
                <th></th>
                <th></th>
                <th style="text-align: right">
                    <a href="data:text/plain;base64,{{base64_encode($forecasts_text)}}"
                       download="forecasts.txt"
                       class="btn btn-sm btn-dark"><i class="fa fa-download"></i></a>
                </th>
            </tr>
        </thead>
        <tbody>
        @foreach($forecasts as $forecast)
            <tr>
                <td>
                    <img src="{{Arr::get($forecast, 'user.picture_url')}}" class="rounded" height="30px" onerror="this.onerror=null; this.src='{{asset('img/user-avatar.png')}}'">
                    {{Arr::get($forecast, 'user.name')}}
                </td>
                <td>
                    {{Arr::get($forecast, 'home_score')}} - {{Arr::get($forecast, 'away_score')}}
                </td>
                <td>
                    {{Arr::get($forecast, 'assertions')}}
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
@endif
