<?php
define('NOAUTHENTICATION',true); 
include_once('../../global.php');
global $dbh;
//var_dump($dbh);
//var_dump($_POST);
$userid = $_POST['User']['user_id'];
//echo $userid; 

$LLDDresult = pg_query_params($dbh,"select \"Name\", base, maxaccdd, k, station, \"TimePeriod\",  user_id, \"RunNum\", limits, datelastrun from models.lldd where user_id=$1 order by datelastrun;", array($userid));
$userRunsLLDD = pg_fetch_all($LLDDresult);
pg_free_result($LLDDresult);

if ($userRunsLLDD)
{

 $Run = pg_query_params($dbh, "select MAX(\"RunNum\") from models.lldd where user_id=$1", array($userid));
 $RunNum = pg_fetch_all($Run);  
 pg_free_result($Run);
 
  echo '{"LLDDMAX":';
  echo ($RunNum[0]["max"]);
  echo ',';
  echo '"LLDD":';
  echo json_encode($userRunsLLDD);
  echo '}';
 };
?>
