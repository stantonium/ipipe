<?php
define('NOAUTHENTICATION',true);
include_once('../global.php');
global $dbh;
error_log($_POST['coordinates']);
$cords = $_POST['coordinates'];
$cords = explode(",", $cords);
$lon = $cords[0];
$lat = $cords[1];
$beginDate = $_POST['beginDate'];
$endDate = $_POST['endDate'];
//$cordcommand = 'python3 /var/www/html/weathermodeling/weathermodelingapp/python/GetRectangleCoordinates.py ' . $lat .' '. $lon;
//exec($cordcommand, $corners);
error_log(print_r($beginDate,true));
error_log(print_r($endDate,true));

exec('cat /var/www/html/data/URMAband.txt', $todaysband);
error_log($todaysband[0]);
$todaysband = strval($todaysband[0]);
//error_log($todaysband);

$currentDate = new DateTime($beginDate);
$endDate     = new DateTime($endDate);

while($currentDate < $endDate) {
$now = $currentDate -> format('Ymd');
for ($x = 0; $x <= 23; $x++) {

    if ($x < 10) {
        $y = strval($x);
        $y = '0' . $y;
    //CHANGE THE BELOW COMMAND TP GET THE RIGHT PATH BEFORE PUSHING TO PRODUCTION    
        $command = 'gdallocationinfo -valonly -b '.$todaysband.' -wgs84 /var/www/html/data/' .$now. '/urma2p5.t'.$y.'z.2dvaranl_ndfd.grb2_wexp ' . $lon .' '. $lat;
        //$command = 'gdallocationinfo -valonly -b '.$todaysband.' -wgs84 /mnt/f/urma/' .$now. '/urma2p5.t'.$y.'z.2dvaranl_ndfd.grb2_wexp ' . $lon .' '. $lat;
    }else{
    //$command = 'gdallocationinfo -valonly -b '.$todaysband.' -wgs84 /var/www/html/data/' .$now. '/urma2p5.t' .$x. 'z.2dvaranl_ndfd.grb2_wexp ' . $lon .' '. $lat;
    $command = 'gdallocationinfo -valonly -b '.$todaysband.' -wgs84 /mnt/f/urma/' .$now. '/urma2p5.t' .$x. 'z.2dvaranl_ndfd.grb2_wexp ' . $lon .' '. $lat;  
  }
    #error_log($command);
    exec($command, $out);
    #error_log($out[3]);
  } $currentDate      -> modify('+1 day');

}
 
  ##$temp = explode(":", $out[3]);
    ##$temp = 'Hour:'. strval($x) . ' Temperature:' . $temp[1];
    ##$json = $json . $temp;
    ##error_log($temp);
    ##error_log(print_r($out,true));
error_log(print_r($out, true));
echo json_encode($out);
##echo json_encode($corners);
?>
