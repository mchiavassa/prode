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
                @endif
            </td>
            <td>
                {{ $user->points }}
            </td>
        </tr>
    @endforeach
    </tbody>
</table>
