
<?php 
define('NOAUTHENTICATION',true); 
include_once('../../../../global.php');
global $dbh;

$userid = $_POST['user_id'];
$Name = $_POST['Name'];
error_log(print_r($Name, true)); 




$RADDresult = pg_query_params($dbh,"select \"IPT\", sigma, c from models.\"RADDsaved\" where user_id=$1 and \"Name\" = $2", array($userid, $Name));
$userRADD = pg_fetch_all($RADDresult);
pg_free_result($RADDresult);
error_log(print_r($userRADD, true)); 
echo json_encode($userRADD);