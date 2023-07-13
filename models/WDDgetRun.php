<?php
define('NOAUTHENTICATION',true); 
include_once('../../global.php');
global $dbh;
//var_dump($dbh);
//var_dump($_POST);
$userid = $_POST['User']['user_id'];
$R = $_POST['R'];

$WDDresult = pg_query_params($dbh,"select \"Name\", base, maxaccdd, s, k, station, \"TimePeriod\", user_id, \"RunNum\", limits, datelastrun, \"RunNum\", limits, datelastrun from models.wdd where user_id=$1 and \"RunNum\" = $2",  array($userid, $R));
$userRunsWDD = pg_fetch_all($WDDresult);
pg_free_result($WDDresult);

if ($userRunsWDD)
{ echo json_encode ($userRunsWDD);
}
else {
$WDDresult = pg_query_params($dbh,"select \"Name\", base, maxaccdd, s, k, station, \"TimePeriod\", user_id, \"RunNum\", limits, datelastrun from models.wddsaved where user_id=$1 and \"RunNum\" = $2", array($userid, $R));
$userRunsWDD = pg_fetch_all($WDDresult);
pg_free_result($WDDresult);
if($userRunsWDD){
  echo json_encode($userRunsWDD);
 }else{
$WDDresult = pg_query_params($dbh,"select \"Name\", base, maxaccdd, s, k, station, \"TimePeriod\", user_id, \"RunNum\", limits, datelastrun from models.wddsaved where user_id=$1 and \"Name\" = $2", array($userid, $R));
$userRunsWDD = pg_fetch_all($WDDresult);
pg_free_result($WDDresult);
echo json_encode($userRunsWDD);
}}
?>
