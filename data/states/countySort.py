### get data and save files for each county in TX
##ir_path = os.path.dirname(os.path.realpath("NAME_2_0.geojson"))
import os
import numpy as np
import shutil
num = 3191
while num < 3234:
    numLit = str(num)
    County = open('/var/www/html/weathermodeling/weathermodelingapp/data/tl_2020_us_county/COUNTYNS_' + numLit + '.geojson')
    with County as file:
        dataLine = file.readlines()[5]
    cut = dataLine.split('"')
    countyname = cut[25]
    statefp = int(cut[9])
    statefpPrint = str(statefp)
    ##print(countyname)
   ## print(statefp)
    
    ##updates the file path with county name
    os.rename(r'/var/www/html/weathermodeling/weathermodelingapp/data/tl_2020_us_county/COUNTYNS_' + numLit + '.geojson',r'/var/www/html/weathermodeling/weathermodelingapp/data/tl_2020_us_county/' + countyname + '.geojson')
    updatedname = '/var/www/html/weathermodeling/weathermodelingapp/data/tl_2020_us_county/' + countyname + '.geojson'
    
    ## gives state name from stateFP
    def fp_to_name(StateName):
        switcher = {
            1: "Alabama",
            2:"Alaska",
            4: "Arizona",
            5: "Arkansas",
            6: "California",
            8: "Colorado",
            9: "Connecticut",
            10: "Delaware",
            11:	"na",
            12: "Florida",
            13: "Georgia",
            15:	"Hawaii",
            16:	"Idaho",
            17:	"Illinois",
            18:	"Indiana",
            19:	"Iowa",
            20:	"Kansas",
            21: "Kentucky",
            22:	"Louisiana",
            23:	"Maine",
            24: "Maryland",
            25: "Massachusetts",
            26: "Michigan",
            27: "Minnesota",
            28: "Mississippi",
            29: "Missouri",
            30: "Montana",
            31: "Nebraska",
            32:	"Nevada",
            33: "NewHampshire",
            34:	"NewJersey",
            35: "NewMexico",
            36:	"NewYork",
            37:	"NorthCarolina",
            38:	"NorthDakota",
            39:	"Ohio",
            40: "Oklahoma",
            41: "Oregon",
            42:	"Pennsylvania",
            44:	"RhodeIsland",
            45: "SouthCarolina",
            46:	"SouthDakota",
            47:	"Tennessee",
            48:	"Texas",
            49:	"Utah",
            50:	"Vermont",
            51:	"Virginia",
            53:	"Washington",
            54:	"WestVirginia",
            55:	"Wisconsin",
            56:	"Wyoming",
            60:	"na",
            66:	"na",
            69:	"na",
            72:	"na",
            78:	"na"
        }
        return switcher.get(StateName, "na")
    SN = fp_to_name(statefp)
    ##print(SN)
    if not (SN == "na"):
        destination = ('/var/www/html/weathermodeling/weathermodelingapp/data/states/' + SN)
        shutil.move(updatedname, destination)
        print(countyname + " was moved to " + SN + " " + numLit)
    else:
        print("___________________" + countyname + " was not moved. State fp = " + numLit + "_____________")


    
    num = num + 1

