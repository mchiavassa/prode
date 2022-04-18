<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ForecastGame extends FormRequest
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
            'home_score' => 'required|integer|min:0|max:100',
            'away_score' => 'required|integer|min:0|max:100',
            'home_tie_break_score' => 'nullable|integer|min:0|max:100',
            'away_tie_break_score' => 'nullable|integer|min:0|max:100',
        ];
    }
}
