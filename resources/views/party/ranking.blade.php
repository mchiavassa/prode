<table class="table">
    <tbody>
    @for ($i = 0; $i < $ranking->count(); $i++)
        <tr class="{{$ranking[$i]->item->email == Auth::user()->email ? 'fw-bold' : ''}}"
            style="{{$i == 0 || $ranking[$i-1]->position != $ranking[$i]->position ? 'border-top-style: solid;' : 'border-top-style: hidden;'}}">
            <td style="width: 5%">
                @if ($i == 0 || $ranking[$i-1]->position != $ranking[$i]->position)
                    {{ $ranking[$i]->position }}
                @endif
            </td>
            <td class="forms-show-hover" style="width: 80%">
                <img src="{{ $ranking[$i]->item->picture_url }}" class="rounded" height="30px" onerror="this.onerror=null; this.src='{{asset('img/user-avatar.png')}}'">
                {{ $ranking[$i]->item->name }}
                @if($ranking[$i]->item->pivot->is_admin)
                    <span class="badge rounded-pill bg-success">Admin</span>
                @elseif($party->users->contains('id', Auth::user()->id) && $party->users->where('id', Auth::user()->id)->first()->pivot->is_admin)
                    <form action="{{route('party.user.makeAdmin', ['partyId' => $ranking[$i]->item->pivot->party_id, 'userId' => $ranking[$i]->item->id])}}" method="POST" class="d-inline">
                        @csrf
                        <input type="submit" class="btn btn-sm btn-light" style="font-size: 0.7em; padding: 0.1rem 0.5rem" value="{{__('party.make-admin')}}" />
                    </form>
                @endif
                @if($party->users->contains('id', Auth::user()->id) && $party->users->where('id', Auth::user()->id)->first()->pivot->is_admin && $ranking[$i]->item->email !== Auth::user()->email)
                    <form onsubmit="return confirm('{{__('party.remove-user-confirmation')}}');" action="{{route('party.user.remove', ['partyId' => $ranking[$i]->item->pivot->party_id, 'userId' => $ranking[$i]->item->id])}}" method="POST" class="d-inline">
                        @csrf
                        <input type="submit" class="btn btn-sm btn-danger" style="font-size: 0.7em; padding: 0.1rem 0.5rem" value="{{__('party.remove-user')}}" />
                    </form>
                @endif
            </td>
            <td>
                {{ \App\Utils\Numbers::format($ranking[$i]->item->points) }}
            </td>
        </tr>
    @endfor
    </tbody>
</table>
