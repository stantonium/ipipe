<?php
define('NOAUTHENTICATION',true);
include_once('../global.php');
global $dbh;
error_log("FindStation.php");
error_log($_POST['station_id']);

$result = pg_query_params($dbh,'select * from weather_data.isd_stations_used where station_id =$1', array($_POST['station_id']));
$used_station = pg_fetch_all($result);
pg_free_result($result);
#error_log(print_r($used_station,true));
echo json_encode($used_station);
?>
