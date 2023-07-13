<?php
define('NOAUTHENTICATION',true); 
include_once('../../global.php');
global $dbh;
error_log('CARTgetRun.php');
//var_dump($dbh);
//var_dump($_POST);
$userid = $_POST['User']['user_id'];
$R = $_POST['R'];
 
$CARTresult = pg_query_params($dbh,"select \"Name\", station, \"TimePeriod\", user_id, \"RunNum\",  datelastrun from models.cart where user_id=$1 and \"RunNum\" = $2", array($userid, $R));
$userRunsCART = pg_fetch_all($CARTresult);
pg_free_result($CARTresult);

if ($userRunsCART) {
echo json_encode($userRunsCART);
}
else {
$CARTresult = pg_query_params($dbh,"select \"Name\",station, \"TimePeriod\", user_id, \"RunNum\", datelastrun from models.cartsaved where user_id=$1 and \"RunNum\" = $2", array($userid, $R));
$userRunsCART = pg_fetch_all($CARTresult);
pg_free_result($CARTresult);
if ($userRunsCART){
echo json_encode($userRunsCART);
}else{
$CARTresult = pg_query_params($dbh,"select \"Name\", station, \"TimePeriod\", user_id, \"RunNum\", datelastrun from models.cartsaved where user_id=$1 and \"Name\" = $2", array($userid, $R));
$userRunsCART = pg_fetch_all($CARTresult);
pg_free_result($CARTresult);
echo json_encode($userRunsCART);
}}
?>
