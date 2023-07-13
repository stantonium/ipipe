<?php
define('NOAUTHENTICATION',true);
include_once('../global.php');
global $dbh;
error_log("SetActiveModels.php");
$selectedmodels = $_POST['selectedscheduledmodel'];
$action = $_POST['action'];
$userid = $_POST['userid'];
error_log(print_r($selectedmodels, true));
error_log($action);
foreach ($selectedmodels as $selectedmodel){
$selectedmodel2 = str_replace('SM', '', $selectedmodel);
error_log($selectedmodel2);
if ($action == 'deactivate'){
$move = pg_query_params($dbh,'UPDATE scheduledruns
    SET active = false 
    WHERE id = $1', 
    array ($selectedmodel2));
    pg_free_result($move);

}
else{
    $move = pg_query_params($dbh,'UPDATE scheduledruns
    SET active = true
    WHERE id = $1', 
    array ($selectedmodel2));
    pg_free_result($move);
  
}
}
$result = pg_query_params ($dbh, 'select models.getscheduledmodelnames($1);', 
    array ($userid));
    $scheduledruns = pg_fetch_all($result);
    pg_free_result($result);
    echo (json_encode($scheduledruns));
?>