<?php
$I = new ApiTester($scenario);
$I->wantTo('get albums via API');

$I->sendGET('/albums');
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK);
$I->seeResponseIsJson();
$albums = $I->grabDataFromResponseByJsonPath('*');
$I->assertGreaterThan(-1, count($albums));

$I->sendGET('/albums/abc');
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::NOT_FOUND);
