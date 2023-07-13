import pygrib
import numpy as np

grib = pygrib.open('../../small.grib')
x=1
for g in grib:
    lt, ln = g.latlons() # lt - latitude, ln - longitude
    np.savetxt(str(x),ln, lat, delimiter=",")
    x+=1
