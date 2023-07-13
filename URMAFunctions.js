/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
function getURMAdata(selectedStation) {
    document.getElementById('loading').style.display = 'block'; // Enable loading icon

    console.log(selectedStation);
    if (!LONGITUDE || !PointName) {
        //console.log("nyhhh");
        getWeather(selectedStation);

    }
    else {

        let BeginDashless = PeriodBegin.replace(/-/g, "");
        let EndDashless = PeriodEnd.replace(/-/g, "");

        let coordinates = LONGITUDE + "," + LATITUDE;
        let reply = $.ajax({
            url: 'URMAFunctions.php',
            data: {
                'coordinates': coordinates,
                'beginDate': BeginDashless,
                'endDate': EndDashless
            },
            type: 'POST'
        }).then(reply => {
            console.log("got the data");
            console.log(reply)
            let ForecastTemp = JSON.parse(reply);
            console.log(ForecastTemp);
            console.log(LONGITUDE);
            console.log(LATITUDE);
            let reply2 = $.ajax({
                url: 'getTimeFromURMA.php',
                type: 'POST',
                data: {
                    'beginDate': BeginDashless,
                    'endDate': EndDashless
                }


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