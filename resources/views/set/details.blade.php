@extends('layouts.app')

@section('content')
    @include('set.header', ['gameSet' => $gameSet])

    @if($gameSet->isDraft())
        <a href="{{route('game.create.show', ['id' => $gameSet->id])}}" class="btn btn-primary mb-3">{{__('set.actions.add')}}</a>
        @if($gameSet->games->isNotEmpty())
            <a href="{{route('set.enable', ['id' => $gameSet->id])}}" class="btn btn-success mb-3">{{__('set.actions.enable')}}</a>
        @endif
    @elseif ($gameSet->isEnabled() && $gameSet->games->where('computed', false)->isEmpty())
        <a href="{{route('set.finish', ['id' => $gameSet->id])}}" class="btn btn-primary mb-3">{{__('set.actions.finish')}}</a>
    @endif

    <div class="async-list" data-source-url="{{route('game.list.admin', ['id' => $gameSet->id])}}">
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="loading text-center mt-1" style="display: none">
                <img class="small" src="{{asset('img/loading.svg')}}" />
            </div>
        </div>
    </div>
@endsection
