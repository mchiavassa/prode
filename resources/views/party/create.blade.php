@extends('layouts.app')

@section('content')
    <h2 class="mb-4">Grupos</h2>

    <div class="card col-md-6 offset-md-3">
        <div class="card-body">
            <h4>Nuevo Grupo</h4>
            <form method="POST" action="{{ route('party.create') }}">
                @csrf
                @if ($errors->any())
                    <div class="alert alert-danger">
                            @foreach ($errors->all() as $error)
                                <div>{{ $error }}</div>
                            @endforeach
                    </div>
                @endif

                <div class="form-group">
                    {{ Form::text('name', '', ['class' => 'form-control mb-2', 'placeholder'=> 'Nombre']) }}
                </div>
                <input type="submit" class="btn btn-primary" value="Crear">
                <a href="{{route('home')}}" class="btn btn-default">Volver</a>
            </form>
        </div>
    </div>
@endsection
