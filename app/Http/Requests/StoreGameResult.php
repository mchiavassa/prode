<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGameResult extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'home_score' => 'required|integer|min:0',
            'away_score' => 'required|integer|min:0',
            'home_tie_break_score' => 'nullable|integer|min:0',
            'away_tie_break_score' => 'nullable|integer|min:0',
        ];
    }
}
