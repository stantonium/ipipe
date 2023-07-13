<?php
define('NOAUTHENTICATION',true);
include_once('../global.php');
global $dbh;
error_log($_POST['state']);
$state = $_POST['state'];
error_log($state);
error_log(gettype($state));
###Make sure we change this file path on production when we deploy!!!
$command = 'ls /var/www/html/weathermodeling/weathermodelingapp/data/states/\''.$state.'\'';
error_log($command);
    ##error_log($command);
exec($command, $statecounties);
##error_log($statecounties);
error_log(print_r($statecounties,true));
    ##error_log($out[3]);
#error_log(print_r($timeStamp,true));
echo json_encode($statecounties);
?>
