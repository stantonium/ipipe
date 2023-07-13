<?php 
define('NOAUTHENTICATION',true); 
include_once('../../../../global.php');
global $dbh;
$Name = $_POST['IPT'];

$station = $_POST['sigma'];
//error_log($station);
$TimePeriod = $_POST['c'];
//error_log($TimePeriod);
$user_id = $_POST['user_id'];
$Name = $_POST['Name'];
error_log(print_r($Name, true)); 




$insert = pg_insert($dbh,'models.RADDsaved', $_POST);
if ($insert){echo("Model saved successfully");}else{echo("You cannot reuse model names or have blank station ids/areas of interest. Please check your parameters and try again.");}
?>

