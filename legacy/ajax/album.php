<script>//window.location.replace("https://picasaweb.google.com/110976577577357155764");</script>
<?php
//$_album_title = $func->google_picasa_album_data($_album);
//$_album = $func->google_picasa_images($_album);
$_album_title = $func->galleryAlbumTitle($_album);
$_album = $func->galleryImages($_album);
?>
<!--image-->
<div id="banner">
    <div class="title"><?= $_page_title ?></div>
    <img src="/media/images/banner/gallery.jpg">
</div>
<div id="breadcrumb-container">
    <div class="container-fluid">
        <ul class="breadcrumb">
            <li><a href="<?= $_lang['base'] ?>/"><?= $_lang['home'] ?></a> <span class="divider">/</span></li>
            <li><a href="<?= $_lang['base'] ?>/gallery"><?= $_page_title ?></a><span class="divider">/</span></li>
            <li class='active'><?= $_album_title ?></li>
        </ul>
    </div>
</div>
<!--/image-->
<!--body-->
<script>
                _gallery = [];
                gallery_index = 0;
                gallery_title = "<?= $_album_title ?>";
</script>
<div id="content" class="container-fluid">

    <legend><?= $_album_title ?></legend>
    <div id="gallery">
        <?php
        foreach ($_album as $key => $row) {
            $url = $row['url'];
            $thumb = $row['thumbnail'];
            $height = $row['height'];
            $width = $row['width'];
           $desc =  addslashes($row['description']);
            ?>
            <script>_gallery.push(['<?= $url ?>', <?= $height ?>,<?= $width ?>,'<?=$desc?>'])</script>
            <a href="<?= $url ?>" onclick="showSlideshow();
                                loadSlide(<?= $key ?>);
                                return false;" class='album brick thumbnail nonav'>
                <div class='image'>
                    <img src="<?= $thumb ?>" onclick="showSlideshow();
                        loadSlide(<?= $key ?>);
                        return false;"/>
                </div>
            </a>
        <?php } ?>
    </div>
</div>

<div id="slideshow" class="carousel slide" style="display:none">
    <span class="carousel-indicators">
        <a class="nonav" onclick="hideSlideshow()"><i class="icon-remove-sign"></i></a>
    </span>
    <div class="carousel-inner">
        <div class="item active">
            <div id='slide'><img src="/media/images/gallery/test/bobafett.jpg" alt=""></div>
        </div>
    </div>
    <div id='slide-caption' class="carousel-caption">
        <h4></h4>
    </div>
    <a id="prev" class="left carousel-control nonav" onclick="loadSlide(gallery_index - 1)" data-slide="prev" ><i class="icon-circle-arrow-left"></i></a>
    <a id="next" class="right carousel-control nonav" onclick="loadSlide(gallery_index + 1)" data-slide="next"><i class="icon-circle-arrow-right"></i></a>
</div>
