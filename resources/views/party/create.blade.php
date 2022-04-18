@extends('layouts.app')

@section('content')
    <div class="card col-md-6 offset-md-3">
        <div class="card-body">
            <h4>{{__('party.create.title')}}</h4>
            <form method="POST" action="{{ route('party.create') }}">
                @csrf
                @if ($errors->any())
                    <div class="alert alert-danger">
                        {{__('common.messages.errors.title')}}
                        @foreach ($errors->all() as $error)
                            <div>{{ $error }}</div>
                        @endforeach
                    </div>
                @endif

                <div class="form-group">
                    {{ Form::text('name', '', ['class' => 'form-control mb-2', 'placeholder'=> __('party.create.name')]) }}
                </div>
                <input type="submit" class="btn btn-primary" value="__('party.create.create')">
                <a href="{{route('home')}}" class="btn btn-default">{{__('common.buttons.back')}}</a>
            </form>
        </div>
    </div>
@endsection
