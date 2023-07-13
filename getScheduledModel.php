<?php
define('NOAUTHENTICATION',true);
include_once('../global.php');
global $dbh;
error_log("getScheduledModel.php");

$userid = $_POST['userid'];

error_log($userid);

$userid = (int)$userid;


$result = pg_query_params($dbh,'SELECT models.getscheduledmodelnames($1)', array ($userid));
    $scheduledruns = pg_fetch_all($result);
    pg_free_result($result);
    error_log(print_r($scheduledruns,TRUE));
    echo (json_encode($scheduledruns));


?>