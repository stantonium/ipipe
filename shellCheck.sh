#!/bin/sh

a=0

while [ $a -lt 24 ]
do
    $band = '/var/www/html/wgrib2 -verf /var/www/html/data/20210316/urma2p5.t' + $a + 'z.2dvaranl_ndfd.grb2_wexp'
   echo $band 
   a=`expr $a + 1`
done