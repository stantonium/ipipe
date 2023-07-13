/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */
function DDgetRun(R) {

	$.ajax({
		url: './models/DDgetRun.php',
		data: {
			'User': user,
			'R': R
		},
		type: 'POST'
	}).done(reply => {
		var DDUserRun = JSON.parse(reply);
		//console.log(DDUserRun);
		if (DDUserRun) {
			if (DDUserRun[0].station) {
				DDselectedstation = DDUserRun[0].station;
				//	console.log(DDselectedstation);
				DDPeriodBegin = DDUserRun[0].TimePeriod.replace("\)", "");
				DDPeriodBegin = DDPeriodBegin.replace('[', '');
				DDPeriodBegin = DDPeriodBegin.split(',');
				DDPeriodEnd = DDPeriodBegin[1];
				// Prevent end date from going up by one
				DDPeriodEnd = maintainEndDate(DDPeriodEnd);
				//	console.log(DDPeriodEnd);

				DDPeriodBegin = DDPeriodBegin[0];
				DDBaseTemp = DDUserRun[0].base;
				//	console.log(DDBaseTemp);
				DDMADD = DDUserRun[0].maxaccdd;
				DDLL = DDUserRun[0].limits.replace("\)", "");
				DDLL = DDLL.replace('[', '');
				DDLL = DDLL.split(',');
				DDUL = DDLL[1] - 1;
				DDLL = DDLL[0];


				document.getElementById("DDBase").value = DDBaseTemp;
				document.getElementById("DDMADD").value = DDMADD;
				document.getElementById("DDUL").value = DDUL;
				let source = DDUserRun[0].weathersource;
				console.log(source)
				console.log(weathersource)
				if (source === weathersource) {
				document.getElementById("Station").value = DDselectedstation;
				}
				else {
					document.getElementById("Station").value = '';
				}
				if (DDselectedstation.length > 1 && weathersource != 'URMA_HRRR') { document.getElementById("run").style.display = "block" }

				document.getElementById("PeriodBegin").value = DDPeriodBegin;
				document.getElementById("PeriodEnd").value = DDPeriodEnd;
				PeriodBegin = DDPeriodBegin;
				PeriodEnd = DDPeriodEnd;
				HTMLPage = DDUserRun[0].HTMLPage;
				NAME = DDUserRun[0].StationName;
				LATITUDE = DDUserRun[0].Latitude;
				LONGITUDE = DDUserRun[0].Longitude;
				ELEVATION = DDUserRun[0].Elevation;
			}
			if (!isNamedRun) {
				csvName = userInitials + ' DD ' + DDselectedstation + ' ' + DDPeriodBegin + ' ' + DDPeriodEnd
			} else {
				csvName = DDUserRun[0].Name;
			}
			if (!modelMode && !fromRunClick) {
				checkmodelmode(DDselectedstation);
			}
			if (fromRunClick) {
				checkmodelmode(DDselectedstation);
			}

		}


		return;
	})

}

function onchangeDD() {
	callnumber += 1;
	//console.log("call number is " + callnumber);
	//console.log("we are in onchangeDD");
	//First populate saved

	document.getElementById("SavedModels").innerHTML = "";
	document.getElementById("Stations").style.display = "block";
	$.ajax({
		url: './models/DDgetModels.php',
		data: {
			'User': user
		},
		type: 'POST'
	}).done(reply => {

		if (reply) {
			//		console.log(reply);

			var DDUserModels = JSON.parse(reply);

			//		console.log(DDUserModels);
		}

		if (DDUserModels) {
			DDRunNum = DDUserModels.DDMAX;
			//	console.log(RunNum);
			//		console.log(length);

			document.getElementById("SavedModels").innerHTML = NamedModelString + NamedModelString2;
			DDUserModels.DD.forEach(Run => addItem2(Run.Name, Run.RunNum));

			//console.log(DDUserModels.DD);

		}

	})

	// Now populate Runs

	document.getElementById("ActiveRuns").innerHTML = "";
	//console.log('dude');
	$.ajax({
		url: './models/DD.php',
		data: {
			'User': user
		},
		type: 'POST'
	}).done(reply => {

		if (reply) {
			//	console.log(reply);

			DDUserRuns = JSON.parse(reply);

			//console.log("DDUserRuns");
			//console.log(DDUserRuns);
		}
		document.getElementById("inputs").innerHTML = "";
		inputs.insertAdjacentHTML('afterbegin', DDModelHTML);

		if (DDUserRuns) {
			if (DDUserRuns.DDMAX > DDRunNum) {
				DDRunNum = DDUserRuns.DDMAX
			}
			//	console.log(RunNum);
			var length = DDUserRuns.DD.length;
			//console.log("DDuserRun length is " + length);
			DDselectedstation = DDUserRuns.DD[length - 1].station;
			DDPeriodBegin = DDUserRuns.DD[length - 1].TimePeriod.replace("\)", "");
			DDPeriodBegin = DDPeriodBegin.replace('[', '');
			DDPeriodBegin = DDPeriodBegin.split(',');
			DDPeriodEnd = DDPeriodBegin[1];
			DDPeriodBegin = DDPeriodBegin[0];

			document.getElementById("ActiveRuns").innerHTML = string + string2;
			DDUserRuns.DD.forEach(Run => { if (Run.Name.includes(";")) { null } else { addItem(Run.Name, Run.RunNum) } });
			//	DDUserRuns.DD.forEach(Run => addItem(Run.Name, Run.RunNum));

			// Prevent end date from going up by one
			DDPeriodEnd = maintainEndDate(DDPeriodEnd);
			//	console.log(DDPeriodEnd);

			//	console.log(DDUserRuns.DD);

			DDBaseTemp = DDUserRuns.DD[length - 1].base;
			DDMADD = DDUserRuns.DD[length - 1].maxaccdd;
			DDLL = DDUserRuns.DD[length - 1].limits.replace("\)", "");
			DDLL = DDLL.replace('[', '');
			DDLL = DDLL.split(',');
			DDUL = DDLL[1] - 1;
			DDLL = DDLL[0];
		}


		document.getElementById("DDBase").value = DDBaseTemp;
		document.getElementById("DDMADD").value = DDMADD;
		document.getElementById("DDUL").value = DDUL;
		document.getElementById("Station").value = DDselectedstation;
		document.getElementById("PeriodBegin").value = DDPeriodBegin;
		document.getElementById("PeriodEnd").value = DDPeriodEnd;

		//Filter stations by period on change
		periodFilter();

	})

}

