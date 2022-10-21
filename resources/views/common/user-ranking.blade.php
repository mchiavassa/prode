<table class="table">
    <tbody>
    @foreach($ranking as $rankingUser)
        <tr class="{{$rankingUser->item->email == Auth::user()->email ? 'font-weight-bold' : ''}}">
            <td>
                {{ $rankingUser->position }}
            </td>
            <td>
                <img src="{{ $rankingUser->item->picture_url }}" class="rounded" height="30px" onerror="this.onerror=null; this.src='{{asset('img/user-avatar.png')}}'">
                {{ $rankingUser->item->name }}
            </td>
            <td>
                {{ $rankingUser->item->points }}
            </td>
        </tr>
    @endforeach
    </tbody>
</table>
