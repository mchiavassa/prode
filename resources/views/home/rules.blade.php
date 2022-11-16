@extends('layouts.app')

@section('content')
    <div class="text-justify bg-light p-4">

        <div class="mt-2 text-center">
            <img src="{{asset('img/logo.png')}}" alt="Prode" class="rounded" height="48px">
            <h2 class="display-5 fw-bold">{{__('rules.title')}}</h2>
        </div>
        <div class="row g-4 py-5 row-cols-1 row-cols-lg-3 text-center">
            <div class="feature col">
                <div class="feature-icon bg-light text-dark bg-gradient mb-2">
                    <i class="bi-people-fill"></i>
                </div>
                <h2>{{__('rules.start.title')}}</h2>
                <p>{{__('rules.start.description')}}</p>
            </div>
            <div class="feature col">
                <div class="feature-icon bg-light text-dark bg-gradient mb-2">
                    <i class="bi-magic"></i>
                </div>
                <h2>{{__('rules.forecasts.title')}}</h2>
                <p>{{__('rules.forecasts.description')}}</p>
            </div>
            <div class="feature col">
                <div class="feature-icon bg-light text-dark bg-gradient mb-2">
                    <i class="bi-list-ol"></i>
                </div>
                <h2>{{__('rules.compete.title')}}</h2>
                <p>{{__('rules.compete.description')}}</p>
            </div>
        </div>

        <div class="mt-2 text-center">
            <div class="feature-icon bg-dark bg-gradient">#</div>
            <h2 class="display-5 fw-bold">{{__('rules.points')}}</h2>
        </div>

        <div class="row g-5 py-5 row-cols-1 row-cols-lg-5 text-center">
            <div class="feature col">
                <div class="feature-icon points bg-primary bg-gradient mb-2 fw-bold">
                    +{{config('domain.points.'.\App\Models\ForecastAssertion::RESULT)}}
                </div>
                <h3>{{__('domain.forecast.assertion.'.\App\Models\ForecastAssertion::RESULT)}}</h3>
                <p>{{__('rules.assertions.'.\App\Models\ForecastAssertion::RESULT)}}</p>
            </div>
            <div class="feature col">
                <div class="feature-icon points bg-primary bg-gradient mb-2 fw-bold">
                    +{{config('domain.points.'.\App\Models\ForecastAssertion::TEAM_SCORE)}}
                </div>
                <h3>{{__('domain.forecast.assertion.'.\App\Models\ForecastAssertion::TEAM_SCORE)}}</h3>
                <p>{{__('rules.assertions.'.\App\Models\ForecastAssertion::TEAM_SCORE)}}</p>
            </div>
            <div class="feature col">
                <div class="feature-icon points bg-primary bg-gradient mb-2 fw-bold">
                    +{{config('domain.points.'.\App\Models\ForecastAssertion::SCORE)}}
                </div>
                <h3>{{__('domain.forecast.assertion.'.\App\Models\ForecastAssertion::SCORE)}}</h3>
                <p>{{__('rules.assertions.'.\App\Models\ForecastAssertion::SCORE)}}</p>
            </div>
            <div class="feature col">
                <div class="feature-icon points bg-primary bg-gradient mb-2 fw-bold">
                    +{{config('domain.points.'.\App\Models\ForecastAssertion::TIEBREAK_EXISTENCE)}}
                </div>
                <h3>{{__('domain.forecast.assertion.'.\App\Models\ForecastAssertion::TIEBREAK_EXISTENCE)}}</h3>
                <p>{{__('rules.assertions.'.\App\Models\ForecastAssertion::TIEBREAK_EXISTENCE)}}</p>
            </div>
            <div class="feature col">
                <div class="feature-icon points bg-primary bg-gradient mb-2 fw-bold">
                    +{{config('domain.points.'.\App\Models\ForecastAssertion::TIEBREAK_SCORE)}}
                </div>
                <h3>{{__('domain.forecast.assertion.'.\App\Models\ForecastAssertion::TIEBREAK_SCORE)}}</h3>
                <p>{{__('rules.assertions.'.\App\Models\ForecastAssertion::TIEBREAK_SCORE)}}</p>
            </div>
        </div>
    </div>

@endsection
