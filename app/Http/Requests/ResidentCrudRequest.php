<?php

namespace App\Http\Requests;

use Backpack\CRUD\app\Http\Requests\CrudRequest;

class ResidentCrudRequest extends CrudRequest
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
            'slug' => 'required|max:255|regex:/^[-a-z0-9]+$/|unique:residents,slug,' . $this->input('id'),
            'title_en' => 'required|max:255|unique:residents,title_en,' . $this->input('id'),
            'title_th' => 'nullable|max:255|unique:residents,title_th,' . $this->input('id'),
            'rank' => 'required|numeric|min:0',
            'status' => 'required',
        ];
    }
}
