<?php

require base_path('legacy/bootstrap.php');
require base_path('legacy/php/main.php');

$path = \Request::path();
$redirect = \App\Models\Redirect::getRedirectFromPath($path);
if ($redirect) {
    throw new \App\Legacy\RedirectException($redirect);
}

$versionStamp = App\Util::versionStamp();

/* ------------------------------------------------------------------------------
  Page and Subpage
  ------------------------------------------------------------------------------ */
if ($_REQUEST['_page']) {
    $_page = $_REQUEST['_page'];
    $_page_title = ucfirst($_page);
} else {
    $_page = "home";
}
if ($_REQUEST['_subpage']) {
    $_subpage = $_REQUEST['_subpage'];
    $_subpage_title = $func->title_case($_subpage);
}
if ($_REQUEST['_subsubpage']) {
    $_subsubpage = $_REQUEST['_subsubpage'];
    $_subsubpage_title = $func->title_case($_subsubpage);
}
/* ------------------------------------------------------------------------------
  Title
  ------------------------------------------------------------------------------ */
$_title = "Abhayagiri Buddhist Monastery";
$_title .= ($_page != "home") ? " - $_page_title" : "";
$_title .= ($_subpage != "") ? " - $_subpage_title" : "";
$_title .= ($_subsubpage != "") ? " - $_subsubpage_title" : "";

require base_path('legacy/php/nav.php');

echo View::make('page/header', [
    'versionStamp' => $versionStamp,
    '_title' => $_title,
    '_meta_description' => $_meta_description,
    '_page' => $_page,
    '_subpage' => $_subpage,
    '_subsubpage' => $_subsubpage,
    '_type' => $_type,
    '_icon' => $_icon,
    '_action' => $_action,
])->render() ?>
    <!--body-->
    <body>
        <!--<div id="responsive-tester" style="position:absolute;top:10px;left:10px;background:pink;color:black;z-index:999999">Responsive Ruler</div>-->
        <?php
        if (preg_match('/(?i)msie [2-8]/', array_get($_SERVER, 'HTTP_USER_AGENT', ''))) {
            // if IE<=8
            echo '<p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a>';
            exit;
        }
        ?>
        <div id="wrapper">
            <a id='link-language' href='/th' onclick="return switchLanguage()" class='nonav'><span class='flag flag-th'></span> ภาษาไทย</a>

            <!--header-->
            <div id="header" role="banner">
                <div class="container-fluid">
                    <div id="logo" ><img src="/media/images/misc/header.jpg"></div>
                    <div id="btn-container">
                        <div id="btn-search" class="pull-right">
                            <img src="data:image/png;base64,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">
                        </div>
                        <div id="btn-menu" class="pull-right">
                            <img src="data:image/png;base64,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">
                        </div>
                    </div>
                </div>
            </div>
            <div id="btn-mobile-container">
                <div class="btn-group">
                    <button id="btn-mobile-menu" class="btn btn-large btn-inverse">
                        <i class="icon-th"></i>
                        Menu
                    </button>
                    <button id="btn-mobile-search" class="btn btn-large btn-inverse">
                        <i class="icon-search"></i>
                        Search
                    </button>
                </div>
            </div>
            <!--/header-->
            <!--nav-->
            <div id="nav-container">
                <div class="container-fluid">
                    <div id="nav">
                        <i class="icon-sort-up arrow"></i>
                        <?= $_nav ?>
                    </div>
                </div>
            </div>
            <!--/nav-->
            <!--search-->
            <div id="search" class="container">
                <!--<div id="search-input">
                    <div class="container-fluid">
                        <div class="input-append">
                            <input class="span2" type="text">
                            <button id="search-button" class="btn btn-primary" type="button"><i class="icon icon-search"></i></button>
                        </div>
                    </div>
                </div>
                <div class="container-fluid">
                    <table cellpadding="0" cellspacing="0" border="0" class="table" id="search-results">
                        <thead>
                            <tr>
                                <th style="display:none"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>

                            </tr>
                        </tbody>
                    </table>
                </div>-->
<script>
  (function() {
    var cx = '000972291994809008767:xp7cjel9soe';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
        '//www.google.com/cse/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  })();
</script>
<gcse:search></gcse:search>
            </div>
            <!--/search-->
            <div id="loading" >
                <i class="icon-spinner icon-spin"></i>
            </div>
            <!--page-->
            <div id="page">
                <?php
                switch ($_type) {
                    case "Table":
                        include("$_base/php/table.php");
                        break;
                    case "Standard":
                        include("$_base/php/standard.php");
                        break;
                    case "Custom":
                        include("$_base/ajax/$_page.php");
                        break;
                    case "Entry":
                        if ($_entry == "request") {
                            include("$_base/ajax/request.php");
                        } else {
                            include("$_base/php/entry.php");
                        }
                        break;
                    case "Album":
                        include("$_base/ajax/album.php");
                        break;
                    case "Event":
                        include("$_base/ajax/event.php");
                        break;
                    default:
                        include("$_base/ajax/404.php");
                }
                ?>
            </div>
            <!--/page-->

            <div id="fold">
                <?php echo View::make('page/footer')->render() ?>
                <?php echo View::make('page/audio-player', ['func' => $func])->render() ?>
            </div>
            <!--fold-->

        </div>
        <!-- /wrapper -->

        <!--script-->
        <?php echo View::make('page/scripts', [
            'versionStamp' => $versionStamp,
        ])->render() ?>
        <?php echo View::make('page/feedback')->render() ?>
        <!--/script-->

    </body>
    <!--/body-->

</html>
