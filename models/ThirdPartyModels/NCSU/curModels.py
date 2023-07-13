"""Server side weather models"""
from datetime import datetime as date
import json
import math
#Note these are for Stan's dev machine, make sure commented out in production
#paramspath = '/var/www/html/weathermodeling/weathermodelingapp/models/ThirdPartyModels/currentrun/params.json'
#datapath = '/var/www/html/weathermodeling/weathermodelingapp/models/ThirdPartyModels/currentrun/weather.json'

paramspath = '/var/www/html/weathermodelingapp/models/ThirdPartyModels/currentrun/params.json'
datapath = '/var/www/html/weathermodelingapp/models/ThirdPartyModels/currentrun/weather.json'


def degree_day(filename = paramspath):
    """Degree Day Function"""
    model = open(filename, "r")
    params = json.load(model)
    for p in params:
        params[p] = str(params[p])
    model.close()
    today = date.today()
    today = str(today).replace(' ', '_').replace(':', '-').replace('.', '-')      # need to remove last two replaces on server
    # print(params)
    print('<th>Hourly Temp</th><th>Degree Hour</th><th>Accumulated Degree Hours</th><th>Degree Day</th><th>Accumulated Degree Days</th></tr></thead><tbody>')
    
    daily_str = '<th>Daily Temp</th><th>Degree Day</th><th>Accumulated Degree Days</th></tr></thead><tbody>\n'

    hourCount = 0
    totalTemp = 0

    data = json.load(open(datapath, "r"))
    daily_str = daily_str + '<tr><td>' + data[0]['local_date'] + '</td><td>' + data[0]['day_of_year'] + '</td>'
    adh = 0  
    currDate = data[0]['local_date']
    
    for obsdate in data:
        print('<tr><td>')
        print(obsdate['utc_date'] + '</td><td>')
        print(obsdate['utc_time'] + '</td><td>')
        print(obsdate['local_date'] + '</td><td>')
        print(obsdate['local_time'] + '</td><td>')
        print(obsdate['day_of_year'] + '</td><td>')
        print(obsdate['hour_of_day'] + '</td><td>')
        try:
            airtemp = round(float(obsdate['air_temperature']), 1)
            previousair = airtemp 
        except:
            airtemp = previousair
        print(str(airtemp) + '</td><td>')
        ddul = float(params['Upper Limit'])
        if airtemp > ddul:
            airtemp = ddul
        degreehour = airtemp - float(params['Base'])
        if degreehour < 0:
            degreehour = 0
        print(str(degreehour) + '</td><td>')
        adh += degreehour
        print(str(adh) + '</td><td>')
        degreeday = degreehour/24
        degreeday = round(degreeday, 3)
        print(str(degreeday) + '</td><td>')
        add = round(adh/24, 3)
        print(str(add) + '</td></tr>')
        if obsdate['local_date'] == currDate:
            totalTemp += airtemp
            hourCount += 1
            prev_degreehour = degreehour
            prev_adh = adh
            prev_degreeday = degreeday
            prev_add = add
        else:
            daily_str = daily_str +  '<td>' + str(totalTemp / hourCount) + '</td><td>' + str(prev_degreeday) + '</td><td>' + str(prev_add) + '</td></tr> \n'
            daily_str = daily_str +  '<tr><td>' + obsdate['local_date'] + '</td><td>' + obsdate['day_of_year'] + '</td>'
            currDate = obsdate['local_date']
            totalTemp = airtemp
            hourCount = 1
    daily_str = daily_str +  '<td>' + str(totalTemp / hourCount) + '</td><td>' + str(prev_degreeday) + '</td><td>' + str(prev_add) + '</td></tr> \n'
    print("|")
    print(daily_str)
    
