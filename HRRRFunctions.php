<?php
define('NOAUTHENTICATION',true);
include_once('../global.php');
global $dbh;
error_log($_POST['coordinates']);
$cords = $_POST['coordinates'];
$cords = explode(",", $cords);
$lon = $cords[0];
$lat = $cords[1];
//$cordcommand = 'python3 /var/www/html/weathermodeling/weathermodelingapp/python/GetRectangleCoordinates.py ' . $lat .' '. $lon;
//exec($cordcommand, $corners);
//error_log(print_r($corners,true));
exec('cat /var/www/html/data/todaysband.txt', $todaysband);
//error_log($todaysband[0]);
$todaysband = strval($todaysband[0]);
//error_log($todaysband);
for ($x = 0; $x <= 48; $x++) {
    if ($x < 10) {
        $y = strval($x);
        $y = '0' . $y;
        $command = 'gdallocationinfo -valonly -b '.$todaysband.' -wgs84 /var/www/html/data/hrrr.t06z.wrfsfcf'.$y.'.grib2 ' . $lon .' '. $lat;

    }else{
    $command = 'gdallocationinfo -valonly -b '.$todaysband.' -wgs84 /var/www/html/data/hrrr.t06z.wrfsfcf'.$x.'.grib2 ' . $lon .' '. $lat;
    }
    error_log($command);
    exec($command, $out);
    
    ##error_log($out[3]);
  }
  ##$temp = explode(":", $out[3]);
    ##$temp = 'Hour:'. strval($x) . ' Temperature:' . $temp[1];
    ##$json = $json . $temp;
    ##error_log($temp);
    ##error_log(print_r($out,true));
echo json_encode($out);
##echo json_encode($corners);
?>
