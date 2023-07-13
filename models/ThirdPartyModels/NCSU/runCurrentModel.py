"""FILE TO RUN THE MODELS"""
import os
from curModels import *
# print('running models')
## Note this is the path for Stan's dev box. Make sure this is comment out in production
#PATH = '/var/www/html/weathermodeling/weathermodelingapp/models/ThirdPartyModels/currentrun/'
PATH = '/var/www/html/weathermodelingapp/models/ThirdPartyModels/currentrun/'
paramFile = open(PATH + "params.json")
params = json.load(paramFile)
if params["Model"] == "Degree Day":
    degree_day()
elif params["Model"] == "Logistic Degree Day":
    logistic_degree_day()
elif params["Model"] == "Log Logistic Degree Day":
    log_logistic_degree_day()
elif params["Model"] == "Weibull Degree Day":
    weibull_degree_day()
elif params["Model"] == "Temperature Development Rate":
    temperature_development_rate()
elif params["Model"] == "CART-SLD Leaf Wetness":
    cart()

