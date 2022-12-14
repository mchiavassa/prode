@auth
@if(config('domain.closing.enabled') && !isset($_COOKIE['closing_dismissed']))
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
        {{__('common.closing.message')}}
        <button type="button" id="closing-alert" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    <script type="text/javascript">
        document.getElementById('closing-alert').addEventListener("click", function() {
            document.cookie = "closing_dismissed=true";
        });
    </script>
@endif
@endauth
