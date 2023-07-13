<?php
define('NOAUTHENTICATION',true); 
include_once('../../global.php');
global $dbh;
//var_dump($dbh);
//var_dump($_POST);
$userid = $_POST['User']['user_id'];
$R = $_POST['R'];

$TDRresult = pg_query_params($dbh,"select \"Name\", c, \"PTMIN\", \"PTMAX\",\"PTOPT\",\"OTD\", station, \"TimePeriod\", user_id, \"RunNum\",  datelastrun, \"RunNum\", datelastrun from models.tdr where user_id=$1 and \"RunNum\" = $2", array($userid,$R));
$userRunsTDR = pg_fetch_all($TDRresult);
pg_free_result($TDRresult);

if ($userRunsTDR)
 { echo json_encode($userRunsTDR);
}
else {
 $TDRresult = pg_query_params($dbh, "select \"Name\", c, \"PTMIN\", \"PTMAX\",\"PTOPT\",\"OTD\", station, \"TimePeriod\", user_id, \"RunNum\",  datelastrun  from models.tdrsaved where user_id=$1 and \"RunNum\" = $2", array($userid, $R));
 $userRunsTDR = pg_fetch_all($TDRresult);
pg_free_result($TDRresult);
if ($userRunsTDR)
 { echo json_encode($userRunsTDR);
}else {
 $TDRresult = pg_query_params($dbh, "select \"Name\", c, \"PTMIN\", \"PTMAX\",\"PTOPT\",\"OTD\", station, \"TimePeriod\", user_id, \"RunNum\",  datelastrun  from models.tdrsaved where user_id=$1 and \"Name\" = $2", array($userid, $R));
 $userRunsTDR = pg_fetch_all($TDRresult);
pg_free_result($TDRresult);
echo json_encode($userRunsTDR);
}}
?>