def logistic_degree_day(filename = paramspath):
    model = open(filename, "r")
    params = json.load(model)
    for p in params:
        params[p] = str(params[p])
    model.close()
    today = date.today()
    today = str(today).replace(' ', '_').replace(':', '-').replace('.', '-')
    print('<th>Hourly Temp</th><th>Degree Hour</th><th>Accumulated Degree Hours</th><th>Degree Day</th><th>Accumulated Degree Days</th><th>Development</th></tr></thead><tbody>')
    daily_str = '<th>Daily Temp</th><th>Degree Day</th><th>Accumulated Degree Days</th><th>Development</th></tr></thead><tbody>\n'

    hourCount = 0
    totalTemp = 0

    data = json.load(open(datapath, "r"))
    daily_str = daily_str +  '<tr><td>' + data[0]['local_date'] + '</td><td>' + data[0]['day_of_year'] + '</td>'
    adh = 0 
    currDate = data[0]['local_date']

    for obsdate in data:
        print('<tr><td>')
        print(obsdate['utc_date'] + '</td><td>')
        print(obsdate['utc_time'] + '</td><td>')
        print(obsdate['local_date'] + '</td><td>')
        print(obsdate['local_time'] + '</td><td>')
        print(obsdate['day_of_year'] + '</td><td>')
        print(obsdate['hour_of_day'] + '</td><td>')
        try:
            airtemp = round(float(obsdate['air_temperature']), 1)
            previousair = airtemp 
        except:
            airtemp = previousair
        print(str(airtemp) + '</td><td>')
        ddul = float(params['Upper Limit'])
        if airtemp > ddul:
            airtemp = ddul
        degreehour = airtemp - float(params['Base'])
        if degreehour < 0:
            degreehour = 0
        print(str(degreehour) + '</td><td>')
        adh += degreehour
        print(str(adh) + '</td><td>')
        degreeday = degreehour/24
        degreeday = round(degreeday, 3)
        print(str(degreeday) + '</td><td>')
        add = round(adh/24, 3)
        print(str(add) + '</td><td>')
        acc50para = (float(params['Max ACC Degree Days']) / 2) if '50% Max ACC Degree Days' not in params else float(params['50% Max ACC Degree Days'])
        acc50 = add - acc50para
        rateOfDev = -1 * float(params['Rate of Development']) * acc50
        dev = 100 / (1 + math.exp(rateOfDev))
        print(str(dev) + '</td></tr>')
        if obsdate['local_date'] == currDate:
            totalTemp += airtemp
            hourCount += 1
            prev_degreehour = degreehour
            prev_adh = adh
            prev_degreeday = degreeday
            prev_add = add
            prev_dev = dev
        else:
            daily_str = daily_str +  '<td>' + str(totalTemp / hourCount) + '</td><td>' + str(prev_degreeday) + '</td><td>' + str(prev_add) + '</td><td>' + str(prev_dev) + '</td></tr> \n'
            daily_str = daily_str +  '<tr><td>' + obsdate['local_date'] + '</td><td>' + obsdate['day_of_year'] + '</td>'
            currDate = obsdate['local_date']
            totalTemp = airtemp
            hourCount = 1
    daily_str = daily_str +  '<td>' + str(totalTemp / hourCount) + '</td><td>' + str(prev_degreeday) + '</td><td>' + str(prev_add) + '</td><td>' + str(prev_dev) + '</td></tr> \n'
    print("|")
    print(daily_str)

