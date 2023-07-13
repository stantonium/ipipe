<?php 
define('NOAUTHENTICATION',true); 
include_once('../../global.php');
global $dbh;
$Name = $_POST['Name'];
//error_log($Name);
$c = $_POST['c'];
//error_log($c);
$PTMIN = $_POST['PTMIN'];
//error_log($PTMIN);
$PTMAX = $_POST['PTMAX'];
//error_log($PTMAX);
$PTOPT = $_POST['PTOPT'];
//error_log($PTOPT);
$OTD = $_POST['OTD'];
//error_log($OTD);
$station = $_POST['station'];
//error_log($station);
$TimePeriod = $_POST['TimePeriod'];
//error_log($TimePeriod);
$user_id = $_POST['user_id'];
//error_log($user_id);
$RunNum = $_POST['RunNum'];
//error_log($RunNum);
$datelastrun = $_POST['datelastrun'];
//error_log($datelastrun);


$insert = pg_insert($dbh,'models.tdrsaved', $_POST);
if ($insert){}else{echo("You cannot reuse model names or have blank station ids/areas of interest. Please check your parameters and try again.");}
?>

