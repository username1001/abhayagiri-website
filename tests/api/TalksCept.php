<?php
$I = new ApiTester($scenario);
$I->wantTo('get talks via API');

// Simple Test

$authorId = App\Models\Author::where('slug', 'abhayagiri-sangha')->first()->id;
$I->sendGET('/talks', ['authorId' => $authorId, 'endDate' => 1236211400]);
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK);
$I->seeResponseIsJson();
$I->seeResponseContainsJson(['result' => [[
    'titleEn' => 'Āṭānāṭiya Paritta',
    'mediaUrl' => '/media/audio/Chanting2009/C19AtanatiyaParitta.mp3',
    // TODO need much better test
]]]);

// authorId Test
$authorId = App\Models\Author::where('slug', 'ajahn-kampong')->first()->id;
$I->sendGET('/talks', ['authorId' => $authorId]);
$I->seeResponseContainsJson(['total' => 4]);

// subjectId Test
$I->sendGET('/talks', ['subjectId' => 1]);
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK);
$I->seeResponseIsJson();
$talks = $I->grabDataFromResponseByJsonPath('result');
$I->assertGreaterThan(0, count($talks));

// searchText Test
$I->sendGET('/talks', ['searchText' => "don't hold back"]);
$I->seeResponseContainsJson(['result' => [
    [ 'titleEn' => 'Monastic Retreat 2013: Questions and Answers 5' ],
]]);

$I->sendGET('/talks', ['searchText' => "100% of the holy life"]);
$I->seeResponseContainsJson(['result' => [
    [ 'titleEn' => 'Swept Along by the Steam of the Dhamma' ],
]]);

$I->sendGET('/talks', ['searchText' => "%%"]);
$I->seeResponseContainsJson([]);

$I->sendGET('/talks/6635');
$I->seeResponseContainsJson(['titleEn' => 'See the World as a Royal Chariot']);
