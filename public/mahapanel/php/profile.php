<?
session_start();
$name = $_SESSION['name'];
$avatar = $_SESSION['avatar'];
$banner = $_SESSION['banner'];
$user = $_SESSION['user'];
?>

<span class="btn-close" onclick="togglePanel('#form')"><i class="icon-remove-sign"></i></span><br><br><br>
<div class ="container-fluid" id="formpage">
    <br><br><br><br>
    <div class="box span12">
        <div class="formbox">
            <div data-original-title>

                <h2><i class="icon-edit"></i><span class="break"></span>Edit Profile</h2>
            </div>
            <br>
            <hr class="muted">
            <div class="row-fluid sortable">



                <div class="span12">
                    <form class="form-horizontal">
                        <div class = "control-group">
                            <label class = "control-label">Name:</label>
                            <div>
                                <input id="name" name="name" type="text" class="text span4" value="<?= $name ?>">
                            </div>
                        </div>
                        <div class = "control-group">
                            <label class = "control-label">Avatar:</label>
                            <div>
                                <div style="margin-left:180px"> 
                                    <a class="btn btn-primary" onclick="$('#avatar_file').trigger('click');"><i class="icon-upload"></i> Upload file</a>
                                    <input id="avatar" name="<?= $name ?>" value="<?= $avatar ?>" type='text' >
                                    <input id="avatar_file" name="avatar" class="file span4 btn" type="file" style="visibility:hidden;height:0;" value="<?= $avatar ?>" 
                                           onchange ="initUpload('avatar', $(this).val(), '/mahapanel/img/mahaguild');">
                                </div>
                            </div>
                        </div>
                        <div class = "control-group">
                            <label class = "control-label">Banner:</label>
                            <div>
                                <div style="margin-left:180px">
                                    <a class="btn btn-primary" onclick="$('#banner_file').trigger('click');"><i class="icon-upload"></i> Upload file</a>
                                    <input id="banner" name="banner" value="<?= $banner ?>" type='text'>
                                    <input id="banner_file" name="banner" class="file span4 btn" type="file" style="visibility:hidden;height:0;" value="<?= $banner ?>" 
                                           onchange ="initUpload('banner', $(this).val(), '/mahapanel/img/mahaguild');">
                                </div>
                            </div>
                        </div>
                        <hr class="muted" >
                        <button id="edit" type="submit" class="btn btn-large btn-success btn-formsubmit pull-right"
                                onclick="submitProfile('<?= $user ?>', $('#name').val(), $('#avatar').val(), $('#banner').val());
        return false;">
                            <i class = 'icon-pencil'></i> Update
                        </button>

                        <button type="reset" class="btn btn-large btn-cancel pull-right" onclick="togglePanel('#form')">
                            Cancel
                        </button>
                    </form>
                </div>
            </div><!--/span-->
        </div>

    </div><!--/row-->