def log_logistic_degree_day(filename = paramspath):
    model = open(filename, "r")
    params = json.load(model)
    for p in params:
        params[p] = str(params[p])
    model.close()
    today = date.today()
    today = str(today).replace(' ', '_').replace(':', '-').replace('.', '-')
    print('<th>Hourly Temp</th><th>Degree Hour</th><th>Accumulated Degree Hours</th><th>Degree Day</th><th>Accumulated Degree Days</th><th>Development</th></tr></thead><tbody>')
    daily_str = '<th>Daily Temp</th><th>Degree Day</th><th>Accumulated Degree Days</th><th>Development</th></tr></thead><tbody>\n'

    hourCount = 0
    totalTemp = 0
    data = json.load(open(datapath, "r"))
    daily_str = daily_str +  '<tr><td>' + data[0]['local_date'] + '</td><td>' + data[0]['day_of_year'] + '</td>'
    adh = 0 
    currDate = data[0]['local_date']

    for obsdate in data:
        print('<tr><td>')
        print(obsdate['utc_date'] + '</td><td>')
        print(obsdate['utc_time'] + '</td><td>')
        print(obsdate['local_date'] + '</td><td>')
        print(obsdate['local_time'] + '</td><td>')
        print(obsdate['day_of_year'] + '</td><td>')
        print(obsdate['hour_of_day'] + '</td><td>')
        try:
            airtemp = round(float(obsdate['air_temperature']), 1)
            previousair = airtemp 
        except:
            airtemp = previousair
        print(str(airtemp) + '</td><td>')
        ddul = float(params['Upper Limit'])
        if airtemp > ddul:
            airtemp = ddul
        degreehour = airtemp - float(params['Base'])
        if degreehour < 0:
            degreehour = 0
        print(str(degreehour) + '</td><td>')
        adh += degreehour
        print(str(adh) + '</td><td>')
        degreeday = degreehour/24
        degreeday = round(degreeday, 3)
        print(str(degreeday) + '</td><td>')
        add = round(adh/24, 3)
        print(str(add) + '</td><td>')
        if add <= 0.0:
            lnADD = 0.0
        else:
            lnADD = math.log(add)
        Add50 = (float(params['Max ACC Degree Days']) / 2) if '50% Max ACC Degree Days' not in params else float(params['50% Max ACC Degree Days'])
        lnADD50 = math.log(Add50)
        minus = lnADD - lnADD50
        kMinus = float(params['Rate of Development']) * (-1) * minus
        dev = 100 / (1 + math.exp(kMinus))
        print(str(dev) + '</td></tr>')
        if obsdate['local_date'] == currDate:
            totalTemp += airtemp
            hourCount += 1
            prev_degreehour = degreehour
            prev_adh = adh
            prev_degreeday = degreeday
            prev_add = add
            prev_dev = dev
        else:
            daily_str = daily_str + '<td>' + str(totalTemp / hourCount) + '</td><td>' + str(prev_degreeday) + '</td><td>' + str(prev_add) + '</td><td>' + str(prev_dev) + '</td></tr> \n'
            daily_str = daily_str +  '<tr><td>' + obsdate['local_date'] + '</td><td>' + obsdate['day_of_year'] + '</td>'
            currDate = obsdate['local_date']
            totalTemp = airtemp
            hourCount = 1
    daily_str = daily_str + '<td>' + str(totalTemp / hourCount) + '</td><td>' + str(prev_degreeday) + '</td><td>' + str(prev_add) + '</td><td>' + str(prev_dev) + '</td></tr> \n'
    print("|")
    print(daily_str)

def weibull_degree_day(filename = paramspath):
    model = open(filename, "r")
    params = json.load(model)
    for p in params:
        params[p] = str(params[p])
    model.close()
    today = date.today()
    today = str(today).replace(' ', '_').replace(':', '-').replace('.', '-')
    print('<th>Hourly Temp</th><th>Degree Hour</th><th>Accumulated Degree Hours</th><th>Degree Day</th><th>Accumulated Degree Days</th><th>% Development</th></tr></thead><tbody>')
    daily_str = '<th>Daily Temp</th><th>Degree Day</th><th>Accumulated Degree Days</th><th>% Development</th></tr></thead><tbody>\n'

    hourCount = 0
    totalTemp = 0
    data = json.load(open(datapath, "r"))
    daily_str = daily_str + '<tr><td>' + data[0]['local_date'] + '</td><td>' + data[0]['day_of_year'] + '</td>'
    adh = 0 
    currDate = data[0]['local_date']
    for obsdate in data:
        print('<tr><td>')
        print(obsdate['utc_date'] + '</td><td>')
        print(obsdate['utc_time'] + '</td><td>')
        print(obsdate['local_date'] + '</td><td>')
        print(obsdate['local_time'] + '</td><td>')
        print(obsdate['day_of_year'] + '</td><td>')
        print(obsdate['hour_of_day'] + '</td><td>')
        try:
            airtemp = round(float(obsdate['air_temperature']), 1)
            previousair = airtemp 
        except:
            airtemp = previousair
        print(str(airtemp) + '</td><td>')
        ddul = float(params['Upper Limit'])
        if airtemp > ddul:
            airtemp = ddul
        degreehour = airtemp - float(params['Base'])
        if degreehour < 0:
            degreehour = 0
        print(str(degreehour) + '</td><td>')
        adh += degreehour
        print(str(adh) + '</td><td>')
        degreeday = degreehour/24
        degreeday = round(degreeday, 3)
        print(str(degreeday) + '</td><td>')
        add = round(adh/24, 3)
        print(str(add) + '</td><td>')
        addFraction = add / float(params['Shape Factor'])
        addFractionPowK = pow(addFraction, float(params['Scale Factor']))
        addFractionPowKExp = math.exp(-1 * addFractionPowK)
        oneMinusExp = 1 - addFractionPowKExp
        dev = 100 * oneMinusExp
        print(str(dev) + '</td></tr>')
        if obsdate['local_date'] == currDate:
            totalTemp += airtemp
            hourCount += 1
            prev_degreehour = degreehour
            prev_adh = adh
            prev_degreeday = degreeday
            prev_add = add
            prev_dev = dev
        else:
            daily_str = daily_str + '<td>' + str(totalTemp / hourCount) + '</td><td>' + str(prev_degreeday) + '</td><td>' + str(prev_add) + '</td><td>' + str(prev_dev) + '</td></tr> \n'
            daily_str = daily_str + '<tr><td>' + obsdate['local_date'] + '</td><td>' + obsdate['day_of_year'] + '</td>'
            currDate = obsdate['local_date']
            totalTemp = airtemp
            hourCount = 1
    daily_str = daily_str + '<td>' + str(totalTemp / hourCount) + '</td><td>' + str(prev_degreeday) + '</td><td>' + str(prev_add) + '</td><td>' + str(prev_dev) + '</td></tr> \n'
    print("|")
    print(daily_str)

