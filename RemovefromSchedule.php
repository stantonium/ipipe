<?php
define('NOAUTHENTICATION',true);
include_once('../global.php');
global $dbh;
error_log("RemovefromSchedule.php");
$id = $_POST['scheduledmodelid'];
error_log($id);
$result = pg_query_params($dbh,' delete from scheduledruns where id = $1 ', array($_POST['scheduledmodelid']));
pg_free_result($result);
if ($result){
    echo ('scheduled model deleted');
}
?>