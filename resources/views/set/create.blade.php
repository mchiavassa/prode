@extends('layouts.app')

@section('content')
    <div class="card col-md-6 offset-md-3">
        <div class="card-body">
            <h4>{{__('set.create.title')}}</h4>
            <form method="POST" action="{{ route('set.create') }}">
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
                    {{ Form::text('name', '', ['class' => 'form-control mb-2', 'placeholder'=> __('set.create.name')]) }}
                </div>
                <input type="submit" class="btn btn-primary" value="{{__('set.create.submit')}}">
                <a href="{{route('set.admin')}}" class="btn btn-light">{{__('common.buttons.back')}}</a>
            </form>
        </div>
    </div>
@endsection
