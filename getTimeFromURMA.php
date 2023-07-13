<?php
define('NOAUTHENTICATION',true);
include_once('../global.php');
global $dbh;
$beginDate = $_POST['beginDate'];
$endDate = $_POST['endDate'];
##error_log($_POST['coordinates']);
##$cords = $_POST['coordinates'];
##$cords = explode(",", $cords);
##$lon = $cords[0];
##$lat = $cords[1];
exec('cat /var/www/html/data/URMAband.txt', $todaysband);
##error_log($todaysband[0]);
$todaysband = strval($todaysband[0]);
##error_log($todaysband);

$currentDate = new DateTime($beginDate);
$endDate = new DateTime($endDate);


while($currentDate < $endDate) {
    $now = $currentDate -> format('Ymd');
for ($x = 0; $x <= 23; $x++) {
    if ($x < 10) {
        $y = strval($x);
        $y = '0' . $y;
        $command = '/var/www/html/wgrib2 -verf /var/www/html/data/'.$now.'/urma2p5.t'.$y.'z.2dvaranl_ndfd.grb2_wexp ';
        //$command = '/var/www/html/wgrib2 -verf /mnt/f/urma/'.$now.'/urma2p5.t'.$y.'z.2dvaranl_ndfd.grb2_wexp ';
    }else{
        $command = '/var/www/html/wgrib2 -verf /var/www/html/data/'.$now.'/urma2p5.t'.$x.'z.2dvaranl_ndfd.grb2_wexp';
        //$command = '/var/www/html/wgrib2 -verf /mnt/f/urma/'.$now.'/urma2p5.t'.$x.'z.2dvaranl_ndfd.grb2_wexp';
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
$currentDate      -> modify('+1 day');

}
error_log(print_r($timeStamp,true));
echo json_encode($timeStamp);
?>
