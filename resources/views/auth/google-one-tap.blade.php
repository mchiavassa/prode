@auth
@else
<div id="g_id_onload"
     data-client_id="{{ config('services.google.client_id') }}"
     data-context="signin"
     data-ux_mode="redirect"
     data-login_uri="{{ route('login.external', 'google') }}"
     data-_token="{{ csrf_token() }}"
     data-auto_prompt="true"
     data-prompt_parent_id="g_id_onload"
     style="position: absolute; top: 5em; right: 1em;">
</div>
@endauth
