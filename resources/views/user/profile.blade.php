@extends('layouts.app')

@section('content')
    <h2 class="mb-4">{{__('account.profile.title')}}</h2>

    <div class="card col-md-6 offset-md-3">
        <div class="card-body">
                <div style="text-align: right">
                    <h5 class="mb-4">
                        <img src="{{ Auth::user()->picture_url }}" class="rounded" height="30px">
                        {{ Auth::user()->email }}
                        @if(Auth::user()->emailIsVerified())
                            <i class="bi-check-circle-fill text-success"></i>
                        @else
                            <form method="POST" action="{{ route('email.verification.send') }}" class="d-inline">
                                @csrf
                                <input type="submit" class="btn btn-sm btn-primary" value="{{__('account.profile.verify_email')}}">
                            </form>
                        @endif
                        @foreach(Auth::user()->logins as $login)
                            <i class="fab fa-{{$login->provider}}"></i>
                        @endforeach
                    </h5>
                </div>
            <form method="POST" action="{{ route('profile.update') }}">
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
                <div class="form-group mb-4">
                    {{ Form::text('name', Auth::user()->name, ['class' => 'form-control', 'placeholder' => __('account.create.name'), 'required']) }}
                </div>

                <div class="form-group mb-4">
                    {{ Form::password('password', ['class' => 'form-control', 'placeholder' => __('account.create.password')]) }}
                    <span style="font-style: italic; font-size: .9em; color: grey">{{__('account.profile.password')}}</span>
                </div>
                <input type="submit" class="btn btn-primary" value="{{__('account.profile.save')}}">
                <a href="{{route('home')}}" class="btn btn-default">{{__('common.buttons.back')}}</a>
            </form>
        </div>
    </div>
@endsection
