<script src="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>
<script>toastr.options = {"closeButton": true, "positionClass": "toast-bottom-right"};</script>

@isset($successMessage)<script>toastr.success('{{$successMessage}}');</script>@endisset
@if (session(\App\Http\Controllers\Controller::SUCCESS_MESSAGE))
    <script>toastr.success('{{session(\App\Http\Controllers\Controller::SUCCESS_MESSAGE)}}');</script>
@endif

@isset($errorMessage)<script>toastr.error('{{$errorMessage}}');</script>@endisset
@if (session(\App\Http\Controllers\Controller::ERROR_MESSAGE))
    <script>toastr.error('{{session(\App\Http\Controllers\Controller::ERROR_MESSAGE)}}');</script>
@endif
