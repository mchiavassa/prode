<table class="table">
    <tbody>
    @foreach($ranking as $rankingUser)
        <tr class="{{$rankingUser->item->email == Auth::user()->email ? 'fw-bold' : ''}}">
            <td style="width: 5%">
                {{ $rankingUser->position }}
            </td>
            <td class="forms-show-hover" style="width: 80%">
                <img src="{{ $rankingUser->item->picture_url }}" class="rounded" height="30px" onerror="this.onerror=null; this.src='{{asset('img/user-avatar.png')}}'">
                {{ $rankingUser->item->name }}
                @if($rankingUser->item->pivot->is_admin)
                    <span class="badge rounded-pill bg-success">Admin</span>
                @elseif($party->users->where('id', Auth::user()->id)->first()->pivot->is_admin)
                    <form action="{{route('party.user.makeAdmin', ['partyId' => $rankingUser->item->pivot->party_id, 'userId' => $rankingUser->item->id])}}" method="POST" class="d-inline">
                        @csrf
                        <input type="submit" class="btn btn-sm btn-light" style="font-size: 0.7em; padding: 0.1rem 0.5rem" value="{{__('party.make-admin')}}" />
                    </form>
                @endif
                @if($party->users->contains('id', Auth::user()->id) && $party->users->where('id', Auth::user()->id)->first()->pivot->is_admin && $rankingUser->item->email !== Auth::user()->email)
                    <form onsubmit="return confirm('{{__('party.remove-user-confirmation')}}');" action="{{route('party.user.remove', ['partyId' => $rankingUser->item->pivot->party_id, 'userId' => $rankingUser->item->id])}}" method="POST" class="d-inline">
                        @csrf
                        <input type="submit" class="btn btn-sm btn-danger" style="font-size: 0.7em; padding: 0.1rem 0.5rem" value="{{__('party.remove-user')}}" />
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
