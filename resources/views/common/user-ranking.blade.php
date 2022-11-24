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
            <td style="width: 80%">
                <img src="{{ $ranking[$i]->item->picture_url }}" class="rounded" height="30px" onerror="this.onerror=null; this.src='{{asset('img/user-avatar.png')}}'">
                {{ $ranking[$i]->item->name }}
            </td>
            <td>
                {{ \App\Utils\Numbers::format($ranking[$i]->item->points) }}
                @isset($unit)
                    {{$unit}}
                @endisset
            </td>
        </tr>
    @endfor
    </tbody>
</table>
