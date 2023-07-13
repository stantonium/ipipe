<?php
define('NOAUTHENTICATION',true); 
include_once('../../global.php');
global $dbh;
//var_dump($dbh);
//var_dump($_POST);
$userid = $_POST['User']['user_id'];
//echo $userid; 
$R = $_POST['R'];

$GWresult = pg_query_params($dbh,"select \"Name\", station, \"TimePeriod\", user_id, \"RunNum\", datelastrun from models.gw where user_id=$1 and \"RunNum\" = $2", array($userid, $R));
$userRunsGW = pg_fetch_all($GWresult);
pg_free_result($GWresult);

if ($userRunsGW){
echo json_encode ($userRunsGW);
}
else {
$GWresult = pg_query_params($dbh,"select \"Name\", station, \"TimePeriod\", user_id, \"RunNum\", datelastrun from models.gwsaved where user_id=$1 and \"RunNum\" = $2", array($userid, $R));
$userRunsGW = pg_fetch_all($GWresult);
 pg_free_result($GWresult);
 echo json_encode($userRunsGW);
}


?>
