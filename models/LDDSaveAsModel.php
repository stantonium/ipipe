<?php 
define('NOAUTHENTICATION',true); 
include_once('../../global.php');
global $dbh;
$Name = $_POST['Name'];
//error_log($Name);
$base = $_POST['base'];
//error_log($base);
$maxaccdd = $_POST['maxaccdd'];
//error_log($maxaccdd);
$k = $_POST['k'];
//error_log($k);
$station = $_POST['station'];
//error_log($station);
$TimePeriod = $_POST['TimePeriod'];
//error_log($TimePeriod);
$user_id = $_POST['user_id'];
//error_log($user_id);
$RunNum = $_POST['RunNum'];
//error_log($RunNum);
$limits = $_POST['limits'];
//error_log($limits);
$datelastrun = $_POST['datelastrun'];

$lddfacc = $_POST['lddfacc'];
//error_log($datelastrun);


$insert = pg_insert($dbh,'models.lddsaved', $_POST);
if($insert){}else{echo("You cannot reuse model names or have blank station ids/areas of interest. Please check your parameters and try again.");}
 
?>

