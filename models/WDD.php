<?php
define('NOAUTHENTICATION',true); 
include_once('../../global.php');
global $dbh;
//var_dump($dbh);
//var_dump($_POST);
$userid = $_POST['User']['user_id'];
//echo $userid; 

$WDDresult = pg_query_params($dbh,"select \"Name\", base, maxaccdd, s, k, station, \"TimePeriod\", user_id, \"RunNum\", limits, datelastrun from models.wdd where user_id=$1 order by datelastrun;",  array($userid));
$userRunsWDD = pg_fetch_all($WDDresult);
pg_free_result($WDDresult);

if ($userRunsWDD)
{

 $Run = pg_query_params($dbh, "select MAX(\"RunNum\") from models.wdd where user_id=$1", array($userid));
 $RunNum = pg_fetch_all($Run);
 pg_free_result($Run);
  echo '{"WDDMAX":';
  echo ($RunNum[0]["max"]);
  echo ',';
  echo '"WDD":';
  echo json_encode($userRunsWDD);
  echo '}';
 };


?>
