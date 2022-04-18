@extends('layouts.app')

@section('content')
    <h2 class="mb-4">{{ $game->set->name }}</h2>

    <div class="card">
        <div class="row text-center">
            <div class="col-12">
                <div class="text-muted">{{$game->group}} - {{\App\Utils\DateTimes::display($game->date_and_hour)}}</div>
            </div>
        </div>
        <div class="card-body">
            <form method="POST" action="{{ route('game.result', ['id' =>  $game->id]) }}">
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

                <div class="row">
                    <div class="col-md-4">
                        <img class="float-start me-2 flag" src="{{ asset('img/flags/'.$game->home.'.svg') }}" height="50" />
                        <h3 class="card-text float-start">{{ __('domain.teams.'.$game->home) }}</h3>
                    </div>
                    <div class="{{$game->tie_break_required ? 'col-md-1' : 'col-md-1 offset-lg-1 border-right'}}">
                        <label>{{__('game.result.score')}}</label>
                        {{ Form::number('home_score', $game->home_score, ['class' => 'form-control mb-2', 'autocomplete' => 'off']) }}
                    </div>
                    @if($game->tie_break_required)
                        <div class="col-md-1 border-right">
                            <label>{{__('game.result.tiebreak')}}</label>
                            {{ Form::number('home_tie_break_score', $game->home_tie_break_score, ['class' => 'form-control mb-2', 'autocomplete' => 'off']) }}
                        </div>
                    @endif
                    <div class="col-md-1">
                        <label>{{__('game.result.score')}}</label>
                        {{ Form::number('away_score', $game->away_score, ['class' => 'form-control mb-2', 'autocomplete' => 'off']) }}
                    </div>
                    @if($game->tie_break_required)
                        <div class="col-md-1">
                            <label>{{__('game.result.tiebreak')}}</label>
                            {{ Form::number('away_tie_break_score',  $game->away_tie_break_score, ['class' => 'form-control mb-2', 'autocomplete' => 'off']) }}
                       </div>
                    @endif
                    <div class="col-md-4">
                        <img class="float-end ms-2 flag" src="{{ asset('img/flags/'.$game->away.'.svg') }}" height="50" />
                        <h3 class="card-text float-end">{{ __('domain.teams.'.$game->away) }}</h3>
                    </div>
                </div>
                <div class="row text-center mt-2">
                    <div class="col-md-12">
                        <input type="submit" class="btn btn-primary" value="{{__('common.buttons.save')}}">
                        <a href="{{ route('set.details', ['id' => $game->set->id]) }}" class="btn btn-light">{{__('common.buttons.back')}}</a>
                    </div>
                </div>
            </form>
        </div>
    </div>
@endsection
