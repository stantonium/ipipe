/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
function LDDgetRun(R) {


	$.ajax({
		url: './models/LDDgetRun.php',
		data: {
			'User': user,
			'R': R
		},
		type: 'POST'
	}).done(reply => {
		var LDDUserRun = JSON.parse(reply);
		console.log(LDDUserRun);
		if (LDDUserRun) {
			if (LDDUserRun[0].station) {
				LDDselectedstation = LDDUserRun[0].station;
				console.log(LDDselectedstation);
				LDDPeriodBegin = LDDUserRun[0].TimePeriod.replace("\)", "");
				LDDPeriodBegin = LDDPeriodBegin.replace('[', '');
				LDDPeriodBegin = LDDPeriodBegin.split(',');
				LDDPeriodEnd = LDDPeriodBegin[1];
				// Prevent end date from going up by one
				LDDPeriodEnd = maintainEndDate(LDDPeriodEnd);
				console.log(LDDPeriodEnd);

				LDDPeriodBegin = LDDPeriodBegin[0];
				LDDBaseTemp = LDDUserRun[0].base;
				console.log(LDDBaseTemp);

				LDDLL = LDDUserRun[0].limits.replace("\)", "");
				LDDLL = LDDLL.replace('[', '');
				LDDLL = LDDLL.split(',');
				LDDUL = LDDLL[1] - 1;
				LDDLL = LDDLL[0];
				LDDK = LDDUserRun[0].k;
				console.log("K is:" + LDDK);
				LDDFACC = LDDUserRun[0].lddfacc;
				document.getElementById("LDDBase").value = LDDBaseTemp;
				document.getElementById("LDDFACC").value = LDDFACC;
				document.getElementById("LDDMADD").value = LDDMADD;
				document.getElementById("LDDUL").value = LDDUL;
				document.getElementById("k").value = LDDK;
				document.getElementById("Station").value = LDDselectedstation;
				if (LDDselectedstation.length > 1) { document.getElementById("run").style.display = "block" }

				document.getElementById("PeriodBegin").value = LDDPeriodBegin;
				document.getElementById("PeriodEnd").value = LDDPeriodEnd;
				PeriodBegin = LDDPeriodBegin;
				PeriodEnd = LDDPeriodEnd;

				HTMLPage = LDDUserRun[0].HTMLPage;
				NAME = LDDUserRun[0].StationName;
				LATITUDE = LDDUserRun[0].Latitude;
				LONGITUDE = LDDUserRun[0].Longitude;
				ELEVATION = LDDUserRun[0].Elevation;
			}
			if (!isNamedRun) {
				csvName = userInitials + ' LDD ' + LDDselectedstation + ' ' + LDDPeriodBegin + ' ' + LDDPeriodEnd
			}
			else {
				csvName = LDDUserRun[0].Name;
			}
			if (!modelMode && !fromRunClick) {
				checkmodelmode(LDDselectedstation);
			}
			if (fromRunClick) {
				checkmodelmode(LDDselectedstation);
			}
		}

		return;


	})


}

function onchangeLDD() {

	//First populate saved

	document.getElementById("SavedModels").innerHTML = "";
	document.getElementById("Stations").style.display = "block";

	$.ajax({
		url: './models/LDDgetModels.php',
		data: {
			'User': user
		},
		type: 'POST'
	}).done(reply => {

		if (reply) {
			//console.log(reply);

			var LDDUserModels = JSON.parse(reply);

			//console.log(LDDUserModels);
		}

		if (LDDUserModels) {
			LDDRunNum = LDDUserModels.LDDMAX;
			//	console.log(RunNum);
			var length = LDDUserModels.LDD.length;
			//console.log(length);

			document.getElementById("SavedModels").innerHTML = NamedModelString + NamedModelString2;
			LDDUserModels.LDD.forEach(Run => addItem2(Run.Name, Run.RunNum));

			//console.log(LDDUserModels.LDD);

		}

	})
	//NOwpopulateruns
	document.getElementById("ActiveRuns").innerHTML = "";

	$.ajax({
		url: './models/LDD.php',
		data: {
			'User': user
		},
		type: 'POST'
	}).done(reply => {

		if (reply) {
			//console.log(reply);

			var LDDUserRuns = JSON.parse(reply);
			//console.log(LDDUserRuns);
		}
		document.getElementById("inputs").innerHTML = "";
		inputs.insertAdjacentHTML('afterbegin', LDDModelHTML);

		if (LDDUserRuns) {
			if (LDDUserRuns.LDDMAX > LDDRunNum) {
				LDDRunNum = LDDUserRuns.LDDMAX
			}

			//console.log(LDDRunNum);
			if (LDDRunNum) {
				var length = LDDUserRuns.LDD.length;
				//console.log(length);
				LDDselectedstation = LDDUserRuns.LDD[length - 1].station;
				//console.log(LDDselectedstation);
				// eslint-disable-next-line no-useless-escape
				LDDPeriodBegin = LDDUserRuns.LDD[length - 1].TimePeriod.replace("\)", "");
				LDDPeriodBegin = LDDPeriodBegin.replace('[', '');
				LDDPeriodBegin = LDDPeriodBegin.split(',');
				LDDPeriodEnd = LDDPeriodBegin[1];
				LDDPeriodBegin = LDDPeriodBegin[0];

				document.getElementById("ActiveRuns").innerHTML = string + string2;
				LDDUserRuns.LDD.forEach(Run => addItem(Run.Name, Run.RunNum));

				// Prevent end date from going up by one
				LDDPeriodEnd = maintainEndDate(LDDPeriodEnd);
				//console.log(LDDPeriodEnd);

				//console.log(LDDUserRuns.LDD);

				LDDBaseTemp = LDDUserRuns.LDD[length - 1].base;
				//console.log(LDDBaseTemp);
				LDDMADD = LDDUserRuns.LDD[length - 1].maxaccdd;
				LDDLL = LDDUserRuns.LDD[length - 1].limits.replace("\)", "");
				LDDLL = LDDLL.replace('[', '');
				LDDLL = LDDLL.split(',');
				LDDUL = LDDLL[1] - 1;
				LDDLL = LDDLL[0];

			}
		}


		document.getElementById("LDDBase").value = LDDBaseTemp;

		document.getElementById("LDDMADD").value = LDDMADD;
		document.getElementById("LDDFACC").value = LDDFACC;
		document.getElementById("LDDUL").value = LDDUL;
		document.getElementById("k").value = LDDk;
		document.getElementById("Station").value = LDDselectedstation;
		document.getElementById("PeriodBegin").value = LDDPeriodBegin;
		document.getElementById("PeriodEnd").value = LDDPeriodEnd;

		//Filter stations by period on change
		periodFilter();

	})

}