def temperature_development_rate(filename = paramspath):
    model = open(filename, "r")
    params = json.load(model)
    for p in params:
        params[p] = str(params[p])
    model.close()
    today = date.today()
    today = str(today).replace(' ', '_').replace(':', '-').replace('.', '-')
    print('<th>Hourly Temp</th><th>% Development</th></tr></thead><tbody>')
    daily_str = '<th>Daily Temp</th><th>% Development</th></tr></thead><tbody>\n'

    hourCount = 0
    totalTemp = 0
    data = json.load(open(datapath, "r"))
    daily_str = daily_str + '<tr><td>' + data[0]['local_date'] + '</td><td>' + data[0]['day_of_year'] + '</td>'
    adh = 0 
    currDate = data[0]['local_date']
    accAdjDevRateFraction = 0
    expTerm = ((float(params['PTMAX']) - float(params['PTOPT'])) / (float(params['PTOPT']) - float(params['PTMIN'])))
    for obsdate in data:
        print('<tr><td>')
        print(obsdate['utc_date'] + '</td><td>')
        print(obsdate['utc_time'] + '</td><td>')
        print(obsdate['local_date'] + '</td><td>')
        print(obsdate['local_time'] + '</td><td>')
        print(obsdate['day_of_year'] + '</td><td>')
        print(obsdate['hour_of_day'] + '</td><td>')
        try:
            airtemp = round(float(obsdate['air_temperature']), 1)
            previousair = airtemp 
        except:
            airtemp = previousair
        print(str(airtemp) + '</td><td>')
        PtMinPtMax = 0 if (airtemp > float(params['PTMAX']) or airtemp < float(params['PTMIN'])) else 1
        #run.write(str(PtMinPtMax) + ',')
        tMin = (airtemp - float(params['PTMIN'])) / (float(params['PTOPT']) - float(params['PTMIN']))
        #run.write(str(tMin) + ',')
        tMax = (float(params['PTMAX']) - airtemp) / (float(params['PTMAX']) - float(params['PTOPT']))
        #run.write(str(tMax) + ',')
        devRateFraction = pow((tMin * pow(tMax, expTerm)), float(params['c']))
        #run.write(str(devRateFraction) + ',')
        adjDevRateFraction = 0 if PtMinPtMax == 0 else (devRateFraction / float(params['OTD'])) / 24
        #run.write(str(adjDevRateFraction) + ',')
        accAdjDevRateFraction += adjDevRateFraction
        #run.write(str(accAdjDevRateFraction) + ',')
        dev = 100 * accAdjDevRateFraction
        print(str(dev) + '</td></tr>')
        if obsdate['local_date'] == currDate:
            totalTemp += airtemp
            hourCount += 1
            prev_dev = dev
        else:
            daily_str = daily_str + '<td>' + str(totalTemp / hourCount) + '</td><td>' + str(prev_dev) + '</td></tr> \n'
            daily_str = daily_str + '<tr><td>' + obsdate['local_date'] + '</td><td>' + obsdate['day_of_year'] + '</td>'
            currDate = obsdate['local_date']
            totalTemp = airtemp
            hourCount = 1
    daily_str = daily_str + '<td>' + str(totalTemp / hourCount) + '</td><td>' + str(prev_dev) + '</td></tr> \n'
    print("|")
    print(daily_str)

