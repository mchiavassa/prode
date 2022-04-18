@extends('layouts.app')

@section('content')
    <h2 class="mb-4">{{__('account.delete.title')}}</h2>

    <div class="card col-md-6 offset-md-3">
        <div class="card-body">
            <div class="alert alert-danger" role="alert">
                <h4 class="alert-heading">{{__('account.delete.attention')}}</h4>
                <div>{{__('account.delete.message')}}</div>
            </div>

            <form method="POST" action="{{ route('delete') }}">
                @csrf
                <input type="submit" class="btn btn-danger" value="{{__('account.delete.confirmation')}}">
                <a href="{{route('home')}}" class="btn btn-default">{{__('common.buttons.back')}}</a>
            </form>
        </div>
    </div>
@endsection
