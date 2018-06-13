<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <link rel="apple-touch-icon-precomposed" sizes="57x57" href="{{asset('img/favicon/apple-touch-icon-57x57.png')}}" />
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="{{asset('img/favicon/apple-touch-icon-114x114.png')}}" />
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="{{asset('img/favicon/apple-touch-icon-72x72.png')}}" />
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="{{asset('img/favicon/apple-touch-icon-144x144.png')}}" />
    <link rel="apple-touch-icon-precomposed" sizes="60x60" href="{{asset('img/favicon/apple-touch-icon-60x60.png')}}" />
    <link rel="apple-touch-icon-precomposed" sizes="120x120" href="{{asset('img/favicon/apple-touch-icon-120x120.png')}}" />
    <link rel="apple-touch-icon-precomposed" sizes="76x76" href="{{asset('img/favicon/apple-touch-icon-76x76.png')}}" />
    <link rel="apple-touch-icon-precomposed" sizes="152x152" href="{{asset('img/favicon/apple-touch-icon-152x152.png')}}" />
    <link rel="icon" type="image/png" href="{{asset('img/favicon/favicon-196x196.png')}}" sizes="196x196" />
    <link rel="icon" type="image/png" href="{{asset('img/favicon/favicon-96x96.png')}}" sizes="96x96" />
    <link rel="icon" type="image/png" href="{{asset('img/favicon/favicon-32x32.png')}}" sizes="32x32" />
    <link rel="icon" type="image/png" href="{{asset('img/favicon/favicon-16x16.png')}}" sizes="16x16" />
    <link rel="icon" type="image/png" href="{{asset('img/favicon/favicon-128.png')}}" sizes="128x128" />

    <!-- Styles -->
    @stack('css')
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css">
    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <script>
        (adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: "ca-pub-9628103456409647",
            enable_page_level_ads: true
        });
    </script>
</head>
<body>
    <div id="app">
        <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
            <div class="container">
                <a class="navbar-brand" href="{{route('home')}}">
                    <img src="{{asset('img/logo.png')}}" alt="Prode" class="rounded" height="30px">
                    {{ config('app.name', 'Laravel') }}
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    @include('common.menu')

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        @include('common.login')
                    </ul>
                </div>
            </div>
        </nav>

        <main class="container">
            <div class="my-4 p-4 bg-white box-shadow rounded bg-logo">
                @yield('content')
            </div>
        </main>
    </div>

    <script type="text/javascript">
        // Fixes Fb redirect url chars issue
        if (window.location.hash && window.location.hash == '#_=_') {
            if (window.history && history.pushState) {
                window.history.pushState("", document.title, window.location.pathname);
            } else {
                // Prevent scrolling by storing the page's current scroll offset
                var scroll = {
                    top: document.body.scrollTop,
                    left: document.body.scrollLeft
                };
                window.location.hash = '';
                // Restore the scroll offset, should be flicker free
                document.body.scrollTop = scroll.top;
                document.body.scrollLeft = scroll.left;
            }
        }
    </script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-118928932-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-118928932-1');
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.1/moment.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.17/moment-timezone-with-data.min.js"></script>
    <script>
        const appTimeZone = '{{config('app.timezone')}}';
        function getTimezoneNow() {
            const nowInTimeZone = moment().tz(appTimeZone);

            return new Date(Date.parse(moment().tz(appTimeZone).toString()));
        }
    </script>
    <script src="{{ mix('js/app.js') }}"></script>
    @include('common.messages')
    @stack('script')
</body>
</html>
