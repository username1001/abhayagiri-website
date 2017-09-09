<?php

namespace App\Http\Requests;

class LanguageCrudRequest extends AppCrudRequest
{

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // only allow updates if the user is logged in
        return \Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'code' => 'required|max:255|unique:languages,code,' . $this->input('id'),
            'title_en' => 'required|max:255|unique:languages,title_en,' . $this->input('id'),
            'title_th' => 'required|max:255|unique:languages,title_th,' . $this->input('id'),
        ];
    }

}
