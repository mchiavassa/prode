@extends('layouts.app')

@section('content')
    <h2 class="mb-4">Eliminar cuenta</h2>

    <div class="card col-md-6 offset-md-3">
        <div class="card-body">
            <div class="alert alert-danger" role="alert">
                <h4 class="alert-heading">Atención!</h4>
                <div>Estás a punto de eliminar tu cuenta.</div>
                <div>Con ella se borrarán todos tus datos dentro de la aplicación.</div>
            </div>

            <form method="POST" action="{{ route('delete') }}">
                @csrf
                <input type="submit" class="btn btn-danger" value="Eliminar mi cuenta">
                <a href="{{route('home')}}" class="btn btn-default">Volver</a>
            </form>
        </div>
    </div>
@endsection
