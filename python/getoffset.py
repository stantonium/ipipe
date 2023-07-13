import sys
import datetime
import pytz
from timezonefinder import TimezoneFinder
tf = TimezoneFinder()

lat = float(sys.argv[1])
long = float(sys.argv[2])
yr = int(sys.argv[3])
mo = int(sys.argv[4])
dy = int(sys.argv[5])
tz = (tf.timezone_at(lng=long, lat=lat))
offset = pytz.timezone(tz).localize(datetime.datetime(yr,mo,dy)).strftime('%z')
print (lat)
print (long)
print (tz)
print (offset)

