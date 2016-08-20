<?php

require_once __DIR__ . '/../www-bootstrap.php';

/* ------------------------------------------------------------------------------
  Initialize
  ------------------------------------------------------------------------------ */
$_base = dirname(dirname(__FILE__));

/* ------------------------------------------------------------------------------
  Language
  ------------------------------------------------------------------------------ */
$_language = "English";
$_lang = array();
//standard
$_lang['base'] = '';
$_lang['title'] = 'title';
$_lang['home'] = 'Home';
$_lang['back_to_top'] = "back to top";
$_lang['language'] = "Language";
$_lang['thai'] = "Thai";
$_lang['english'] = 'English';

//audio
$_lang['play'] = "Play";
$_lang['download'] = "Download";
$_lang['request_print_copy'] = "Request Print Copy";
$_lang['read_more'] = "Read More";

//category
$_lang['dhamma_talk'] = "Dhamma Talk";
$_lang['chanting'] = "Chanting";
$_lang['retreat'] = "Retreat";
$_lang['print_copy'] = "Print Copy";
$_lang['category'] = "Category";
$_lang['all'] = "All";
$_lang['collection'] = "Collection";

//home
$_lang['latest'] = "Latest";
$_lang['talk'] = "Talk";
$_lang['reflection'] = "Refleciton";
$_lang['news'] = "News";
$_lang['calendar'] = "Calendar";
$_lang['more'] = "More";
//resident
$_lang['community'] = "Community";
$_lang['resident'] = "Residents";
/* ------------------------------------------------------------------------------
  Class
  ------------------------------------------------------------------------------ */

$db = \Abhayagiri\DB::getDB();
$func = new \Abhayagiri\Func();

?>
