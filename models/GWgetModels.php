<?php
define('NOAUTHENTICATION',true); 
include_once('../../global.php');
global $dbh;
//var_dump($dbh);
//var_dump($_POST);
$userid = $_POST['User']['user_id'];
//echo $userid; 

$GWresult = pg_query_params($dbh,"select \"Name\", station, \"TimePeriod\", user_id, \"RunNum\", datelastrun from models.gwsaved where user_id=$1;", array($userid));
$userRunsGW = pg_fetch_all($GWresult);
pg_free_result($GWresult);

if ($userRunsGW)
{
	
$Run = pg_query_params($dbh, "select MAX(\"RunNum\") from models.gwsaved where user_id=$1", array($userid));
$RunNum = pg_fetch_all($Run);
 echo '{"GWMAX":';
 echo ($RunNum[0]["max"]);
 echo ',';
 echo '"GW":'; 
 echo json_encode($userRunsGW);
 echo '}';
};


?>