// Degree Day Model
const DDModelHTML = '<div id="inr1"> Input1: Air Temperature <br>\
Output1: Hourly or Daily Degree Days <br> Output2: Hourly or Daily Degree Day Accumulation<br><br>Parameter:<br>\
<div id="inr2"> Base = <input id="DDBase" type="number"> C \
<br> Upper Limit = <input id="DDUL" type="number"> C<br>\
 Max Acc Deg Days = <input id ="DDMADD" type="number"> degree days<br>\
</div>'

function DDModel(data, metadata) {
	console.log(data);
	console.log(metadata);
	DDBaseTemp = document.getElementById("DDBase").value
	DDUL = document.getElementById("DDUL").value
	DDMADD = document.getElementById("DDMADD").value
	DDPeriodBegin = document.getElementById("PeriodBegin").value
	DDPeriodEnd = document.getElementById("PeriodEnd").value



	var Calc1 = "Hourly Temp",
		Res1 = "Degree Hour",
		Res2 = "Accumulated Degree Hours";
	Calc2 = "Daily Temp",
		Res3 = "Degree Day",
		Res4 = "Accumulated Degree Days";
	tab = common_tab;

	var x = 0;
	tab += "<th>" + Calc1 + "</th><th>" + Res1 + "</th><th>" + Res2 + "</th><th>" + Res3 + "</th><th>" + Res4 + "</th> </tr> </thead><tbody>";

	var len = data.length;
	var ADD = 0;
	var rowcounter = 0;

	dailytab = common_daily;
	dailytab += "<th>" + Calc2 + "</th><th>" + Res3 + "</th><th>" + Res4 + "</th> </tr> </thead><tbody>";
	var ADDavg = 0;
	var previousday = 0;
	var temparray = [];
	isDaily = true; // make sure the daily table pulls up by default
	console.log("calculating degree days");
	while (x < len) {
		if (data[x].Hour_of_Day != 1 && rowcounter == 0) {
			x++;
			continue;
		}
		rowcounter++;

		let temp = data[x].Air_Temperature;
		/*if (temp > 500) {
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
	}*/


	tab += "<tr><td>" + data[x].UTC_Date + "</td>";
	tab += "<td>" + data[x].UTC_Time + "</td>";
	tab += "<td>" + data[x].Local_Date + "</td>";
	tab += "<td>" + data[x].Local_Time + "</td>";
	tab += "<td>" + data[x].Day_of_Year + "</td>";
	tab += "<td>" + data[x].Hour_of_Day + "</td>";

	//Hourly Temp	
	tab += "<td>" + round(temp, 2) + "</td> <td>";
	if (temp > DDUL) { temp = DDUL }
	let DD = temp - DDBaseTemp;
	if (DD < 0) {
		DD = 0
	}
	tab += round(DD, 2) + "</td><td>";

	ADD = round(ADD, 2) + round(DD, 2);
	tab += round(ADD, 2) + "</td> <td>";
	tab += round(DD / 24, 3) + "</td> <td>";
	tab += round(ADD / 24, 3) + "</td></tr>";

	let currentday = parseInt(data[x].Day_of_Year); // current day
	if (rowcounter == 1) { previousday = currentday; } // ensure previousday and currentday are equal initially

	// if the current day of year is different from the last one
	if (previousday != currentday) {
		let dailytot = 0;
		// calculate the average temp for the day
		for (var i = 0; i < temparray.length; i++) {
			dailytot += parseFloat(temparray[i]);
		}
		let dailytemp = dailytot / temparray.length;

		// add a row to dailytab
		dailytab += "<tr><td>" + data[x].Local_Date + "</td>";
		dailytab += "<td>" + data[x].Day_of_Year + "</td>";
		dailytab += "<td>" + round(dailytemp, 1) + "</td>";
		let DDavg = dailytemp - DDBaseTemp;
		if (DDavg < 0) {
			DDavg = 0
		}
		dailytab += "<td>" + round(DDavg, 2) + "</td>";
		ADDavg = ADDavg + round(DDavg, 2);
		dailytab += "<td>" + round(ADDavg, 2) + "</td> </tr>";
		// clear temparray and set the previous day to the current day
		temparray = [];
		previousday = currentday;
	}
	temparray.push(temp);

	x++;
}
console.log("finished calculating degree days");
//console.log(typeof (metadata[0].name));
NAME = metadata[0].name;
LATITUDE = metadata[0].latitude;
LONGITUDE = metadata[0].longitude;
ELEVATION = metadata[0].elevation;
tab += "</tbody></table>"
dailytab += "</tbody></table>"
tab += "<div class=\"dijitDialogPaneActionBar\">"
dailytab += "<div class=\"dijitDialogPaneActionBar\">"
//tab+="<input id=\"ModelName\" data-dojo-type=\"dijit/form/TextBox\" type=\"textbox\" data-dojo-props=\"placeHolder: 'DD:RDM:V1'\">"
//console.log("fromRunClick is " + fromRunClick);

tab += "<button data-dojo-type=\"dijit/form/Button\" type=\"button\""
tab += "<id=\"toggle\" data-dojo-props= style:'float:left;' onClick=\"ToggleTable\">Show Daily Summary</button>"

dailytab += "<button data-dojo-type=\"dijit/form/Button\" type=\"button\""
dailytab += "<id=\"toggle\" data-dojo-props= style:'float:left;' onClick=\"ToggleTable\">Show Hourly Data</button>"

if (fromRunClick === false) {

	tab += "<button data-dojo-type=\"dijit/form/Button\" type=\"button\""
	tab += "<id=\"Save\"onClick=\"SaveRun\">Save</button>"

	dailytab += "<button data-dojo-type=\"dijit/form/Button\" type=\"button\""
	dailytab += "<id=\"Save\"onClick=\"SaveRun\">Save</button>"
}
tab += "<button data-dojo-type=\"dijit/form/Button\" type=\"button\""
dailytab += "<button data-dojo-type=\"dijit/form/Button\" type=\"button\""
//console.log(selectedStation);
//name of CSV if downloaded
if (fromRunClick && modelMode) { csvName = runStr } else {
	csvName = userInitials + ' DD ' + selectedStation + ' ' + DDPeriodBegin + ' ' + DDPeriodEnd;
}

tab += "id=\"Download\"onClick=\"exportTableToCSV('" + csvName + ".csv')\">Download CSV</button>"

tab += "<button data-dojo-type=\"dijit/form/Button\" type=\"button\""
tab += "id=\"ChartData\"onClick=\"ChartHrly()\">Chart</button>"

tab += "<button data-dojo-type=\"dijit/form/Button\" type=\"button\""
tab += "id=\"cancel\"onClick=\"WeatherData.hide()\">Cancel</button></div>"

dailytab += "id=\"Download\"onClick=\"exportTableToCSV('" + csvName + ".csv')\">Download CSV</button>"

dailytab += "<button data-dojo-type=\"dijit/form/Button\" type=\"button\""
dailytab += "id=\"ChartData\"onClick=\"ChartData()\">Chart</button>"

dailytab += "<button data-dojo-type=\"dijit/form/Button\" type=\"button\""
dailytab += "id=\"cancel\"onClick=\"WeatherData.hide()\">Cancel</button></div>"
//console.log(tab);
//console.log(dailytab);
WeatherData.set("content", dailytab);
var table = $('#Results').DataTable({
	"scrollY": "400px",
	"scrollCollapse": true,
	"paging": false,
	"order": []

});

if (isNamedRun === true && selectedStationArrayLength > 1) {
		SaveRun(selectedStation); // save the run automatically in model mode
} else {
	WeatherData.show();
	table.columns.adjust().draw();
}
document.getElementById('loading').style.display = 'none';
}

// TODO: get dailytab working for all the other models