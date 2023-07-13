
import os
import numpy as np
import shutil

directory =  '/var/www/html/weathermodeling/weathermodelingapp/data/states/Texas'
for filename in os.listdir(directory):
    original = '/var/www/html/weathermodeling/weathermodelingapp/data/states/Texas/' + filename
    ## panhandle
    if filename in ('Armstrong.geojson', 'Briscoe.geojson', 'Carson.geojson', 'Castro.geojson', 'Childress.geojson', 'Collingsworth.geojson', 'Dallam.geojson', 'Deaf Smith.geojson', 'Donley.geojson', 'Gray.geojson', 'Hall.geojson', 'Hansford.geojson', 'Hartley.geojson', 'Hemphill.geojson', 'Hutchinson.geojson', 'Lipscomb.geojson', 'Moore.geojson', 'Ochiltree.geojson', 'Oldham.geojson', 'Parmer.geojson', 'Potter.geojson', 'Randall.geojson', 'Roberts.geojson', 'Sherman.geojson', 'Swisher.geojson', 'Wheeler.geojson'): 
        destination = ('/var/www/html/weathermodeling/weathermodelingapp/data/states/panhandle_texas')
        shutil.move(original, destination)
        print(filename + " was put in panhandle")
    ## west
    elif filename in ('Coke.geojson', 'Concho.geojson','Crockett.geojson','Irion.geojson','Kimble.geojson','Mason.geojson','McCulloch.geojson','Menard.geojson','Reagan.geojson','Schleicher.geojson','Sterling.geojson','Sutton.geojson','Tom Green.geojson','Andrews.geojson','Borden.geojson','Crane.geojson','Dawson.geojson','Ector.geojson','Gaines.geojson','Glasscock.geojson','Howard.geojson','Loving.geojson','Martin.geojson','Midland.geojson','Pecos.geojson','Reeves.geojson','Terrell.geojson','Upton.geojson','Ward.geojson','Winkler.geojson','Brewster.geojson','Culberson.geojson','El Paso.geojson','Hudspeth.geojson','Jeff Davis.geojson','Presidio.geojson','Bailey.geojson','Cochran.geojson','Crosby.geojson','Dickens.geojson','Floyd.geojson','Garza.geojson','Hale.geojson','Hockley.geojson','King.geojson','Lamb.geojson','Lubbock.geojson','Lynn.geojson','Motley.geojson','Terry.geojson','Yoakum.geojson','Brown.geojson','Callahan.geojson','Coleman.geojson','Comanche.geojson','Eastland.geojson','Fisher.geojson','Haskell.geojson','Jones.geojson','Kent.geojson','Knox.geojson','Mitchell.geojson','Nolan.geojson','Runnels.geojson','Scurry.geojson','Shackelford.geojson','Stephens.geojson','Stonewall.geojson','Taylor.geojson','Throckmorton.geojson'):
        destination = ('/var/www/html/weathermodeling/weathermodelingapp/data/states/west_texas')
        shutil.move(original, destination)
        print(filename + " was put in west")
    ## north
    elif filename in ('Collin.geojson', 'Dallas.geojson', 'Denton.geojson', 'Ellis.geojson', 'Erath.geojson', 'Hood.geojson', 'Hunt.geojson', 'Johnson.geojson', 'Kaufman.geojson', 'Navarro.geojson', 'Palo Pinto.geojson', 'Parker.geojson', 'Rockwall.geojson', 'Somervell.geojson', 'Tarrant.geojson', 'Wise.geojson', 'Archer.geojson', 'Baylor.geojson', 'Clay.geojson', 'Cottle.geojson', 'Foard.geojson', 'Hardeman.geojson', 'Jack.geojson', 'Montague.geojson', 'Wichita.geojson', 'Wilbarger.geojson', 'Young.geojson', 'Cooke.geojson', 'Fannin.geojson', 'Grayson.geojson'):
        destination = ('/var/www/html/weathermodeling/weathermodelingapp/data/states/north_texas')
        shutil.move(original, destination)
        print(filename + " was put in north")
    ## central
    elif filename in ('Brazos.geojson', 'Burleson.geojson', 'Grimes.geojson', 'Leon.geojson', 'Madison.geojson', 'Robertson.geojson', 'Washington.geojson', 'Bastrop.geojson', 'Blanco.geojson', 'Burnet.geojson', 'Caldwell.geojson', 'Fayette.geojson', 'Hays.geojson', 'Lee.geojson', 'Llano.geojson', 'Travis.geojson', 'Williamson.geojson', 'Bell.geojson', 'Coryell.geojson', 'Hamilton.geojson', 'Lampasas.geojson', 'Milam.geojson', 'Mills.geojson', 'San Saba.geojson', 'Bosque.geojson', 'Falls.geojson', 'Freestone.geojson', 'Hill.geojson', 'Limestone.geojson', 'McLennan.geojson'):
        destination = ('/var/www/html/weathermodeling/weathermodelingapp/data/states/central_texas')
        shutil.move(original, destination)
        print(filename + " was put in central")
    ## south
    elif filename in ('Atascosa.geojson', 'Bandera.geojson', 'Bexar.geojson', 'Comal.geojson', 'Frio.geojson', 'Gillespie.geojson', 'Guadalupe.geojson', 'Karnes.geojson', 'Kendall.geojson', 'Kerr.geojson', 'Medina.geojson', 'Wilson.geojson', 'Calhoun.geojson', 'DeWitt.geojson', 'Goliad.geojson', 'Gonzales.geojson', 'Jackson.geojson', 'Lavaca.geojson', 'Victoria.geojson', 'Aransas.geojson', 'Bee.geojson', 'Brooks.geojson', 'Duval.geojson', 'Jim Wells.geojson', 'Kenedy.geojson', 'Kleberg.geojson', 'Live Oak.geojson', 'McMullen.geojson', 'Nueces.geojson', 'Refugio.geojson', 'San Patricio.geojson', 'Cameron.geojson', 'Hidalgo.geojson', 'Willacy.geojson', 'Jim Hogg.geojson', 'Starr.geojson', 'Webb.geojson', 'Zapata.geojson', 'Dimmit.geojson', 'Edwards.geojson', 'Kinney.geojson', 'La Salle.geojson', 'Maverick.geojson', 'Real.geojson', 'Uvalde.geojson', 'Val Verde.geojson', 'Zavala.geojson'):
        destination = ('/var/www/html/weathermodeling/weathermodelingapp/data/states/south_texas')
        shutil.move(original, destination)
        print(filename + " was put in south")
    ## east
    elif filename in ('Bowie.geojson', 'Cass.geojson', 'Delta.geojson', 'Franklin.geojson', 'Hopkins.geojson', 'Lamar.geojson', 'Morris.geojson', 'Red River.geojson', 'Titus.geojson', 'Anderson.geojson', 'Camp.geojson', 'Cherokee.geojson', 'Gregg.geojson', 'Harrison.geojson', 'Henderson.geojson', 'Marion.geojson', 'Panola.geojson', 'Rains.geojson', 'Rusk.geojson', 'Smith.geojson', 'Upshur.geojson', 'Van Zandt.geojson', 'Wood.geojson', 'Angelina.geojson', 'Houston.geojson', 'Jasper.geojson', 'Nacogdoches.geojson', 'Newton.geojson', 'Polk.geojson', 'Sabine.geojson', 'San Augustine.geojson', 'San Jacinto.geojson', 'Shelby.geojson', 'Trinity.geojson', 'Tyler.geojson', 'Hardin.geojson', 'Jefferson.geojson', 'Orange.geojson'):
        destination = ('/var/www/html/weathermodeling/weathermodelingapp/data/states/east_texas')
        shutil.move(original, destination)
        print(filename + " was put in east")
    ## gulf coast
    elif filename in ('Austin.geojson', 'Brazoria.geojson', 'Chambers.geojson', 'Colorado.geojson', 'Fort Bend.geojson', 'Galveston.geojson', 'Harris.geojson', 'Liberty.geojson', 'Matagorda.geojson', 'Montgomery.geojson', 'Walker.geojson', 'Waller.geojson', 'Wharton.geojson'):
        destination = ('/var/www/html/weathermodeling/weathermodelingapp/data/states/upper_gulf_coast_texas')
        shutil.move(original, destination)
        print(filename + " was put in gulf coast")
    else: 
        print(filename + "________________________was not placed_______________________")
    


