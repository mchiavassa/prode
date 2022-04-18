<table class="table">
    <tbody>
    @foreach($ranking as $rankingUser)
        <tr class="{{$rankingUser->item->email == Auth::user()->email ? 'font-weight-bold' : ''}}">
            <td>
                {{ $rankingUser->position }}
            </td>
            <td>
                <img src="{{ $rankingUser->item->picture_url }}" class="rounded" height="30px">
                {{ $rankingUser->item->name }}
                @if($rankingUser->item->pivot->is_admin)
                    <span class="badge rounded-pill bg-success">Admin</span>
                @elseif($party->users->where('id', Auth::user()->id)->first()->pivot->is_admin)
                    <form action="{{route('party.user.makeAdmin', ['partyId' => $rankingUser->item->pivot->party_id, 'userId' => $rankingUser->item->id])}}" method="POST" class="d-inline">
                        @csrf
                        <input type="submit" class="btn" style="font-size: 0.7em" value="Hacer Admin" />
                    </form>
                @endif
            </td>
            <td>
                {{ $rankingUser->item->points }}
            </td>
        </tr>
    @endforeach
    </tbody>
</table>
