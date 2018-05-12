@if($joinRequests->isNotEmpty())
    <div class="card p-3 mb-3">
        <h4 class="mb-4">Solicitudes</h4>
        <table class="table">
            <tbody>
                @foreach ($joinRequests as $joinRequest)
                    <tr>
                        <td>
                            <img src="{{ $joinRequest->user->picture_url }}" class="rounded" height="30px" alt="{{ $joinRequest->user->name }}">
                            {{ $joinRequest->user->name }}
                        </td>
                        <td class="">
                            <form class="float-right" action="{{route('party.joinRequest.reply', ['partyId' => $joinRequest->party->id, 'joinRequestId' =>  $joinRequest->id,'accept' => false])}}" method="POST">
                                @csrf
                                <input type="submit" class="btn btn-default" value="Rechazar" />
                            </form>
                            <form class="float-right mr-1" action="{{route('party.joinRequest.reply', ['partyId' => $joinRequest->party->id, 'joinRequestId' =>  $joinRequest->id, 'accept' => true])}}" method="POST">
                                @csrf
                                <input type="submit" class="btn btn-primary" value="Aceptar" />
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endif
