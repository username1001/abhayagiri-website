<?php

namespace App\Http\Requests;

use Backpack\CRUD\app\Http\Requests\CrudRequest;

class PlaylistCrudRequest extends CrudRequest
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
            //'group_id' => 'required',
            'title_en' => 'required|max:255|unique:playlists,title_en,' . $this->input('id'),
            'title_th' => 'nullable|max:255|unique:playlists,title_th,' . $this->input('id'),
            'rank' => 'required|numeric|min:0'
        ];
    }
}
