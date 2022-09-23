@extends('layouts.app')

@section('content')
    <div class="row">
        <div class="col-md-4 offset-md-4">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4 offset-md-4">
                            <img src="{{asset('img/logo.png')}}" alt="Prode" class="img-fluid rounded mb-2">
                        </div>
                    </div>
                    <h5 class="mb-4 fw-bold text-center">{{__('common.welcome')}}</h5>
                    <form method="POST" action="{{ route('login.password') }}" id="login" class="needs-validation" novalidate>
                        @csrf
                        @if ($errors->any())
                            <div class="alert alert-danger">
                                @foreach ($errors->all() as $error)
                                    {{ $error }} <br>
                                @endforeach
                            </div>
                        @endif

                        <div class="form-group mb-2">
                            {{ Form::email('email', '', ['class' => 'form-control', 'placeholder' => __('account.create.email'), 'required']) }}
                        </div>
                        <div class="form-group mb-2">
                            {{ Form::password('password', ['class' => 'form-control', 'placeholder' => __('account.create.password'), 'required']) }}
                        </div>
                        <input type="submit" class="w-100 mb-2 btn btn-primary" value="{{__('account.login.login')}}">
                        <a href="{{route('account.create.show')}}" class="w-100 btn btn-light">{{__('account.create.show')}}</a>
                    </form>
                    <div class="text-center m-2">{{__('account.login.or')}}</div>
                    <a href="{{ route('login.external', ['provider' => \App\Services\Auth\SocialNetworkProvider::GOOGLE]) }}"
                       class="w-100 btn btn-google mb-1">
                        <i class="fab fa-google"></i>&nbsp;&nbsp;&nbsp;&nbsp;{{__('account.login.google')}}
                    </a>
                    <a href="{{ route('login.external', ['provider' => \App\Services\Auth\SocialNetworkProvider::FACEBOOK]) }}"
                       class="w-100 btn btn-facebook mb-1">
                        <i class="fab fa-facebook-f"></i>&nbsp;&nbsp;&nbsp;&nbsp;{{__('account.login.facebook')}}
                    </a>
                    <a href="{{ route('login.external', ['provider' => \App\Services\Auth\SocialNetworkProvider::GITHUB]) }}"
                       class="w-100 btn btn-github mb-1">
                        <i class="fab fa-github"></i>&nbsp;&nbsp;&nbsp;&nbsp;{{__('account.login.github')}}
                    </a>
                    <div class="form-text text-center">
                        <a href="{{route('login.recover_password')}}">{{__('account.login.forgot_password')}}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('script')
    <script type="text/javascript">
        // Example starter JavaScript for disabling form submissions if there are invalid fields
        (function () {
            'use strict'

            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.querySelectorAll('.needs-validation')

            // Loop over them and prevent submission
            Array.prototype.slice.call(forms)
                .forEach(function (form) {
                    form.addEventListener('submit', function (event) {
                        if (!form.checkValidity()) {
                            event.preventDefault()
                            event.stopPropagation()
                        }

                        form.classList.add('was-validated')
                    }, false)
                })
        })();
    </script>
@endpush
