<?php

namespace App\Http\Controllers\Admin;

use Backpack\CRUD\app\Http\Controllers\CrudController;
use Illuminate\Support\Facades\Log;

use App\Http\Requests\BlobCrudRequest as StoreRequest;
use App\Http\Requests\BlobCrudRequest as UpdateRequest;

class BlobCrudController extends CrudController {

    use CommonCrudTrait;

    public function setup()
    {
        $this->crud->setModel('App\Models\Blob');
        $this->crud->setRoute('admin/blobs');
        $this->crud->orderBy('name');
        $this->crud->setEntityNameStrings('blob', 'blobs');
        $this->crud->denyAccess(['create', 'delete']);
        $this->crud->allowAccess('revisions');
        $this->crud->with('revisionHistory');

        $this->addTitleCrudColumn('name', 'Name');
        $this->addCheckTranslationCrudColumn();

        $this->crud->addField([
            'name' => 'name',
            'label' => 'Name',
            'attributes' => [ 'disabled' => 'disabled' ],
        ]);
        $this->addDescriptionCrudField('body_en', 'Body (English)');
        $this->addDescriptionCrudField('body_th', 'Body (Thai)');
        $this->addCheckTranslationCrudField();
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
