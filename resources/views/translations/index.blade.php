@extends('layouts.app')

@section('content')
    <div class="mb-4">
        <div class="feature-icon bg-dark bg-gradient">
            <i class="bi-translate"></i>
        </div>
        <span class="fs-2 fw-bold">{{__('menu.translations')}}</span>
    </div>

    <div class="row">
        <div class="col-md-12 card p-4">
            <div class="d-flex align-items-start">
                <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    @foreach(array_keys($translations) as $locale)
                    <button class="nav-link"
                            id="v-pills-{{$locale}}-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#v-pills-{{$locale}}"
                            type="button"
                            role="tab"
                            aria-controls="v-pills-{{$locale}}">
                        {{strtoupper($locale)}}
                    </button>
                    @endforeach
                </div>
                <div class="tab-content" id="v-pills-tabContent">
                    @foreach($translations as $locale => $json)
                    <div class="tab-pane fade"
                         id="v-pills-{{$locale}}"
                         role="tabpanel"
                         aria-labelledby="v-pills-{{$locale}}-tab">
                        <div id="json-{{$locale}}" class="raw-json">{!! $json !!}</div>
                        <div id="json-editor-{{$locale}}" style="width: 800px; height: 400px;"></div>
                        <button id="btnSave-{{$locale}}" class="btn btn-primary mt-2">{{__('common.buttons.save')}}</button>
                    </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
@endsection

@push('script')
<script src="https://cdnjs.cloudflare.com/ajax/libs/jsoneditor/9.9.2/jsoneditor.min.js"></script>
<script src="https://rawgit.com/thlorenz/brace/master/theme/twilight.js"></script>
<script type="text/javascript">
    $(function () {
        const locales = @json(array_keys($translations));
        const options = {
            mode: 'code',
            mainMenuBar: false,
            statusBar: false
        };

        locales.forEach(function (locale, index) {
            let id = 'json-editor-' + locale;
            const editor = new JSONEditor(document.getElementById(id), options);
            // set json
            const json = JSON.parse($('#json-' + locale).text());
            editor.set(json)

            $('#btnSave-' + locale).click(function () {
                let options = {
                    url: '{{route('translations.save')}}',
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    method: 'POST',
                    dataType: 'json',
                    data: {
                        locale: locale,
                        json: JSON.stringify(editor.get())
                    },
                    success: function (response) {
                        if (response.metadata.code === 200) {
                            toastr.success("{{__('common.messages.success')}}");
                        } else {
                            toastr.error("{{__('common.messages.errors.unexpected')}}");
                        }
                    },
                    error: function () {
                        toastr.error("{{__('common.messages.errors.unexpected')}}");
                    }
                };

                $.ajax(options);
            });
        });

        $("#v-pills-tab").children()[0].click()
    });
</script>
@endpush
@push('css')
    <link href="https://cdnjs.cloudflare.com/ajax/libs/jsoneditor/9.9.2/jsoneditor.min.css" rel="stylesheet" type="text/css"><style>
        /* dark styling of the editor */
        div.jsoneditor,
        div.jsoneditor-menu {
            border-color: #4b4b4b;
        }
        div.jsoneditor-menu {
            background-color: #4b4b4b;
        }
        div.jsoneditor-tree,
        div.jsoneditor textarea.jsoneditor-text {
            background-color: #666666;
            color: #ffffff;
        }
        div.jsoneditor-field,
        div.jsoneditor-value {
            color: #ffffff;
        }
        table.jsoneditor-search div.jsoneditor-frame {
            background: #808080;
        }

        tr.jsoneditor-highlight,
        tr.jsoneditor-selected {
            background-color: #808080;
        }

        div.jsoneditor-field[contenteditable=true]:focus,
        div.jsoneditor-field[contenteditable=true]:hover,
        div.jsoneditor-value[contenteditable=true]:focus,
        div.jsoneditor-value[contenteditable=true]:hover,
        div.jsoneditor-field.jsoneditor-highlight,
        div.jsoneditor-value.jsoneditor-highlight {
            background-color: #808080;
            border-color: #808080;
        }

        div.jsoneditor-field.highlight-active,
        div.jsoneditor-field.highlight-active:focus,
        div.jsoneditor-field.highlight-active:hover,
        div.jsoneditor-value.highlight-active,
        div.jsoneditor-value.highlight-active:focus,
        div.jsoneditor-value.highlight-active:hover {
            background-color: #b1b1b1;
            border-color: #b1b1b1;
        }

        div.jsoneditor-tree button:focus {
            background-color: #868686;
        }

        /* coloring of JSON in tree mode */
        div.jsoneditor-readonly {
            color: #acacac;
        }
        div.jsoneditor td.jsoneditor-separator {
            color: #acacac;
        }
        div.jsoneditor-value.jsoneditor-string {
            color: #00ff88;
        }
        div.jsoneditor-value.jsoneditor-object,
        div.jsoneditor-value.jsoneditor-array {
            color: #bababa;
        }
        div.jsoneditor-value.jsoneditor-number {
            color: #ff4040;
        }
        div.jsoneditor-value.jsoneditor-boolean {
            color: #ff8048;
        }
        div.jsoneditor-value.jsoneditor-null {
            color: #49a7fc;
        }
        div.jsoneditor-value.jsoneditor-invalid {
            color: white;
        }
    </style>
    <style>
        .raw-json {
            display: none;
        }
    </style>
@endpush
