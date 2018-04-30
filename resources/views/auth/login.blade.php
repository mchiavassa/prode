@extends('layouts.app')

@section('content')
    <div class="row">
        <div class="col-md-12 text-center">
            <a href="{{ route('login.external', ['provider' => \Prode\Domain\SocialNetworkProvider::FACEBOOK]) }}"
               class="btn btn-primary">
                <i class="fa fa-facebook"></i> Login con Facebook
            </a>
            </div>
    </div>
@endsection
