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
                    <form method="POST" action="{{ route('account.create') }}" id="create" class="needs-validation" novalidate>
                        @csrf
                        @if ($errors->any())
                            <div class="alert alert-danger">
                            @foreach ($errors->all() as $error)
                                {{ $error }} <br>
                            @endforeach
                            </div>
                        @endif

                        <div class="form-group mb-2">
                            {{ Form::text('name', '', ['class' => 'form-control', 'placeholder' => __('account.create.name'), 'required']) }}
                        </div>
                        <div class="form-group mb-2">
                            {{ Form::email('email', '', ['class' => 'form-control', 'placeholder' => __('account.create.email'), 'required']) }}
                        </div>
                        <div class="form-group mb-2">
                            {{ Form::password('password', ['class' => 'form-control', 'placeholder' => __('account.create.password'), 'required']) }}
                        </div>
                        <input type="submit" class="w-100 mb-2 btn btn-primary" value="{{__('account.create.submit')}}">
                        <a href="{{route('login')}}" class="w-100 btn btn-light">{{__('account.login.login')}}</a>
                    </form>
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
