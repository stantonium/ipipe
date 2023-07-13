<?php
define('NOAUTHENTICATION',true);
include_once('../global.php');
global $dbh;
$name = $_POST['name'];
$northwestcorner = $_POST['longitudes'];
$southeastcorner =$_POST['latitudes'];
$user_id = $_POST['user_id'];
//populate the postgress database
$insert = pg_insert($dbh,'aoi.useraois', $_POST);
error_log($_POST['longitudes']);
error_log($_POST['name']);
error_log($_POST['user_id']);
error_log($_POST['latitudes']);
error_log(print_r($insert, TRUE));
##echo json_encode($timeStamp);
?>
