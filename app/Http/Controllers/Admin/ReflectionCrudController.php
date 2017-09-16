<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\ReflectionCrudRequest as StoreRequest;
use App\Http\Requests\ReflectionCrudRequest as UpdateRequest;

class ReflectionCrudController extends AdminCrudController {

    public function setup() {
        $this->crud->setModel('App\Models\Reflection');
        $this->crud->setRoute('admin/reflections');
        $this->crud->setEntityNameStrings('reflection', 'reflections');
        $this->crud->orderBy('posted_at', 'desc');
        //$this->crud->allowAccess('revisions');
        //$this->crud->with('revisionHistory');

        $this->addCheckTranslationCrudFilter();
        $this->addTrashedCrudFilter();

        $this->addTitleCrudColumn();
        $this->addLocalPostedAtCrudColumn();

        $this->addTitleCrudField();
        $this->addAltTitleEnCrudField();
        $this->addAltTitleEnCrudField();
        $this->addBodyCrudField();
        $this->addCheckTranslationCrudField();
        $this->addImageCrudField();
        $this->addDraftCrudField();
        $this->addLocalPostedAtCrudField();
    }

    public function store(StoreRequest $request)
    {
        return parent::storeCrud($request);
    }

    public function update(UpdateRequest $request)
    {
        return parent::updateCrud($request);
    }
}
