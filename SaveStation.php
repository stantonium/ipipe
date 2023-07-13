<?php
define('NOAUTHENTICATION',true);
include_once('../global.php');
global $dbh;
error_log("SaveStation.php");
$station_id = $_POST['station_id'];
error_log($station_id);
$name = $_POST['name'];
error_log($name);
$latitude = $_POST['latitude'];
$longitude = $_POST['longitude'];
$elevation = $_POST['elevation'];
$year = $_POST['year'];
error_log($elevation);
error_log($year);
$dbstation = $year . $station_id;
error_log($dbstation);
$result = pg_query_params($dbh,'select * from weather_data.isd_stations_used where station_id =$1', array($dbstation));
$used_station = pg_fetch_all($result);
pg_free_result($result);

error_log('Used station is:');
error_log((print_r($used_station,TRUE)));

if (empty($used_station)){
    error_log('Used station is empty!');
pg_insert($dbh,'weather_data.isd_stations_used', $_POST);}
?>
