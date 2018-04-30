<table class="table">
    <tbody>
    @for ($i = 0; $i < $partyUsers->sortBy('points')->count(); $i++)
        <tr class="{{$partyUsers[$i]->user->email == Auth::user()->email ? 'font-weight-bold' : ''}}">
            <td>
                {{ $i + 1 }}
            </td>
            <td>
                <img src="{{ $partyUsers[$i]->user->picture_url }}" class="rounded" height="30px" alt="{{ $partyUsers[$i]->user->name }}">
                {{ $partyUsers[$i]->user->name }}
            </td>
            <td>
                {{$partyUsers[$i]->points}}
            </td>
        </tr>
    @endfor
    </tbody>
</table>
