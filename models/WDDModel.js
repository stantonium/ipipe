/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
function WDDgetRun(R) {

	$.ajax({
		url: './models/WDDgetRun.php',
		data: {
			'User': user,
			'R': R
		},
		type: 'POST'
	}).done(reply => {
		var WDDUserRun = JSON.parse(reply);
		console.log(WDDUserRun);
		if (WDDUserRun) {
			if (WDDUserRun[0].station) {
				WDDselectedstation = WDDUserRun[0].station;
				console.log(WDDselectedstation);
				WDDPeriodBegin = WDDUserRun[0].TimePeriod.replace("\)", "");
				WDDPeriodBegin = WDDPeriodBegin.replace('[', '');
				WDDPeriodBegin = WDDPeriodBegin.split(',');
				WDDPeriodEnd = WDDPeriodBegin[1];
				// Prevent end date from going up by one
				WDDPeriodEnd = maintainEndDate(WDDPeriodEnd);
				console.log(WDDPeriodEnd);

				WDDPeriodBegin = WDDPeriodBegin[0];
				WDDBaseTemp = WDDUserRun[0].base;
				console.log(WDDBaseTemp);
				WDDMADD = WDDUserRun[0].maxaccdd;
				WDDLL = WDDUserRun[0].limits.replace("\)", "");
				WDDLL = WDDLL.replace('[', '');
				WDDLL = WDDLL.split(',');
				WDDUL = WDDLL[1] - 1;
				WDDLL = WDDLL[0];
				WDDk = WDDUserRun[0].k;
				WDDs = WDDUserRun[0].s;

				document.getElementById("WDDBase").value = WDDBaseTemp;
				document.getElementById("WDDMADD").value = WDDMADD;
				document.getElementById("WDDUL").value = WDDUL;
				document.getElementById("s").value = WDDs;
				document.getElementById("k").value = WDDk;
				document.getElementById("Station").value = WDDselectedstation;
				if (WDDselectedstation.length > 1) { document.getElementById("run").style.display = "block" }
				document.getElementById("PeriodBegin").value = WDDPeriodBegin;
				document.getElementById("PeriodEnd").value = WDDPeriodEnd;
				PeriodBegin = WDDPeriodBegin;
				PeriodEnd = WDDPeriodEnd;

				HTMLPage = WDDUserRun[0].HTMLPage;
				NAME = WDDUserRun[0].StationName;
				LATITUDE = WDDUserRun[0].Latitude;
				LONGITUDE = WDDUserRun[0].Longitude;
				ELEVATION = WDDUserRun[0].Elevation;
			}
			if (!isNamedRun) {
			csvName = userInitials + ' WDD ' + WDDselectedstation + ' ' + WDDPeriodBegin + ' ' + WDDPeriodEnd
			}
			else {
				csvName = WDDUserRun[0].Name;
			}
			if (!modelMode && !fromRunClick) {
				checkmodelmode(WDDselectedstation);
			}
			if (fromRunClick) {
				checkmodelmode(WDDselectedstation);
			}
		}
		
		return;
	})
}




