<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGame extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'home' => 'required|max:3',
            'away' => 'required|max:3|different:home',
            'date_and_hour' => 'required|date_format:Y-m-d H:i:s',
            'group' => 'nullable|string|max:150',
            'tie_break_required' => 'required|boolean',
            'info_url' => 'url|max:250',
        ];
    }
}
