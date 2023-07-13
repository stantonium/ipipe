/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */

function CARTgetRun(R) {

	$.ajax({
		url: './models/CARTgetRun.php',
		data: {
			'User': user,
			'R': R
		},
		type: 'POST'
	}).done(reply => {
		var CARTUserRun = JSON.parse(reply);
		//console.log(CARTUserRun);
		if (CARTUserRun) {
			if (CARTUserRun[0].station) {
				CARTselectedstation = CARTUserRun[0].station;
				//console.log(TDRselectedstation);
				CARTPeriodBegin = CARTUserRun[0].TimePeriod.replace("\)", "");
				CARTPeriodBegin = CARTPeriodBegin.replace('[', '');
				CARTPeriodBegin = CARTPeriodBegin.split(',');
				CARTPeriodEnd = CARTPeriodBegin[1];
				// Prevent end date from going up by one
				CARTPeriodEnd = maintainEndDate(CARTPeriodEnd);
				//console.log(CARTPeriodEnd);

				CARTPeriodBegin = CARTPeriodBegin[0];

				document.getElementById("Station").value = CARTselectedstation
				if (CARTselectedstation.length > 1) { document.getElementById("run").style.display = "block" }
				document.getElementById("PeriodBegin").value = CARTPeriodBegin;
				document.getElementById("PeriodEnd").value = CARTPeriodEnd;
				PeriodBegin = CARTPeriodBegin;
				PeriodEnd = CARTPeriodEnd;
				NAME = CARTUserRun[0].StationName;
				LATITUDE = CARTUserRun[0].Latitude;
				LONGITUDE = CARTUserRun[0].Longitude;
				ELEVATION = CARTUserRun[0].Elevation;

			}
			if (!isNamedRun) {
			csvName = userInitials + ' CART ' + CARTselectedstation + ' ' + CARTPeriodBegin + ' ' + CARTPeriodEnd
			}
			else {
				csvName = CARTUserRun[0].Name;
			}
			if (!modelMode && !fromRunClick) {
				checkmodelmode(CARTselectedstation);
			}
			if (fromRunClick) {
				checkmodelmode(CARTselectedstation);
			}
		}
		
		return;
	})
}

function onchangeCART() {
    const CARTModelHTML = "Inputs: <br> Hourly Air Temperature : <br>\
    Hourly relative humidity<br>\
    Hourly dew point<br>\
    Hourly Precipitation<br>\
    Hourly wind speed<br>\
    Outputs: <br>\
    Leaf wetness hour<br>\
    ";
    document.getElementById("SavedModels").innerHTML = "";
    document.getElementById("Stations").style.display = "block";
    document.getElementById("inputs").innerHTML = "";
    inputs.insertAdjacentHTML('afterbegin', CARTModelHTML);
    document.getElementById("parameters").innerHTML = "";
}

