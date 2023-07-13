"""FILE TO RUN THE MODELS"""
import os
from curModels import *
# print('running models')
PATH = '/var/www/html/weathermodeling/weathermodelingapp/models/ThirdPartyModels/currentrun/'
#PATH = './'
paramFile = open(PATH + "params.json")
params = json.load(paramFile)
modelList = params["Model"]
if "Chappell ThermoRegulation Model" in modelList:
    from ChappellThermoRegulationModel import *
    ChappellThermoRegulationModel(PATH + "weather.json", PATH + "params.json")
if params["Model"] == "CART-SLD Leaf Wetness" in modelList:
    cart()
if "Degree Day" in modelList:
    degree_day()
if "Logistic Degree Day" in modelList:
    logistic_degree_day()
if "Log Logistic Degree Day" in modelList:
    log_logistic_degree_day()
if "Weibull Degree Day" in modelList:
    weibull_degree_day()
if "Temperature Development Rate" in modelList:
    temperature_development_rate()
