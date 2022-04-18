@extends('layouts.app')

@section('content')
    <div class="row">
        <div class="col-md-4 offset-md-4">
            <div class="card text-center">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-8 offset-2">
                            <img src="{{asset('img/logo.png')}}" alt="Prode" class="img-fluid rounded mb-4">
                        </div>
                    </div>
                    <h3 class="mb-2 fw-bold">{{__('common.welcome')}}</h3>
                    <a href="{{ route('login.external', ['provider' => \App\Services\Auth\SocialNetworkProvider::FACEBOOK]) }}"
                       class="btn btn-facebook m-1">
                        <i class="fab fa-facebook-f"></i>&nbsp;&nbsp;&nbsp;&nbsp;{{__('account.login.facebook')}}
                    </a>
                    <a href="{{ route('login.external', ['provider' => \App\Services\Auth\SocialNetworkProvider::GOOGLE]) }}"
                       class="btn btn-google m-1">
                        <i class="fab fa-google"></i>&nbsp;&nbsp;&nbsp;&nbsp;{{__('account.login.google')}}
                    </a>
                    <a href="{{ route('login.external', ['provider' => \App\Services\Auth\SocialNetworkProvider::GITHUB]) }}"
                       class="btn btn-github m-1">
                        <i class="fab fa-github"></i>&nbsp;&nbsp;&nbsp;&nbsp;{{__('account.login.github')}}
                    </a>
                </div>
            </div>
        </div>
    </div>
@endsection
