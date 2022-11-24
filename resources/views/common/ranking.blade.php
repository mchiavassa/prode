<table class="table">
    <tbody>
    @for ($i = 0; $i < $ranking->count(); $i++)
        <tr style="{{$i == 0 || $ranking[$i-1]->position != $ranking[$i]->position ? 'border-top-style: solid;' : 'border-top-style: hidden;'}}">
            <td style="width: 5%">
                @if ($i == 0 || $ranking[$i-1]->position != $ranking[$i]->position)
                    {{ $ranking[$i]->position }}
                @endif
            </td>
            <td style="width: 80%">
                {{ $ranking[$i]->item->name }}
            </td>
            <td>
                {{ \App\Utils\Numbers::format($ranking[$i]->item->points) }}
            </td>
        </tr>
    @endfor
    </tbody>
</table>
