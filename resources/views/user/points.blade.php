@extends('layouts.app')

@section('content')
    <h2 class="mb-4">{{__('users.points.mismatches')}}</h2>
    @if (!$usersWithErrors->isEmpty())
        <div class="row">
            <div class="col-md-12 mb-2">
                <form method="POST" action="{{route('user.points.adjust')}}" class="d-inline">
                    @csrf
                    <input type="submit" class="btn btn-sm btn-success" value="{{__('users.points.adjust')}}">
                </form>
            </div>
        </div>
    @endif
    <div class="table-responsive">
        <table class="table table-hover">
            <thead>
            <tr>
                <th scope="col">{{__('users.name')}}</th>
                <th scope="col">{{__('users.email')}}</th>
                <th scope="col">{{__('users.points.current')}}</th>
                <th scope="col">{{__('users.points.real')}}</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            @if ($usersWithErrors->isEmpty())
                <tr class="table-success text-center fst-italic">
                    <td colspan="4">{{__('users.points.no_mismatches')}}</td>
                </tr>
            @endif
            @foreach ($usersWithErrors as $userWithError)
                <tr class="table-danger">
                    <td>
                        <img src="{{ $userWithError->user->picture_url }}" class="rounded" height="30px"
                             onerror="this.onerror=null; this.src='{{asset('img/user-avatar.png')}}'">
                        {{ $userWithError->user->name }} <span class="caret"></span>
                    </td>
                    <td>{{$userWithError->user->email}}</td>
                    <td>{{$userWithError->currentPoints}}</td>
                    <td>{{$userWithError->realPoints}}</td>
                    <td>
                        <a class="btn btn-sm btn-danger" href="{{ route('user.forecasts', ['id' => $userWithError->user->id]) }}">
                            <i class="bi-magic"></i>
                        </a>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
    <hr/>

    <h2 class="mb-4">{{__('users.points.ok')}}</h2>
    <div class="table-responsive">
        <table class="table table-hover">
            <thead>
            <tr>
                <th scope="col">{{__('users.name')}}</th>
                <th scope="col">{{__('users.email')}}</th>
                <th scope="col">{{__('stats.points')}}</th>
            </tr>
            </thead>
            <tbody>
            @if ($usersOk->isEmpty())
                <tr class="table-danger text-center fst-italic">
                    <td colspan="3">{{__('users.points.no_ok')}}</td>
                </tr>
            @endif
            @foreach ($usersOk as $userWithError)
                <tr class="table-success">
                    <td>
                        <img src="{{ $userWithError->picture_url }}" class="rounded" height="30px"
                             onerror="this.onerror=null; this.src='{{asset('img/user-avatar.png')}}'">
                        {{ $userWithError->name }} <span class="caret"></span>
                    </td>
                    <td>{{$userWithError->email}}</td>
                    <td>{{$userWithError->points}}</td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
@endsection
