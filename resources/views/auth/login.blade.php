@extends('layouts.app')

@section('content')
    <div class="row">
        <div class="col-md-4 offset-md-4">
            <div class="card text-center">
                <div class="card-body">
                    <img src="{{asset('img/logo.png')}}" alt="Prode" class="img-fluid rounded mb-4">
                    <h4 class="mb-4">Bienvenido a Prode</h4>
                    <a href="{{ route('login.external', ['provider' => \Prode\Domain\SocialNetworkProvider::FACEBOOK]) }}"
                       class="btn btn-primary">
                        <i class="fa fa-facebook"></i> Ingresar con Facebook
                    </a>
                </div>
            </div>
        </div>
    </div>
@endsection
