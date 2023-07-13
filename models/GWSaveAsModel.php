<?php 
define('NOAUTHENTICATION',true); 
include_once('../../global.php');
global $dbh;
$Name = $_POST['Name'];
error_log($Name);
$station = $_POST['station'];
error_log($station);
$TimePeriod = $_POST['TimePeriod'];
error_log($TimePeriod);
$user_id = $_POST['user_id'];
error_log($user_id);
$RunNum = $_POST['RunNum'];
error_log($RunNum);
$datelastrun = $_POST['datelastrun'];
error_log($datelastrun);
pg_insert($dbh,'models.gwsaved', $_POST); 
?>