// Logistic Degree Day Model
const LDDModelHTML = '<div id="inr1"> Input1: Air Temperature <br>\
Output1: Daily Degree Days <br> Output2: Daily Degree Day Accumulation<br> Output3: % Development <br> Parameters<br>\
<div id="inr2"> Base = <input id="LDDBase" type="number"> C \
<br> Upper Limit = <input id="LDDUL" type="number"> C<br>\
50% ACC Deg Days =<input id ="LDDFACC" type="number"> degree days<br>\
 Max Acc Deg Days = <input id ="LDDMADD" type="number"> degree days<br>\
Rate of Development = <input id="k" type="number"> 1/degree days<br>\
</div>'

function LDDModel(data, metadata) {
	LDDBaseTemp = document.getElementById("LDDBase").value
	LDDUL = document.getElementById("LDDUL").value
	LDDMADD = document.getElementById("LDDMADD").value
	LDDk = document.getElementById("k").value
	LDDFACC = document.getElementById("LDDFACC").value
	LDDPeriodBegin = document.getElementById("PeriodBegin").value
	LDDPeriodEnd = document.getElementById("PeriodEnd").value

	var Calc1 = "Hourly Temp",
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
		let LDH = temp - LDDBaseTemp;
		if (LDH < 0) {
			LDH = 0
		}
		//Degree Hour

		tab += round(LDH, 2) + "</td><td>";
		//console.log(LDH);
		//console.log(ADH);
		ADH = ADH + round(LDH, 2)
		//console.log(ADH);
		//Accumulated Degree Hour
		tab += round(ADH, 2) + "</td><td>";
		//Degree Day
		let LDD = round(LDH / 24, 3)
		tab += LDD + "</td> <td>";
		let ADD = ADH / 24;
		//Accumulated Degree Day
		tab += round(ADD, 3) + "</td><td>";

		let ADD50 = LDDFACC;
		if (!ADD50) {
			ADD50 = LDDMADD / 2;
		}

		//console.log(ADD50);
		//console.log(LDDk);
		let prcntDev = (100 / (1 + Math.exp(-LDDk * (ADD - ADD50))));
		//%Development
		tab += prcntDev.toFixed(3) + "</td></tr>";
		//console.log(prcntDev);
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
			let LDDavg = dailytemp - LDDBaseTemp;
			if (LDDavg < 0) {
				LDDavg = 0
			}
			dailytab += "<td>" + round(LDDavg, 2) + "</td>";
			ADDavg = ADDavg + round(LDDavg, 2);
			dailytab += "<td>" + round(ADDavg, 2) + "</td>";
			let ADD50avg = LDDFACC;
			if (!ADD50avg) {
				ADD50avg = LDDMADD / 2;
			}
			let prcntDev = (100 / (1 + Math.exp(-LDDk * (ADDavg - ADD50avg))));
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
	if (fromRunClick && modelMode && ModelSource =='iPIPE') { csvName = runStr } else {
		csvName = userInitials + ' LDD ' + selectedStation + ' ' + LDDPeriodBegin + ' ' + LDDPeriodEnd;
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
