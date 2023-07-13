import json
import requests
import geojson

infile = open('ISD_US_weather_Stations.geojson','r');

data = geojson.load(infile);

periodBegin = "2020-01-01"
periodEnd = "2020-01-10"


for i in range(len(data['features'])):
    usaf = str(data['features'][i]['properties']['USAF'])
    wban = str(data['features'][i]['properties']['WBAN'])
    if usaf != "999999" and wban != "99999":
        stationID = usaf + wban
        query = "https://www.ncei.noaa.gov/access/services/data/v1?dataset=global-hourly&dataTypes=WND,TMP,DEW,SLP,MA1,KG1,KG2,CH1,CH2,GH1,GG1,GG2,GG3,GG4,GG5,GG6,GJ1,CX1,CX2,CX3,IC1,CW1,AJ1&stations="
        query += stationID + "&units=metric&startDate=" + periodBegin + "&endDate=" + periodEnd + "&format=json"
        response = requests.get(query)
        if response.status_code == 200:
            response = json.loads(response.content.decode('utf-8'));
            for i in response:
                try:
                    print(i["TMP"])
                except:
                    print("TMP didn't work")
                try:
                    print(i["KG1"])
                except:
                    print("KG1 didn't work")
                try:
                    print(i["KG2"])
                except:
                    print("KG2 didn't work")
                try:
                    print(i["CH1"])
                except:
                    print("CH1 didn't work")
                try:
                    print(i["CH2"])
                except:
                    print("CH2 didn't work")
                try:
                    print(i["GH1"])
                except:
                    print("GH1 didn't work")
                try:
                    print(i["GG1"])
                except:
                    print("GG1 didn't work")
                try:
                    print(i["GG2"])
                except:
                    print("GG2 didn't work")
                try:
                    print(i["GG3"])
                except:
                    print("GG3 didn't work")
                try:
                    print(i["GG4"])
                except:
                    print("GG4 didn't work")
                try:
                    print(i["GG5"])
                except:
                    print("GG5 didn't work")
                try:
                    print(i["GG6"])
                except:
                    print("GG6 didn't work")
                try:
                    print(i["GJ1"])
                except:
                    print("GJ1 didn't work")
                try:
                    print(i["CX1"])
                except:
                    print("CX1 didn't work")
                try:
                    print(i["CX2"])
                except:
                    print("CX2 didn't work")
                try:
                    print(i["CX3"])
                except:
                    print("CX3 didn't work")
                try:
                    print(i["IC1"])
                except:
                    print("IC1 didn't work")
                try:
                    print(i["CW1"])
                except:
                    print("CW1 didn't work")
                try:
                    print(i["AJ1"])
                except:
                    print("AJ1 didn't work")


