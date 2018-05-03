@if($gameSets->isEmpty())
    <div class="text-center font-italic">
        Aún no hay fechas cargadas
    </div>
@else
    @foreach ($gameSets->sortByDesc('created_at') as $gameSet)
        @include('set.list-item', ['gameSet' => $gameSet, 'link' =>  route('set.details', ['id' => $gameSet->id])])
    @endforeach
@endif
