@extends('layouts.error')

@section('content')
    <h4>Ups! :(</h4>
    <p>Eso fue un error inesperado. Estamos trabajando para solucionar el problema.</p>
    <a href="{{route('home')}}" class="btn btn-primary">Volver al home</a>
@endsection
