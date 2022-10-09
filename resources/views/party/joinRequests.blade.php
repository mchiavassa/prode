@if($joinRequests->isNotEmpty())
    <div class="card p-3 mb-3">
        <table class="table">
            <tbody>
                @foreach ($joinRequests as $joinRequest)
                    <tr>
                        <td>
                            <img src="{{ $joinRequest->user->picture_url }}" class="rounded" height="30px">
                            <strong>{{ $joinRequest->user->name }}</strong> ({{$joinRequest->user->points}} pts)
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
@else
    <div class="text-center font-italic">
        {{__('party.applications.empty')}}
    </div>
@endif
