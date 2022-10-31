<table class="table">
    <tbody>
    @foreach($ranking as $rankingUser)
        <tr class="{{$rankingUser->item->email == Auth::user()->email ? 'fw-bold' : ''}}">
            <td style="width: 5%">
                {{ $rankingUser->position }}
            </td>
            <td style="width: 80%">
                <img src="{{ $rankingUser->item->picture_url }}" class="rounded" height="30px" onerror="this.onerror=null; this.src='{{asset('img/user-avatar.png')}}'">
                {{ $rankingUser->item->name }}
            </td>
            <td>
                {{ $rankingUser->item->points }}
                @isset($unit)
                    {{$unit}}
                @endisset
            </td>
        </tr>
    @endforeach
    </tbody>
</table>
