<?php

namespace App\Http\Controllers;

use Illuminate\Filesystem\Filesystem;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class TranslationController extends Controller
{
    /**
     * The filesystem instance.
     *
     * @var \Illuminate\Filesystem\Filesystem
     */
    protected $files;

    public function __construct(Filesystem $files)
    {
        $this->middleware('auth');

        $this->files = $files;
    }

    /**
     * Displays the main view for translations
     */
    public function index()
    {
        $path = lang_path();
        $locales = config('app.supported_locales');
        $translations = [];

        foreach ($locales as $locale) {
            $translations[$locale] =
                $this->files->exists($full = "{$path}/{$locale}.json")
                    ? $this->files->get($full)
                    : '{}';
        }

        return view('translations.index', ['translations' => $translations]);
    }

    /**
     * POST operation that updates the translation json of the received locale
     */
    public function updateLocaleJson(Request $request)
    {
        $locale = Arr::get($request->all(), 'locale');
        if (!$this->localeIsSupported($locale)) {
            return $this->jsonError(400, __('common.messages.errors.not_found'));
        }

        $path = lang_path();
        $json = Arr::get($request->all(), 'json');
        if ($this->files->put("{$path}/{$locale}.json", $this->format($json))) {
            return $this->jsonSuccess();
        }
        return $this->jsonError(500, __('common.messages.errors.unexpected'));
    }

    private function localeIsSupported($locale): bool
    {
        return in_array($locale, config('app.supported_locales'));
    }

    private function format(string $json) {
        return json_encode(json_decode($json), JSON_PRETTY_PRINT);
    }
}
