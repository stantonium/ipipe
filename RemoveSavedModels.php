<?php 
define('NOAUTHENTICATION',true); 
include_once('../global.php');
global $dbh;
error_log($_POST['ModelIndex']);
error_log($_POST['RunNum']);

if ($_POST['ModelIndex'] == 0){
$result = pg_query_params($dbh,' delete from models.gwsaved where "RunNum" = $1 and user_id =$2 ', array($_POST['RunNum'],$_POST['user_id']));
pg_free_result($result);
}

if ($_POST['ModelIndex'] == 1){
$result = pg_query_params($dbh,' delete from models.ddsaved where "RunNum" = $1 and user_id =$2 ', array($_POST['RunNum'],$_POST['user_id']));
pg_free_result($result);
}

if ($_POST['ModelIndex'] == 2){
$result = pg_query_params($dbh,' delete from models.lddsaved where "RunNum" = $1 and user_id =$2 ', array($_POST['RunNum'],$_POST['user_id']));
pg_free_result($result);
}

if ($_POST['ModelIndex'] == 3){
$result = pg_query_params($dbh,' delete from models.llddsaved where "RunNum" = $1 and user_id =$2 ', array($_POST['RunNum'],$_POST['user_id']));
pg_free_result($result);
}

if ($_POST['ModelIndex'] == 4){
$result = pg_query_params($dbh,' delete from models.wddsaved where "RunNum" = $1 and user_id =$2 ', array($_POST['RunNum'],$_POST['user_id']));
pg_free_result($result);
}

if ($_POST['ModelIndex'] == 5){
$result = pg_query_params($dbh,' delete from models.tdrsaved where "RunNum" = $1 and user_id =$2 ', array($_POST['RunNum'],$_POST['user_id']));
pg_free_result($result);
}
?>

