<div>
    @foreach($users as $user)
        <img src="{{ $user->picture_url }}"
             class="rounded mb-1"
             height="30px" width="30px"
             data-toggle="tooltip" data-placement="bottom" title="{{ $user->name }}">
    @endforeach
</div>
