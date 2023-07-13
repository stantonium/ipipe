<?php
define('NOAUTHENTICATION',true);
include_once('../global.php');
global $dbh;
error_log("GetStationData.php");
error_log(print_r($_POST, true));
#No matter what the dates are we return the whole year to the clients cache
$start_date = str_replace("-","",$_POST['start_date']);
$start_date = str_replace(substr($start_date,-4),'0101',$start_date);
$end_date = str_replace("-","",$_POST['end_date']);
$end_date = str_replace(substr($end_date,-4),'1231',$end_date);
$year = substr($start_date,0,4);
error_log($year);
$dbstation = $year . $_POST['station_id'];
error_log($_POST['station_id']);
error_log($start_date);
error_log($end_date);
#$result = pg_query_params($dbh,'select * from weather_data.isd_stations_used where station_id =$1', array($_POST['station_id']));
$query_string = 'select * from weather_data."' . $dbstation . '" where utc_date>=' . $start_date . ' and utc_date<=' . $end_date;
$result = pg_query($dbh,$query_string);
$station_data = pg_fetch_all($result);
echo json_encode($station_data);
?>
