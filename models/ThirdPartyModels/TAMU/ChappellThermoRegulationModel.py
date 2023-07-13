from math import sqrt, pi, exp
import json


def ChappellThermoRegulationModel(wxFile, paramFile):
    jsonFile = open(wxFile)
    wxData = json.loads(jsonFile.read())
    jsonFile.close()
    jsonFile = open(paramFile)
    params = json.loads(jsonFile.read())
    jsonFile.close()

    temp_pref = float(params['CTR_temp_pref'])
    sigma = float(params['CTR_sigma'])
    c = float(params['CTR_c'])

    scale = 1/(sigma*(sqrt(2*pi)))*exp(-0.5*((0)/sigma)**2.0)

    for i, day in enumerate(wxData):
        t = float(day['air_temperature'])
        p_in = 1/(sigma*(sqrt(2*pi)))*exp(-0.5*((t-temp_pref)/sigma)**2.0)
        scaled_p = p_in/scale
        C = c*(t-temp_pref)
        Treg = t-C*scaled_p
        wxData[i]['air_temperature_original'] = t
        wxData[i]['air_temperature'] = round(Treg, 1)

    jsonFile = open(wxFile, "w")
    jsonFile.write(json.dumps(wxData))
    jsonFile.close()
