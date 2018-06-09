@extends('layouts.app')

@section('content')
    <h2 class="mb-4">Usuarios ({{$users->count()}})</h2>
    <table class="table table-hover">
        <thead>
        <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Logins</th>
            <th scope="col">Email</th>
            <th scope="col">Grupos</th>
        </tr>
        </thead>
        <tbody>
        @foreach ($users as $user)
            <tr>
                <td>
                    <img src="{{ $user->picture_url }}" class="rounded" height="30px" alt="{{ $user->name }}">
                    {{ $user->name }} <span class="caret"></span>
                </td>
                <td>
                    @foreach($user->logins as $login)
                        <i class="fab fa-{{$login->provider}}"></i>
                    @endforeach
                </td>
                <td>
                    {{$user->email}}
                </td>
                <td>
                    @foreach($user->parties->pluck('name') as $group)
                        <div>{{$group}}</div>
                    @endforeach
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
@endsection
