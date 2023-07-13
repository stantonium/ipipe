<?php
define('NOAUTHENTICATION',true); 
include_once('../../global.php');
global $dbh;
$ModelSource = $_POST['ModelSource'];
$modelName = $_POST['modelName'];
$weathersource = $_POST['weathersource'];
$params = $_POST['params'];
$PeriodBegin = $_POST['PeriodBegin'];
$PeriodEnd = $_POST['PeriodEnd'];
$selectedStation = $_POST['selectedStation'];
error_log('ThirdParty.php');
error_log($ModelSource);
$start_date = str_replace("-","",$PeriodBegin);
#$start_date = str_replace(substr($start_date,-4),'0101',$start_date);
$end_date = str_replace("-","",$PeriodEnd);
#$end_date = str_replace(substr($end_date,-4),'1231',$end_date);
$year = substr($start_date,0,4);
error_log($year);
$dbstation = $year . $selectedStation;
error_log($selectedStation);
error_log($start_date);
error_log($end_date);
#$result = pg_query_params($dbh,'select * from weather_data.isd_stations_used where station_id =$1', array($_POST['station_id']));
$query_string = 'select * from weather_data."' . $dbstation . '" where utc_date>=' . $start_date . ' and utc_date<=' . $end_date;
$result = pg_query($dbh,$query_string);
if ($result){
$station_data = pg_fetch_all($result);
pg_free_result($result);
}

else {
    error_log('Call Brians code to get the weather');
    $command = 'python3 ./ThirdPartyModels/NCSU/getWeather.py';
    exec($command, $out);
    $station_data=$out;
}

$userweather = json_encode($station_data);
error_log($modelName);
error_log($params);
//error_log($userweather);
error_log($query_string);
$params = str_replace("{","",$params);

if ($ModelSource =='TAMU'){
    $params = '{"Model":["Chappell ThermoRegulation Model","'.$modelName.'"],'.$params;  
} else {
    $params = '{"Model":"'.$modelName.'",'.$params;
} 
if ($userweather){
    $weatherdatafile = './ThirdPartyModels/currentrun/weather.json';
    $paramfile = './ThirdPartyModels/currentrun/params.json';
    file_put_contents($paramfile, $params);
    file_put_contents($weatherdatafile, $userweather);
    if ($ModelSource == 'NCSU'){
    $command = 'python3 ./ThirdPartyModels/NCSU/runCurrentModel.py ';
    }else if($ModelSource =='TAMU'){
    $command = 'python3 ./ThirdPartyModels/TAMU/runCurrentModel.py';
    } 
} 

error_log($command);
exec($command, $out);
error_log(print_r($out,TRUE));
echo implode('',$out);
?>