function onchangeWDD() {
	//First populate saved

	document.getElementById("SavedModels").innerHTML = "";
	document.getElementById("Stations").style.display = "block";
	//console.log("here")
	$.ajax({
		url: './models/WDDgetModels.php',
		data: {
			'User': user
		},
		type: 'POST'
	}).done(reply => {

		if (reply) {
			//console.log(reply);

			var WDDUserModels = JSON.parse(reply);

			//console.log(WDDUserModels);
		}

		if (WDDUserModels) {
			WDDRunNum = WDDUserModels.WDDMAX;
			//	console.log(RunNum);
			var length = WDDUserModels.WDD.length;
			//console.log(length);

			document.getElementById("SavedModels").innerHTML = NamedModelString + NamedModelString2;
			WDDUserModels.WDD.forEach(Run => addItem2(Run.Name, Run.RunNum));

			//console.log(WDDUserModels.WDD);

		}

	})
	//NOwpopulateruns
	document.getElementById("ActiveRuns").innerHTML = "";

	$.ajax({
		url: './models/WDD.php',
		data: {
			'User': user
		},
		type: 'POST'
	}).done(reply => {

		if (reply) {
			//console.log(reply);

			var WDDUserRuns = JSON.parse(reply);
			//console.log(WDDUserRuns);
		}
		document.getElementById("inputs").innerHTML = "";
		inputs.insertAdjacentHTML('afterbegin', WDDModelHTML);
		//console.log("Inserted");
		if (WDDUserRuns) {
			if (WDDUserRuns.WDDMAX > WDDRunNum) {
				WDDRunNum = WDDUserRuns.WDDMAX
			}

			//console.log(WDDRunNum);
			if (WDDRunNum) {
				var length = WDDUserRuns.WDD.length;
				//console.log(length);
				WDDselectedstation = WDDUserRuns.WDD[length - 1].station;
				//console.log(WDDselectedstation);
				WDDPeriodBegin = WDDUserRuns.WDD[length - 1].TimePeriod.replace("\)", "");
				WDDPeriodBegin = WDDPeriodBegin.replace('[', '');
				WDDPeriodBegin = WDDPeriodBegin.split(',');
				WDDPeriodEnd = WDDPeriodBegin[1];
				WDDPeriodBegin = WDDPeriodBegin[0];

				document.getElementById("ActiveRuns").innerHTML = string + string2;
				WDDUserRuns.WDD.forEach(Run => addItem(Run.Name, Run.RunNum));

				// Prevent end date from going up by one
				WDDPeriodEnd = maintainEndDate(WDDPeriodEnd);
				//console.log(WDDPeriodEnd);

				//console.log(WDDUserRuns.WDD);

				WDDBaseTemp = WDDUserRuns.WDD[length - 1].base;
				//console.log(WDDBaseTemp);
				WDDMADD = WDDUserRuns.WDD[length - 1].maxaccdd;
				WDDLL = WDDUserRuns.WDD[length - 1].limits.replace("\)", "");
				WDDLL = WDDLL.replace('[', '');
				WDDLL = WDDLL.split(',');
				WDDUL = WDDLL[1] - 1;
				WDDLL = WDDLL[0];
				WDDk = WDDUserRuns.WDD[length - 1].k;
				WDDs = WDDUserRuns.WDD[length - 1].s;
			}

		}


		document.getElementById("WDDBase").value = WDDBaseTemp;

		document.getElementById("WDDMADD").value = WDDMADD;
		document.getElementById("WDDUL").value = WDDUL;
		document.getElementById("s").value = WDDs;
		document.getElementById("k").value = WDDk;
		document.getElementById("Station").value = WDDselectedstation;
		document.getElementById("PeriodBegin").value = WDDPeriodBegin;
		document.getElementById("PeriodEnd").value = WDDPeriodEnd;

		//Filter stations by period on change
		periodFilter();

	})

}





// Weibull Degree Day Model
const WDDModelHTML = '<div id="inr1"> Input1: Air Temperature <br>\
Output1: Daily Degree Days <br> Output2: Daily Degree Day Accumulation<br> Output3: % Development <br> Parameters<br>\
<div id="inr2"> Base = <input id="WDDBase" type="number"> C \
<br> Upper Limit = <input id="WDDUL" type="number"> C<br>\
 Max Acc Deg Days = <input id ="WDDMADD" type="number"> degree days<br>\
Scale Factor = <input id="s" type="number"> degree days<br>\
Shape Factor = <input id="k" type="number"> <br>\
</div>'

