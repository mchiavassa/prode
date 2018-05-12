<table class="table">
    <tbody>
    @foreach($ranking as $position => $item)
        <tr>
            <td>
                {{ $position }}
            </td>
            <td>
                {{ $item->name }}
            </td>
            <td>
                {{ $item->points }}
            </td>
        </tr>
    @endforeach
    </tbody>
</table>
