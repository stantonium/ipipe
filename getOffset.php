<?php 
include 'TimezoneMapper.php';

 //   $_POST['LAT'] = $argv[1];
 //   $_POST['LONG'] = $argv[2];
 //   $_POST['DATE'] = $argv[3];
   // $JsonWeather = file_get_contents("/var/www/html/weathermodeling/weathermodelingapp/data/windowsZones.json");
//$JsonWeather = file_get_contents("/var/www/html/weathermodeling/weathermodelingapp/data/windowsZones.json");
//}
//else{
//    $JsonWeather = file_get_contents("./data/windowsZones.json");
//}

//error_log($_POST['LAT']);
//error_log($_POST['LONG']);
//error_log($_POST['DATE']);


$tz = trim((TimezoneMapper::latLngToTimezoneString($_POST['LAT'], $_POST['LONG'])));
error_log($tz);
//$dtz = new DateTimeZone($tz);
//$UTC = new DateTimeZone("UTC");

date_default_timezone_set("UTC");

//$dtz = new DateTime("now", $dtz);
//$UTC = new DateTime("now", $UTC);
$offset = timezone_offset_get(timezone_open($tz), new DateTime());
$offset = $offset/3600;
//error_log($offset);
//error_log("This was the offset");
//error_log(gettype($tz));
//error_log($JsonWeather);
//$JsonWeather2 = json_decode($JsonWeather,true);
//$Jlength = count($JsonWeather2["supplemental"]["windowsZones"]["mapTimezones"]);
//error_log($Jlength);
//for ($x=0; $x <$Jlength; $x++){
//$wz =trim($JsonWeather2["supplemental"]["windowsZones"]["mapTimezones"][$x]["mapZone"]["_type"]);
//error_log($wz);

// Polyfill for PHP 4 - PHP 7, safe to utilize with PHP 8

//if (!function_exists('str_contains')) {
//    function str_contains (string $haystack, string $needle)
//    {
//        return empty($needle) || strpos($haystack, $needle) !== false;
//    }
//}

//if (str_contains($wz,$tz)){
 //   $wz = trim($JsonWeather2["supplemental"]["windowsZones"]["mapTimezones"][$x]["mapZone"]["_other"]);
 //   error_log($wz);   
    echo($offset);
    if ($offset == -6) {echo(",90,America/Chicago");}
    elseif($offset == -4) {echo(",75,America/New_York");}
    elseif($offset == -5) {echo(",75,America/New_York");}
    elseif($offset == -7) {echo(",105,America/Denver");}
    elseif($offset == -8) {echo(",120,America/Los_Angeles");}
    elseif($offset == 1){echo(",0,Europe/Madrid");}
//}
//}





?>

