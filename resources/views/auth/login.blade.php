@extends('layouts.app')

@section('content')
    <div class="row">
        <div class="col-md-4 offset-md-4">
            <div class="card text-center">
                <div class="card-body">
                    <img src="{{asset('img/logo.png')}}" alt="Prode" class="img-fluid rounded mb-4">
                    <h4 class="mb-4">Bienvenido a Prode</h4>
                    <a href="{{ route('login.external', ['provider' => \Prode\Domain\SocialNetworkProvider::FACEBOOK]) }}"
                       class="btn btn-facebook m-1">
                        <i class="fab fa-facebook-f"></i>&nbsp;&nbsp;&nbsp;&nbsp;Ingresar con Facebook
                    </a>
                    <a href="{{ route('login.external', ['provider' => \Prode\Domain\SocialNetworkProvider::GOOGLE]) }}"
                       class="btn btn-google m-1">
                        <i class="fab fa-google"></i>&nbsp;&nbsp;&nbsp;&nbsp;Ingresar con Google
                    </a>
                </div>
            </div>
        </div>
    </div>
@endsection
