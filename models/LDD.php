<?php
define('NOAUTHENTICATION',true); 
include_once('../../global.php');
global $dbh;
//var_dump($dbh);
//var_dump($_POST);
$userid = $_POST['User']['user_id'];
//echo $userid; 

$LDDresult = pg_query_params($dbh,"select \"Name\", base, maxaccdd, k, station,  \"TimePeriod\", user_id, \"RunNum\", limits, datelastrun from models.ldd where user_id=$1 order by datelastrun;", array($userid));
$userRunsLDD = pg_fetch_all($LDDresult);
pg_free_result($LDDresult);

if ($userRunsLDD)
{
	
$Run = pg_query_params($dbh, "select MAX(\"RunNum\") from models.ldd where user_id=$1", array($userid));
$RunNum = pg_fetch_all($Run);
 echo '{"LDDMAX":';
 echo ($RunNum[0]["max"]);
 echo ',';
 echo '"LDD":'; 
 echo json_encode($userRunsLDD);
 echo '}';
};
?>
