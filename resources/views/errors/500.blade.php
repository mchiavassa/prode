@extends('layouts.error')

@section('content')
    <h4>{{__('common.messages.errors.500.title')}}</h4>
    <p>{{__('common.messages.errors.500.message')}}</p>
    <a href="{{route('home')}}" class="btn btn-primary">{{__('common.buttons.back')}}</a>
@endsection
