<?php
define('NOAUTHENTICATION',true);
include_once('../global.php');
global $dbh;
error_log("ScheduleModel.php");
$frequency = $_POST['frequency'];
$userid = $_POST['userid'];
$delivery = $_POST['delivery'];
$units = $_POST['units'];
$modelname = $_POST['modelname'];
$templatename = $_POST['templatename'];
$aoiname = $_POST['aoiname'];
error_log($frequency);
error_log($userid);
error_log($delivery);
error_log($units);
error_log($modelname);
error_log($templatename);
error_log($aoiname);
$userid = (int)$userid;


$insert = pg_query_params($dbh,'SELECT models.populateschedule($1, $2, $3, $4, $5, $6, $7)', 
    array ($frequency, $userid, $delivery, $units, $modelname, $templatename, $aoiname));
if ($insert){
    $path = '/var/www/html/data/users/'.strval($userid); 
    error_log($path);
    mkdir($path, 0777);
    $result = pg_query_params($dbh,'SELECT models.getscheduledmodelnames($1)', array ($userid));
    $scheduledruns = pg_fetch_all($result);
    pg_free_result($result);
    error_log(print_r($scheduledruns,TRUE));
    echo (json_encode($scheduledruns));
}
 else{
    
    echo ('could not schedule');
}
?>