function CARTModel(data, metadata) {
    console.log(data);
    console.log(metadata);

    CARTPeriodBegin = document.getElementById("PeriodBegin").value
    CARTPeriodEnd = document.getElementById("PeriodEnd").value


    let input1 = "Hourly Air Temperature"
    let input2 = "Hourly relative humidity"
    let input3 = "Hourly dew point"
    let input4 = "Hourly Precipitation"
    let input5 = "Hourly wind speed"
    let output1 = "Leaf wetness hour"

    tab = common_tab;

    var x = 0;
    tab += "<th>" + input1 + "</th><th>" + input2 + "</th><th>" + input3 + "</th><th>" + input4 + "</th><th>" + input5 + "</th><th>" + output1 + "</th></tr></thead><tbody>";

    var len = data.length;
    var rowcounter = 0;

    while (x < len) {
        if (data[x].Hour_of_Day != 1 && rowcounter == 0) {
            x++;
            continue;
        }
        rowcounter++;

        let temp = data[x].Air_Temperature;
        if (temp > 500) {
            let tmpprev = data[x - 1].Air_Temperature;
            tmpprev = parseInt(tmpprev);
            if (tmpprev > 500) {
                tmpprev = data[x - 2].Air_Temperature
                tmpprev = parseInt(tmpprev);
            }
            let tmpnext = data[x + 1].Air_Temperature
            tmpnext = parseInt(tmpnext);
            if (tmpnext > 500) {
                tmpnext = data[x - 2].Air_Temperature
                tmpnext = parseInt(tmpnext);
            }
            if (tmpprev > 500 || tmpnext > 500) {
                alert("Can not run the model. Multiple missing data points.")
                break;
            }

            console.log(temp);
            console.log(tmpprev);
            console.log(tmpnext);
            //console.log(typeof(tmp[0]));
            temp = (tmpprev + tmpnext) / 2;
            console.log("Interpolated temperature is: ")
            console.log(temp);
        }

        //console.log("calculating CART SLD Leaf Wetness");


        tab += "<tr><td>" + data[x].UTC_Date + "</td>";
        tab += "<td>" + data[x].UTC_Time + "</td>";
        tab += "<td>" + data[x].Local_Date + "</td>";
        tab += "<td>" + data[x].Local_Time + "</td>";
        tab += "<td>" + data[x].Day_of_Year + "</td>";
        tab += "<td>" + data[x].Hour_of_Day + "</td>";

        //Hourly Temp	
        tab += "<td>" + round(temp, 2) + "</td>";
        console.log(data);

        // Hourly RH
        tab += "<td>" + data[x].Relative_Humidity + "</td>";
        tab += "<td>" + data[x].Dew_Point + "</td>";
        tab += "<td>" + data[x].Precipitation + "</td>";
        tab += "<td>" + data[x].Wind_Speed + "</td>";

        let DPT = data[x].Dew_Point;
        let DPD = temp - DPT;
        let PCP = data[x].Precipitation;
        let RH = data[x].Relative_Humidity;
        let WSP = data[x].Wind_Speed;
        let LWH = 0;
        if (PCP == '8888.8') {
            //alert("Cannot run the model. No precipitation data");
            //break;
            PCP = 0;
        }
        if (PCP > 0) {
            LWH = 1
        } else {
            if (DPD < 3.7) {
                if (WSP < 2.5) {
                    let ie1 = 1.6064 * Math.sqrt(temp) + 0.0036 * temp * temp + 0.1531 * RH - 0.4599 * WSP * DPD - 0.0035 * temp * RH;
                    if (ie1 > 14.4674) { LWH = 1; }
                } else {
                    if (RH >= 87.8) {
                        let ie2 = 0.7921 * Math.sqrt(temp) + 0.0046 * RH - 2.3889 * WSP - 0.039 * temp * WSP + 1.0613 * WSP * DPD;
                        if (ie2 > 37) { LWH = 1 }
                    }
                }
            }
        }

        tab += "<td>" + LWH + "</td>"
        x++;
    }
    console.log("finished calculating CART LD Leaf wetness");
    //console.log(typeof (metadata[0].name));
    NAME = metadata[0].name;
    LATITUDE = metadata[0].latitude;
    LONGITUDE = metadata[0].longitude;
    ELEVATION = metadata[0].elevation;
    tab += "</tbody></table>"

    tab += "<div class=\"dijitDialogPaneActionBar\">"

    if (fromRunClick === false) {

        tab += "<button data-dojo-type=\"dijit/form/Button\" type=\"button\""
        tab += "<id=\"Save\"onClick=\"SaveRun\">Save</button>"


    }
    tab += "<button data-dojo-type=\"dijit/form/Button\" type=\"button\""

    //console.log(selectedStation);
    //name of CSV if downloaded
    if (fromRunClick && modelMode) { csvName = runStr } else {
        csvName = userInitials + ' CART ' + selectedStation + ' ' + CARTPeriodBegin + ' ' + CARTPeriodEnd;
    }

    tab += "id=\"Download\"onClick=\"exportTableToCSV('" + csvName + ".csv')\">Download CSV</button>"

    tab += "<button data-dojo-type=\"dijit/form/Button\" type=\"button\""
    tab += "id=\"ChartData\"onClick=\"ChartHrly()\">Chart</button>"

    tab += "<button data-dojo-type=\"dijit/form/Button\" type=\"button\""
    tab += "id=\"cancel\"onClick=\"WeatherData.hide()\">Cancel</button></div>"

    //console.log(tab);

    WeatherData.set("content", tab);
    var table = $('#Results').DataTable({
        "scrollY": "400px",
        "scrollCollapse": true,
        "paging": false,
        "order": []

    });

    if (isNamedRun === true && selectedStationArrayLength > 1) {
        //	SaveRun(selectedStation); // save the run automatically in model mode
    } else {
        WeatherData.show();
        table.columns.adjust().draw();
    }
    document.getElementById('loading').style.display = 'none';
}