/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
function addToIndexedDB(selectedStation) {
  console.log(selectedStation);
  //concatenate allResultColumns and DBResultColumns together
  let tableheaders = Object.assign({}, allResultColumns, DBResultColumns);
  //get keys
  let Keys = Object.keys(tableheaders);
  console.log(Keys.toString());
  // Parse selectedStation JSON object
 
  // Create the database
  var db = new Dexie(selectedStation[0].station_id);
  db.version(1).stores({
    'weatherdata': Keys.toString(),
    'metadata': Object.keys(stationMetadata).toString()
  });

  // Put the metadata into it
  db.metadata.put({
    station_id: selectedStation[0].station_id, 
    name: selectedStation[0].name, 
    latitude: selectedStation[0].latitude, 
    longitude: selectedStation[0].longitude, 
    elevation: selectedStation[0].elevation
  });
getWeather(selectedStation);
}

  function findStation(stationId) {
  console.log(stationId + "putInFindStation");
  
  // query the database for the station id
  let reply = $.ajax({
    url: 'FindStation.php',
    data: {
      'station_id': stationId
    },
    type: 'POST'
  });
 // console.log(reply);
  return reply;
}

function saveStation(reply, stationId, PeriodBegin) {
  // if the station id is not found, add the station to the database
  if (reply == 'false') {
    console.log(stationId)
    console.log(NAME)
    console.log(ELEVATION)
    console.log(PeriodBegin)
    let year = PeriodBegin.split('-');
    year = year[0];
    $.ajax({
      url: 'SaveStation.php',
      data: {
        "station_id": stationId,
        "name": NAME,
        "latitude": LATITUDE,
        "longitude": LONGITUDE,
        "elevation": ELEVATION, 
        "year": year
      },
      type: 'POST'
    });
  }
}


