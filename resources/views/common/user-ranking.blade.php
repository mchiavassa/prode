<table class="table">
    <tbody>
    @foreach($ranking as $rankingUser)
        <tr class="{{$rankingUser->item->email == Auth::user()->email ? 'font-weight-bold' : ''}}">
            <td>
                {{ $rankingUser->position }}
            </td>
            <td>
                <img src="{{ $rankingUser->item->picture_url }}" class="rounded" height="30px" alt="{{ $rankingUser->item->name }}">
                {{ $rankingUser->item->name }}
            </td>
            <td>
                {{ $rankingUser->item->points }}
            </td>
        </tr>
    @endforeach
    </tbody>
</table>
