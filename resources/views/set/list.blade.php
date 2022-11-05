@if($gameSetsEnabled->isEmpty())
    <div class="text-center font-italic">
        {{__('party.list.empty')}}
    </div>
@else
    @foreach ($gameSetsEnabled->sortBy('created_at') as $gameSet)
        @include('set.list-item', [
            'gameSet' => $gameSet,
            'link' => route('forecast.set', ['id' => $gameSet->id])
        ])
    @endforeach
@endif
