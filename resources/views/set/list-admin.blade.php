@if($gameSets->isEmpty())
    <div class="text-center font-italic">
        {{__('party.list.empty')}}
    </div>
@else
    @foreach ($gameSets->sortByDesc('created_at') as $gameSet)
        @include('set.list-item', ['gameSet' => $gameSet, 'link' =>  route('set.details', ['id' => $gameSet->id])])
    @endforeach
@endif
