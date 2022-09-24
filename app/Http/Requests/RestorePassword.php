<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RestorePassword extends FormRequest
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
            'token' => 'required|string',
            'password' => 'required|string|min:4|max:20',
        ];
    }

    public function messages() : array
    {
        return [
            'password.min' => __('validation.password.min')
        ];
    }
}