def cart(filename = paramspath):
    # model = open(filename, "r")
    # params = json.load(model)
    # for p in params:
    #     params[p] = str(params[p])
    # model.close()
    today = date.today()
    today = str(today).replace(' ', '_').replace(':', '-').replace('.', '-')
    print('<th>Hourly Temp</th><th>LWD</th></tr></thead><tbody>')
    daily_str = '<th>Daily Temp</th><th>LWD</th></tr></thead><tbody>\n'

    hourCount = 0
    totalTemp = 0
    data = json.load(open(datapath, "r"))
    daily_str = daily_str + '<tr><td>' + data[0]['local_date'] + '</td><td>' + data[0]['day_of_year'] + '</td>'
    adh = 0 
    currDate = data[0]['local_date']
    for obsdate in data:
        print('<tr><td>')
        print(obsdate['utc_date'] + '</td><td>')
        print(obsdate['utc_time'] + '</td><td>')
        print(obsdate['local_date'] + '</td><td>')
        print(obsdate['local_time'] + '</td><td>')
        print(obsdate['day_of_year'] + '</td><td>')
        print(obsdate['hour_of_day'] + '</td><td>')
        try:
            airtemp = round(float(obsdate['air_temperature']), 1)
            previousair = airtemp 
        except:
            airtemp = previousair
        print(str(airtemp) + '</td><td>')
        svp = 0.6108*math.exp((17.27*airtemp) / (airtemp+237.26))
        rhl = float(obsdate['relative_humidity'])
        wsp = float(obsdate['wind_speed']) 
        avp = rhl * 0.01 * svp
        dpt = (116.91 + 237.26*math.log(avp)) / (16.775 - math.log(avp))
        dpd = airtemp - dpt
        airtemp = airtemp if airtemp >= 0 else 0.0
        ie1 = 1.6064*math.sqrt(airtemp) + 0.0036*airtemp*airtemp + 0.1531*rhl - (0.4599 * wsp * dpd) - (0.0035 * airtemp * rhl)
        ie1Threshold = 14.4674
        ie1Logic = 1 if ie1 > ie1Threshold else 0
        ie2 = 0.7921*math.sqrt(airtemp) + 0.0046*rhl*rhl - 2.3889*wsp - (0.039*airtemp*wsp) + (1.0613*wsp*dpd)
        ie2Threshold = 37.0
        ie2Logic = 1 if ie2 > ie2Threshold else 0
        #IF(P13>0,1,IF(O13>=3.7,0,IF(Q13<2.5,U13,IF(K13>=87.8,W13,0))))
        if float(obsdate['wind_speed']) > 0.0:
            lwd = 1
        else:
            if dpd >= 3.7:
                lwd = 0
            else:
                if wsp < 2.5:
                    lwd = ie1Logic
                else:
                    if rhl >= 87.8:
                        lwd = ie2Logic
                    else:
                        lwd = 0
        print(str(lwd) + '</td></tr>')
        if obsdate['local_date'] == currDate:
            totalTemp += airtemp
            hourCount += 1
            prev_lwd = lwd
        else:
            daily_str = daily_str + '<td>' + str(totalTemp / hourCount) + '</td><td>' + str(prev_lwd) + '</td></tr> \n'
            daily_str = daily_str + '<tr><td>' + obsdate['local_date'] + '</td><td>' + obsdate['day_of_year'] + '</td>'
            currDate = obsdate['local_date']
            totalTemp = airtemp
            hourCount = 1
    daily_str = daily_str + '<td>' + str(totalTemp / hourCount) + '</td><td>' + str(prev_lwd) + '</td></tr> \n'
    print("|")
    print(daily_str)
