<h4 class="mb-4">Posiciones</h4>

<form class="mb-4">
    <select id='rankings' class="form-control">
        @foreach($rankings as $ranking)
            <option value="{{$ranking->id}}">{{$ranking->name}}</option>
        @endforeach
    </select>
</form>

<div class="tab-content">
    @foreach($rankings as $ranking)
        <div class="tab-pane {{$ranking->id == 'general' ? 'active' : ''}}" id="{{$ranking->id}}">
            @include('party.ranking', ['ranking' => $ranking->list, 'party' => $party])
        </div>
    @endforeach
</div>

<script type="text/javascript">
    $(function () {
        $('#rankings').on('change', function (e) {
            $('.tab-pane').hide();
            $('#' + $(this).val() + '.tab-pane').show();
        });
    });
</script>
