<?php 
define('NOAUTHENTICATION',true); 
include_once('../../global.php');
global $dbh;
error_log('DDSaveRuns.php');
$Name = $_POST['Name'];
error_log($Name);
$base = $_POST['base'];
error_log($base);
$maxaccdd = $_POST['maxaccdd'];
error_log($maxaccdd);
$station = $_POST['station'];
error_log($station);
$TimePeriod = $_POST['TimePeriod'];
error_log($TimePeriod);
$user_id = $_POST['user_id'];
error_log($user_id);
$RunNum = $_POST['RunNum'];
error_log($RunNum);
$limits = $_POST['limits'];
error_log($limits);
$datelastrun = $_POST['datelastrun'];
error_log($datelastrun);
pg_insert($dbh,'models.dd', $_POST); 
?>

