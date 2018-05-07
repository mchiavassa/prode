<table class="table">
    <tbody>
    @foreach($ranking as $position => $user)
        <tr>
            <td>
                {{ $position }}
            </td>
            <td>
                {{ $user->name }}
            </td>
            <td>
                {{$user->points}}
            </td>
        </tr>
    @endforeach
    </tbody>
</table>
