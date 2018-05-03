<table class="table">
    <tbody>
    @for ($i = 0; $i < $users->sortBy('points')->count(); $i++)
        <tr class="{{$users[$i]->email == Auth::user()->email ? 'font-weight-bold' : ''}}">
            <td>
                {{ $i + 1 }}
            </td>
            <td>
                <img src="{{ $users[$i]->picture_url }}" class="rounded" height="30px" alt="{{ $users[$i]->name }}">
                {{ $users[$i]->name }}
            </td>
            <td>
                {{$users[$i]->points}}
            </td>
        </tr>
    @endfor
    </tbody>
</table>
