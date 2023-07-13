<?php
define('NOAUTHENTICATION',true); 
include_once('../global.php');
global $dbh;
//var_dump($dbh);
//var_dump($_POST);
$user_id = $_POST['user_id'];
error_log(print_r($user_id, true)); 

$aois = pg_query_params($dbh,"select name, longitudes, latitudes, id from aoi.useraois where user_id=$1;", array($user_id));
$useraois = pg_fetch_all($aois);
pg_free_result($aois);

if ($useraois)
{ 
 error_log(print_r($useraois, true));
 echo json_encode($useraois);
};
?>
