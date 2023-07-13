<?php
define('NOAUTHENTICATION',true);
include_once('../global.php');
global $dbh;
##error_log($_POST['coordinates']);
##$cords = $_POST['coordinates'];
##$cords = explode(",", $cords);
##$lon = $cords[0];
##$lat = $cords[1];
exec('cat /var/www/html/data/todaysband.txt', $todaysband);
##error_log($todaysband[0]);
$todaysband = strval($todaysband[0]);
##error_log($todaysband);
for ($x = 0; $x <= 48; $x++) {
    if ($x < 10) {
        $y = strval($x);
        $y = '0' . $y;
        $command = '/var/www/html/wgrib2 -verf /var/www/html/data/hrrr.t06z.wrfsfcf'.$y.'.grib2 ';

    }else{
        $command = '/var/www/html/wgrib2 -verf /var/www/html/data/hrrr.t06z.wrfsfcf'.$x.'.grib2 ';
    }
    error_log($command);
    $out=[];
    exec($command, $out);
    error_log(print_r($out,true));
    foreach ($out as $v) {
        ##error_log("Current value: $v.\n");
        ##error_log(gettype($v));
         $temp = explode(":", $v);
         ##error_log(gettype($temp[0]));
         if (strcmp($temp[0], $todaysband) == 0) {
             $timeStamp[] = $temp[2];
            ##error_log($x);
        }
    ##error_log($out[3]);
}}
#error_log(print_r($timeStamp,true));
echo json_encode($timeStamp);
?>
