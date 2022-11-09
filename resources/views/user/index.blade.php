@extends('layouts.app')

@section('content')
    <h2 class="mb-4">{{__('users.title')}} ({{$users->count()}})</h2>
    <div class="table-responsive">
        <table class="table table-hover bg-light">
            <thead>
            <tr>
                <th scope="col">{{__('users.name')}}</th>
                <th scope="col">{{__('users.logins')}}</th>
                <th scope="col">{{__('users.email')}}</th>
                <th scope="col">{{__('users.parties')}}</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            @foreach ($users as $user)
                <tr>
                    <td>
                        <img src="{{ $user->picture_url }}" class="rounded" height="30px" onerror="this.onerror=null; this.src='{{asset('img/user-avatar.png')}}'">
                        {{ $user->name }} <span class="caret"></span>
                    </td>
                    <td>
                        @foreach($user->logins as $login)
                            <i class="fab fa-{{$login->provider}}"></i>
                        @endforeach
                    </td>
                    <td>
                        {{$user->email}}
                        @if($user->emailIsVerified())
                            <i class="bi-check-circle-fill text-success"></i>
                        @endif
                    </td>
                    <td>
                        @foreach($user->parties->pluck('name') as $group)
                            <div>{{$group}}</div>
                        @endforeach
                    </td>
                    <td>
                        <a class="btn btn-sm btn-warning" href="{{ route('user.forecasts', ['id' => $user->id]) }}">
                            <i class="bi-magic"></i>
                        </a>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
@endsection
