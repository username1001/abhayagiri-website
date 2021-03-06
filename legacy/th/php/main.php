<?php

/* ------------------------------------------------------------------------------
  Initialize
  ------------------------------------------------------------------------------ */
$_base = base_path('legacy');

/* ------------------------------------------------------------------------------
  Language
  ------------------------------------------------------------------------------ */
$_language = "Thai";
$_lang = array();
//standard
$_lang['base'] = '/th';
$_lang['title'] = 'thai_title';
$_lang['home'] = 'หน้าหลัก';
$_lang['back_to_top'] = "กลับสู่ด้านบน";
$_lang['read_more'] = 'อ่านต่อ';
$_lang['language'] = 'ภาษา';
$_lang['thai'] = "ภาษาไทย";
$_lang['english'] = 'ภาษาอังกฤษ';
//category
$_lang['dhamma_talk'] = "ธรรมเทศนา";
$_lang['all'] = "ทั้งหมด";
$_lang['category'] = "เลือกประเภท";
$_lang['chanting'] = "เสียงสวดมนต์";
$_lang['retreat'] = "เทศน์ในกรรมฐาน";
$_lang['print_copy'] = "หนังสือให้เปล่า";
$_lang['collection'] = "ชุด";
//home
$_lang['latest'] = "ใหม่ล่าสุด";
$_lang['more'] = "ต่อไป";
$_lang['latest_reflection'] = "แง่ธรรมใหม่ล่าสุด";
$_lang['news'] = "ข่าว";
$_lang['calendar'] = "ปฏิทิน";
//audio
$_lang['play'] = "ฟัง";
$_lang['pause'] = "หยุด";
$_lang['download'] = "ดาวน์โหลด";
//resident
$_lang['community'] = "หมู่คณะ";
$_lang['resident'] = "พระภิกษุสงฆ์ นักบวชและอุบาสิกา";
//books
$_lang['request_print_copy'] = "ขอหนังสือเล่มนี้";

$_lang['i18next'] = \App\Legacy::getLocales('th');

/* ------------------------------------------------------------------------------
  Class
  ------------------------------------------------------------------------------ */

$db = App\Legacy\DB::getDB();
$func = new App\Legacy\Func('Thai');
