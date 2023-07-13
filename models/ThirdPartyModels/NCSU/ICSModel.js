function onchangeICS() {
    const ICSModelHTML = "Inputs: <br> Hourly Air Temperature : <br>\
    Hourly relative humidity<br>\
    Hourly dew point<br>\
    Hourly Precipitation<br>\
    Hourly wind speed<br>\
    Outputs: <br>\
    Leaf wetness hour<br>\
    ";
    document.getElementById("SavedModels").innerHTML = "";
    document.getElementById("Stations").style.display = "none";
    document.getElementById("inputs").innerHTML = "";
    inputs.insertAdjacentHTML('afterbegin', ICSModelHTML);
    document.getElementById("parameters").innerHTML = "";
    document.getElementById("stationElem").style.display = "block";
    loadPOIs();
    getScheduledModel()
}