<?php
define('NOAUTHENTICATION',true); 
include_once('../../global.php');
global $dbh;
//var_dump($dbh);
//var_dump($_POST);
$userid = $_POST['User']['user_id'];
//error_log ($userid); 
//error_log('dude');
$DDresult = pg_query_params($dbh,"select \"Name\", base, maxaccdd, station, \"TimePeriod\", user_id, \"RunNum\", limits, datelastrun from models.dd where user_id=$1 order by datelastrun;", array($userid));
$userRunsDD = pg_fetch_all($DDresult);
pg_free_result($DDresult);

if ($userRunsDD)
{
	
$Run = pg_query_params($dbh, "select MAX(\"RunNum\") from models.dd where user_id=$1", array($userid));
$RunNum = pg_fetch_all($Run);
 echo '{"DDMAX":';
 echo ($RunNum[0]["max"]);
 echo ',';
 echo '"DD":'; 
 echo json_encode($userRunsDD);
 echo '}';
}
?>
