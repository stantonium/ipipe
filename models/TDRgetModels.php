<?php
define('NOAUTHENTICATION',true); 
include_once('../../global.php');
global $dbh;
//var_dump($dbh);
//var_dump($_POST);
$userid = $_POST['User']['user_id'];
//echo $userid; 

$TDRresult = pg_query_params($dbh,"select \"Name\", c, \"PTMIN\", \"PTMAX\",\"PTOPT\",\"OTD\", station, \"TimePeriod\", user_id, \"RunNum\",  datelastrun from models.tdrsaved where user_id=$1;", array($userid));
$userRunsTDR = pg_fetch_all($TDRresult);
pg_free_result($TDRresult);

if ($userRunsTDR)
 {

 $Run = pg_query_params($dbh, "select MAX(\"RunNum\") from models.tdrsaved where user_id=$1", array($userid));
 $RunNum = pg_fetch_all($Run);
  echo '{"TDRMAX":';
  echo ($RunNum[0]["max"]);
  echo ',';
  echo '"TDR":';
  echo json_encode($userRunsTDR);
  echo '}';
 };
?>
