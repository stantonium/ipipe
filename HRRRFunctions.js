/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
function loadcounties(state) {
    let reply = $.ajax({
        url: 'getcounties.php',
        type: 'POST',
        data: {
            'state': state
        }

    }).then(reply => {
        let countylist = JSON.parse(reply);
        //console.log(countylist);
        countylist.forEach(county =>{
            viewer.dataSources.add(Cesium.GeoJsonDataSource.load('./data/states/' + state + '/' + county, {
                stroke: Cesium.Color.YELLOW,
                fill: Cesium.Color.PINK.withAlpha(0.05),
                strokeWidth: 3
            }));
            
        }
            );
    })
}
function getHRRRdata(selectedStation) {
    document.getElementById('loading').style.display = 'block'; // Enable loading icon
    console.log(LONGITUDE);
    console.log(PointName);
    console.log(selectedStation);
    if (!LONGITUDE || !PointName) {
        console.log("nyhhh");
        getWeather(selectedStation);

    }
    else {
        let coordinates = LONGITUDE + "," + LATITUDE;
        let reply = $.ajax({
            url: 'HRRRFunctions.php',
            data: {
                'coordinates': coordinates
            },
            type: 'POST'
        }).then(reply => {
            console.log("got the forecast");
            console.log(reply)
            let ForecastTemp = JSON.parse(reply);
            console.log(ForecastTemp);
            console.log(LONGITUDE);
            console.log(LATITUDE);
            let reply2 = $.ajax({
                url: 'getTimeFromGrib2.php',
                type: 'POST'


            }).then(reply2 => {
                let ForecastTime = JSON.parse(reply2);
                console.log(reply2);
                console.log(ForecastTime);
                console.log(ForecastTemp);
                console.log(PointName);
                populateHRRR(ForecastTemp, ForecastTime)
                document.getElementById('loading').style.display = 'block'; // Enable loading icon


            })



        })
    }
}