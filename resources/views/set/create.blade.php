@extends('layouts.app')

@section('content')
    <h2 class="mb-4">Fechas</h2>

    <div class="card col-md-6 offset-md-3">
        <div class="card-body">
            <h4>Nueva Fecha</h4>
            <form method="POST" action="{{ route('set.create') }}">
                @csrf
                @if ($errors->any())
                    <div class="alert alert-danger">
                        Errores
                        <ul>
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                <div class="form-group">
                    {{ Form::text('name', '', ['class' => 'form-control mb-2', 'placeholder'=> 'Nombre']) }}
                </div>
                <input type="submit" class="btn btn-primary" value="Crear">
                <a href="{{route('set')}}" class="btn btn-dark">Volver</a>
            </form>
        </div>
    </div>
@endsection
