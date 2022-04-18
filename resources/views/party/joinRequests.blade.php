@if($joinRequests->isNotEmpty())
    <div class="card p-3 mb-3">
        <h4 class="mb-4">{{__('party.applications.title')}}</h4>
        <table class="table">
            <tbody>
                @foreach ($joinRequests as $joinRequest)
                    <tr>
                        <td>
                            <img src="{{ $joinRequest->user->picture_url }}" class="rounded" height="30px">
                            {{ $joinRequest->user->name }}
                        </td>
                        <td class="">
                            <form class="float-end" action="{{route('party.joinRequest.reply', ['partyId' => $joinRequest->party->id, 'joinRequestId' =>  $joinRequest->id,'accept' => false])}}" method="POST">
                                @csrf
                                <input type="submit" class="btn btn-default" value="{{__('party.applications.reject')}}" />
                            </form>
                            <form class="float-end me-1" action="{{route('party.joinRequest.reply', ['partyId' => $joinRequest->party->id, 'joinRequestId' =>  $joinRequest->id, 'accept' => true])}}" method="POST">
                                @csrf
                                <input type="submit" class="btn btn-primary" value="{{__('party.applications.accept')}}" />
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endif
