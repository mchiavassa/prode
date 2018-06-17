<table class="table">
    <tbody>
    @foreach($ranking as $rankingItem)
        <tr>
            <td>
                {{ $rankingItem->position }}
            </td>
            <td>
                {{ $rankingItem->item->name }}
            </td>
            <td>
                {{ $rankingItem->item->points }}
            </td>
        </tr>
    @endforeach
    </tbody>
</table>
