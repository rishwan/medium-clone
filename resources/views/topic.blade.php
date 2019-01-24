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
            "baseUrl": "{{ url('/') }}",
        }
    </script>

    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

</head>
<body>

<div id="app">
    <topic-header></topic-header>

    <div class="container mt-10">
        <div class="">
            <div class="flex -mx-2">
                <div class="lg:w-2/3 w-full px-2">
                    <topic-feature-article></topic-feature-article>
                    <topic-articles></topic-articles>
                </div>
                <div class="lg:block hidden w-1/3 px-2">
                    <topic-details></topic-details>
                </div>
            </div>
        </div>
    </div>


</div>
<!-- Scripts -->
<script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