function WDDModel(data, metadata) {
	WDDBaseTemp = document.getElementById("WDDBase").value
	WDDUL = document.getElementById("WDDUL").value
	WDDMADD = document.getElementById("WDDMADD").value
	WDDs = document.getElementById("s").value
	WDDk = document.getElementById("k").value
	WDDPeriodBegin = document.getElementById("PeriodBegin").value  
	WDDPeriodEnd = document.getElementById("PeriodEnd").value 


	var timecolumn = "Date",
		Calc1 = "Hourly Temp",
		Res1 = "Degree Hour",
		Res2 = "Accumulated Degree Hours";
	Calc2 = "Daily Temp",
		Res3 = "Degree Day",
		Res4 = "Accumulated Degree Days";
	tab = common_tab;
	var Res5 = "% Development",
		x = 0;
	tab += "<th>" + Calc1 + "</th><th>" + Res1 + "</th><th>" + Res2 + "</th><th>" + Res3 + "</th><th>" + Res4 + "</th><th>" + Res5 + "</th> </tr> </thead><tbody>";
	var len = data.length;
	var ADH = 0;
	var rowcounter = 0;

	dailytab = common_daily;
	dailytab += "<th>" + Calc2 + "</th><th>" + Res3 + "</th><th>" + Res4 + "</th><th>" + Res5 + "</th> </tr> </thead><tbody>";
	var ADDavg = 0;
	var previousday = 0;
	var temparray = [];
	isDaily = true; // make sure the hourly table pulls up by default

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
				alert("Can not run the model. Mulitple missing data points.")
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

		tab += "<tr><td>" + data[x].UTC_Date + "</td>";
		tab += "<td>" + data[x].UTC_Time + "</td>";
		tab += "<td>" + data[x].Local_Date + "</td>";
		tab += "<td>" + data[x].Local_Time + "</td>";
		tab += "<td>" + data[x].Day_of_Year + "</td>";
		tab += "<td>" + data[x].Hour_of_Day + "</td>";
		//Hourly Temp
		tab += "<td>" + round(temp, 2) + "</td> <td>";
		let WDH = temp - WDDBaseTemp;
		if (WDH < 0) {
			WDH = 0
		}
		//Degree Hour
		tab += round(WDH, 2) + "</td><td>";

		ADH = ADH + round(WDH, 2)
		//Accumulated Degree Hours
		tab += round(ADH, 2) + "</td><td>";
		let WDD =round(WDH / 24, 2)
		//Degree Day
		tab +=  WDD + "</td> <td>";
		let ADD = round(ADH / 24, 2);
		//Accumulated Degree Days
		tab += ADD + "</td><td>";
		let prcntDev = (100 * (1 - Math.exp(-((ADD / WDDs) ** WDDk))));
		tab += prcntDev.toFixed(2) + "</td></tr>";
		
		let currentday = parseInt(data[x].Day_of_Year); // current day
		if (rowcounter == 1){previousday = currentday;} // ensure previousday and currentday are equal initially

		// if the current day of year is different from the last one
		if (previousday != currentday) {
			let dailytot = 0;
			// calculate the average temp for the day
			for (var i = 0; i < temparray.length; i++) {
				dailytot += parseFloat(temparray[i]);
			}
			let dailytemp = dailytot/temparray.length;
			
			// add a row to dailytab
			dailytab += "<tr><td>" + data[x].Local_Date + "</td>";
			dailytab += "<td>" + data[x].Day_of_Year + "</td>";
			dailytab += "<td>" + round(dailytemp, 1) + "</td>";
			let WDDavg = dailytemp - WDDBaseTemp;
			if (WDDavg < 0) {
				WDDavg = 0
			}
			dailytab += "<td>" + round(WDDavg, 2) + "</td>";
			ADDavg = ADDavg + round(WDDavg, 2);
			dailytab += "<td>" + round(ADDavg, 2) + "</td>";
			let prcntDev = (100 * (1 - Math.exp(-((ADDavg / WDDs) ** WDDk))));
			dailytab += "<td>" + prcntDev.toFixed(2) + "</td></tr>";
			// clear temparray and set the previous day to the current day
			temparray = [];
			previousday = currentday;
		}
		temparray.push(temp);

		x++;
	}

	NAME = metadata[0].name;
	LATITUDE = metadata[0].latitude;
	LONGITUDE = metadata[0].longitude;
	ELEVATION = metadata[0].elevation;

	tab += "</tbody></table>"
	dailytab += "</tbody></table>"

	HTMLPage = tab;
	tab += "<div class=\"dijitDialogPaneActionBar\">"
	dailytab += "<div class=\"dijitDialogPaneActionBar\">"
	//tab+="<input id=\"ModelName\" data-dojo-type=\"dijit/form/TextBox\" type=\"textbox\" data-dojo-props=\"placeHolder: 'DD:RDM:V1'\">"

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

	//name of CSV if downloaded
	if (fromRunClick && modelMode) { csvName = runStr } else {
		csvName = userInitials + ' WDD ' + selectedStation + ' ' + WDDPeriodBegin + ' ' + WDDPeriodEnd;
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

	WeatherData.set("content", dailytab);
	var table = $('#Results').DataTable({
		"scrollY": "400px",
		"scrollCollapse": true,
		"paging": false,
		"order": []

	});

	if (isNamedRun === true && selectedStationArrayLength > 1) {
		SaveRun();
	} else {
		WeatherData.show();
		table.columns.adjust().draw();
	}
	document.getElementById('loading').style.display = 'none';
}
