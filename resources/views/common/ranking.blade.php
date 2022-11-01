<table class="table">
    <tbody>
    @foreach($ranking as $rankingItem)
        <tr>
            <td style="width: 5%">
                {{ $rankingItem->position }}
            </td>
            <td style="width: 80%">
                {{ $rankingItem->item->name }}
            </td>
            <td>
                {{ \App\Utils\Numbers::format($rankingItem->item->points) }}
            </td>
        </tr>
    @endforeach
    </tbody>
</table>
