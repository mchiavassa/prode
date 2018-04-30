<h2 class="mb-4">Mis grupos</h2>
@if($parties->isEmpty())
    <div class="text-center font-italic">
        Actualmente no formás parte de ningún grupo.
    </div>
@else
    <div class="card-columns">
    @foreach ($parties as $party)
        <div class="card p-3">
            <a href="{{ route('party.details', ['id' => $party->id]) }}">
                <img class="card-img-top" src="{{asset('img/logo.png')}}" alt="{{ $party->name }}">
                <div class="card-body">
                    <h5 class="card-title">{{ $party->name }}</h5>
                </div>
            </a>
        </div>
    @endforeach
    </div>
@endif
