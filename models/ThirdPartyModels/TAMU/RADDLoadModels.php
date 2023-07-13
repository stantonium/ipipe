<?php
define('NOAUTHENTICATION',true); 
include_once('../../../../global.php');
global $dbh;
//var_dump($dbh);
//var_dump($_POST);
$user_id = $_POST['user_id'];
//error_log(print_r($user_id, true)); 


$RADDmodels = pg_query_params($dbh,"select  \"Name\" from models.\"RADDsaved\" where user_id=$1;", array($user_id));
$RADDModels = pg_fetch_all($RADDmodels);
pg_free_result($RADDmodels);

if ($RADDModels)
{ 
 //error_log(print_r($useraois, true));
 echo json_encode($RADDModels);
};
?>