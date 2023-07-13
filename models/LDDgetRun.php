<?php
define('NOAUTHENTICATION',true); 
include_once('../../global.php');
global $dbh;
//var_dump($dbh);
//var_dump($_POST);
$userid = $_POST['User']['user_id'];
$R = $_POST['R'];

$LDDresult = pg_query_params($dbh,"select \"Name\", base, maxaccdd, k, station,  \"TimePeriod\", user_id, \"RunNum\", limits, datelastrun, \"RunNum\", limits, datelastrun, lddfacc from models.ldd where user_id=$1 and \"RunNum\" = $2", array($userid, $R));
$userRunsLDD = pg_fetch_all($LDDresult);
pg_free_result($LDDresult);

if ($userRunsLDD)
{ echo json_encode($userRunsLDD);
}
else{
$LDDresult = pg_query_params($dbh,"select \"Name\", base, maxaccdd, lddfacc, k, station, \"TimePeriod\", user_id, \"RunNum\", limits, datelastrun from models.lddsaved where user_id=$1 and \"RunNum\" = $2", array($userid, $R));
$userRunsLDD = pg_fetch_all($LDDresult);
pg_free_result($LDDresult);
if($userRunsLDD)
{echo json_encode($userRunsLDD);
}else{
$LDDresult = pg_query_params($dbh,"select \"Name\", base, maxaccdd, lddfacc, k, station, \"TimePeriod\", user_id, \"RunNum\", limits, datelastrun from models.lddsaved where user_id=$1 and \"Name\" = $2", array($userid, $R));
$userRunsLDD = pg_fetch_all($LDDresult);
pg_free_result($LDDresult);
echo json_encode($userRunsLDD);
}}
?>
