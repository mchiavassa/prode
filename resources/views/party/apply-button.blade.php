<div class="row text-center">
    <div class="col-md-12">
        @if($joinRequest)
            <div class="alert alert-success" role="alert">
                {{__('party.apply.sent')}}
            </div>
        @else
            <div class="mb-2">{{__('party.apply.join')}}<strong>{{$party->name}}</strong>?</div>
            <div>
                <form action="{{route('party.requestJoin', ['id' => $party->id])}}" method="POST">
                    @csrf
                    <input type="submit" class="btn btn-primary" value="{{__('party.apply.send')}}" />
                </form>
            </div>
        @endif
    </div>
</div>

