<?php
define('NOAUTHENTICATION',true); 
include_once('../../global.php');
global $dbh;
//var_dump($dbh);
//var_dump($_POST);
$userid = $_POST['User']['user_id'];
$R = $_POST['R'];

$LLDDresult = pg_query_params($dbh,"select \"Name\", base, maxaccdd, llddfacc, k, station, \"TimePeriod\",  user_id, \"RunNum\", limits, datelastrun, \"RunNum\", limits, datelastrun from models.lldd where user_id=$1 and \"RunNum\" = $2", array($userid, $R));
$userRunsLLDD = pg_fetch_all($LLDDresult);
pg_free_result($LLDDresult);

if ($userRunsLLDD){
echo json_encode($userRunsLLDD);
}
else{
$LLDDresult = pg_query_params($dbh,"select \"Name\", base, maxaccdd, llddfacc, k, station, \"TimePeriod\", user_id, \"RunNum\", limits, datelastrun from models.llddsaved where user_id=$1 and \"RunNum\" = $2", array($userid, $R));
 $userRunsLLDD = pg_fetch_all($LLDDresult);
pg_free_result ($LLDDresult);
if ($userRunsLLDD){
  echo json_encode($userRunsLLDD);
 }else{
$LLDDresult = pg_query_params($dbh,"select \"Name\", base, maxaccdd, llddfacc, k, station, \"TimePeriod\", user_id, \"RunNum\", limits, datelastrun from models.llddsaved where user_id=$1 and \"Name\" = $2", array($userid, $R));
 $userRunsLLDD = pg_fetch_all($LLDDresult);
pg_free_result ($LLDDresult);
echo json_encode($userRunsLLDD);
}}
?>
