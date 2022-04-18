@extends('layouts.app')

@section('content')
    <h2 class="mb-4">{{ $gameSet->name }}</h2>

    <div class="card col-md-6 offset-md-3">
        <div class="card-body">
            <h4>{{__('game.create.title')}}</h4>
            <form method="POST" action="{{ route('game.create', ['id' =>  $gameSet->id]) }}">
                @csrf
                @if ($errors->any())
                    <div class="alert alert-danger">
                        {{__('common.messages.errors.title')}}
                        <ul>
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                <div class="form-group">
                    <label for="home">{{__('game.create.home')}}</label>
                    {{ Form::select('home', \App\Services\TeamService::list(), old('home'), ['class' => 'form-select mb-2']) }}
                </div>
                <div class="form-group">
                    <label for="away">{{__('game.create.away')}}</label>
                    {{ Form::select('away', \App\Services\TeamService::list(), old('away'), ['class' => 'form-select']) }}
                </div>
                <div class="form-group">
                    <label for="away">{{__('game.create.datetime')}} ({{config('app.timezone')}})</label>
                    {{ Form::text('date_and_hour', '', ['class' => 'form-control']) }}
                    <small class="form-text text-muted">Formato: 2018-04-30 20:30:00</small>
                </div>
                <div class="form-group">
                    <label for="away">{{__('game.create.group')}}</label>
                    {{ Form::text('group', '', ['class' => 'form-control']) }}
                </div>
                <div class="form-group">
                    <label for="infoUrl">{{__('game.create.info_url')}}</label>
                    {{ Form::text('info_url', '', ['class' => 'form-control']) }}
                </div>
                <div class="form-group">
                    <label for="away">{{__('game.create.tiebreak')}}</label>
                    {{ Form::select('tie_break_required', [0 => __('game.create.tiebreak_no'), 1 => __('game.create.tiebreak_yes')], old('tie_break_required'), ['class' => 'form-select mb-2']) }}
                </div>
                <input type="submit" class="btn btn-primary" value="{{__('game.create.submit')}}">
                <a href="{{ route('set.details', ['id' => $gameSet->id]) }}" class="btn">{{__('common.buttons.back')}}</a>
            </form>
        </div>
    </div>
@endsection
