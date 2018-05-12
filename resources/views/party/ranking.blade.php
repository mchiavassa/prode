<table class="table">
    <tbody>
    @foreach($ranking as $position => $user)
        <tr class="{{$user->email == Auth::user()->email ? 'font-weight-bold' : ''}}">
            <td>
                {{ $position }}
            </td>
            <td>
                <img src="{{ $user->picture_url }}" class="rounded" height="30px" alt="{{ $user->name }}">
                {{ $user->name }}
                @if($user->pivot->is_admin)
                    <span class="badge badge-pill badge-success">Admin</span>
                @elseif($party->users->where('id', Auth::user()->id)->first()->pivot->is_admin)
                    <form action="{{route('party.user.makeAdmin', ['partyId' => $user->pivot->party_id, 'userId' => $user->id])}}" method="POST" class="d-inline">
                        @csrf
                        <input type="submit" class="btn" style="font-size: 0.7em" value="Hacer Admin" />
                    </form>
                @endif
            </td>
            <td>
                {{ $user->points }}
            </td>
        </tr>
    @endforeach
    </tbody>
</table>
