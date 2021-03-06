<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>MediumClone</title>

        <script>
            window.Laravel = {
                "csrfToken": "foo",
                "baseUrl": "{{ url('/') }}"
            }
        </script>

        <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    </head>
    <body>
        <div id="app">
            <main-menu></main-menu>
            <hero-section></hero-section>
            <home-topic-features></home-topic-features>
        </div>
        <!-- Scripts -->
        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
