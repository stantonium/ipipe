<?php
define('NOAUTHENTICATION',true); 
include_once('../../global.php');
global $dbh;
error_log('DDgetRun.php');
//var_dump($dbh);
//var_dump($_POST);
$userid = $_POST['User']['user_id'];
$R = $_POST['R'];
 
$DDresult = pg_query_params($dbh,"select \"Name\", base, maxaccdd, station, \"TimePeriod\", user_id, \"RunNum\", limits, datelastrun from models.dd where user_id=$1 and \"RunNum\" = $2", array($userid, $R));
$userRunsDD = pg_fetch_all($DDresult);
pg_free_result($DDresult);

if ($userRunsDD) {
echo json_encode($userRunsDD);
}
else {
$DDresult = pg_query_params($dbh,"select \"Name\", base, maxaccdd, station, \"TimePeriod\", user_id, \"RunNum\", limits, datelastrun, weathersource from models.ddsaved where user_id=$1 and \"RunNum\" = $2", array($userid, $R));
$userRunsDD = pg_fetch_all($DDresult);
pg_free_result($DDresult);
if ($userRunsDD){
echo json_encode($userRunsDD);
}else{
$DDresult = pg_query_params($dbh,"select \"Name\", base, maxaccdd, station, \"TimePeriod\", user_id, \"RunNum\", limits, datelastrun, weathersource from models.ddsaved where user_id=$1 and \"Name\" = $2", array($userid, $R));
$userRunsDD = pg_fetch_all($DDresult);
pg_free_result($DDresult);
echo json_encode($userRunsDD);
}}
?>
