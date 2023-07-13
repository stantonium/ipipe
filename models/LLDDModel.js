/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
function LLDDgetRun(R) {

	$.ajax({
		url: './models/LLDDgetRun.php',
		data: {
			'User': user,
			'R': R
		},
		type: 'POST'
	}).done(reply => {
		var LLDDUserRun = JSON.parse(reply);
		//console.log(LLDDUserRun);
		if (LLDDUserRun) {
			if (LLDDUserRun[0].station) {
				LLDDselectedstation = LLDDUserRun[0].station;
				//console.log(LLDDselectedstation);
				LLDDPeriodBegin = LLDDUserRun[0].TimePeriod.replace("\)", "");
				LLDDPeriodBegin = LLDDPeriodBegin.replace('[', '');
				LLDDPeriodBegin = LLDDPeriodBegin.split(',');
				LLDDPeriodEnd = LLDDPeriodBegin[1];
				// Prevent end date from going up by one
				LLDDPeriodEnd = maintainEndDate(LLDDPeriodEnd);
				//console.log(LLDDPeriodEnd);

				LLDDPeriodBegin = LLDDPeriodBegin[0];
				LLDDBaseTemp = LLDDUserRun[0].base;
				//console.log(LLDDBaseTemp);
				LLDDMADD = LLDDUserRun[0].maxaccdd;
				LLDDFACC = LLDDUserRun[0].llddfacc;
				LLDDLL = LLDDUserRun[0].limits.replace("\)", "");
				LLDDLL = LLDDLL.replace('[', '');
				LLDDLL = LLDDLL.split(',');
				LLDDUL = LLDDLL[1] - 1;
				LLDDLL = LLDDLL[0];
				LLDDK = LLDDUserRun[0].k;
				//console.log("k is: " + LLDDK);
				document.getElementById("LLDDBase").value = LLDDBaseTemp;
				document.getElementById("LLDDMADD").value = LLDDMADD;
				document.getElementById("LLDDFACC").value = LLDDFACC;
				document.getElementById("LLDDUL").value = LLDDUL;
				document.getElementById("k").value = LLDDK;
				document.getElementById("Station").value = LLDDselectedstation;
				if (LLDDselectedstation.length > 1) { document.getElementById("run").style.display = "block" }
				document.getElementById("PeriodBegin").value = LLDDPeriodBegin;
				document.getElementById("PeriodEnd").value = LLDDPeriodEnd;
				PeriodBegin = LLDDPeriodBegin;
				PeriodEnd = LLDDPeriodEnd;

				HTMLPage = LLDDUserRun[0].HTMLPage;
				NAME = LLDDUserRun[0].StationName;
				LATITUDE = LLDDUserRun[0].Latitude;
				LONGITUDE = LLDDUserRun[0].Longitude;
				ELEVATION = LLDDUserRun[0].Elevation;
			}
			if (!isNamedRun) {
				
			csvName = userInitials + ' LLDD ' + LLDDselectedstation + ' ' + LLDDPeriodBegin + ' ' + LLDDPeriodEnd
			}
			else {
				csvName = LLDDUserRun[0].Name;
			}
			if (!modelMode && !fromRunClick) {
				checkmodelmode(LLDDselectedstation);
			}
			if (fromRunClick) {
				checkmodelmode(LLDDselectedstation);
			}
		}
		
		return;

	})
}

function onchangeLLDD() {
	
	//console.log("we are in onchangeLLDD");
	//First populate saved

	document.getElementById("SavedModels").innerHTML = "";
	document.getElementById("Stations").style.display = "block";

	$.ajax({
		url: './models/LLDDgetModels.php',
		data: {
			'User': user
		},
		type: 'POST'
	}).done(reply => {

		if (reply) {
			//console.log(reply);

			var LLDDUserModels = JSON.parse(reply);

			//console.log(LLDDUserModels);
		}

		if (LLDDUserModels) {
			LLDDRunNum = LLDDUserModels.LLDDMAX;
			//	console.log(RunNum);
			var length = LLDDUserModels.LLDD.length;
			//console.log(length);

			document.getElementById("SavedModels").innerHTML = NamedModelString + NamedModelString2;
			LLDDUserModels.LLDD.forEach(Run => addItem2(Run.Name, Run.RunNum));

			//console.log(LLDDUserModels.LLDD);

		}

	})
	//NOwpopulateruns
	document.getElementById("ActiveRuns").innerHTML = "";

	$.ajax({
		url: './models/LLDD.php',
		data: {
			'User': user
		},
		type: 'POST'
	}).done(reply => {

		if (reply) {
			//console.log(reply);

			var LLDDUserRuns = JSON.parse(reply);
			//console.log(LLDDUserRuns);
		}
		document.getElementById("inputs").innerHTML = "";
		inputs.insertAdjacentHTML('afterbegin', LLDDModelHTML);

		if (LLDDUserRuns) {
			if (LLDDUserRuns.LLDDMAX > LLDDRunNum) {
				LLDDRunNum = LLDDUserRuns.LLDDMAX
			}
			//console.log(LLDDRunNum);
			if (LLDDRunNum) {
				var length = LLDDUserRuns.LLDD.length;
				//console.log(length);
				LLDDselectedstation = LLDDUserRuns.LLDD[length - 1].station;
				//console.log(LLDDselectedstation);
				LLDDPeriodBegin = LLDDUserRuns.LLDD[length - 1].TimePeriod.replace("\)", "");
				LLDDPeriodBegin = LLDDPeriodBegin.replace('[', '');
				LLDDPeriodBegin = LLDDPeriodBegin.split(',');
				LLDDPeriodEnd = LLDDPeriodBegin[1];
				LLDDPeriodBegin = LLDDPeriodBegin[0];

				document.getElementById("ActiveRuns").innerHTML = string + string2;
				LLDDUserRuns.LLDD.forEach(Run => addItem(Run.Name, Run.RunNum));

				// Prevent end date from going up by one
				LLDDPeriodEnd = maintainEndDate(LLDDPeriodEnd);
				//console.log(LLDDPeriodEnd);

				//console.log(LLDDUserRuns.LLDD);

				LLDDBaseTemp = LLDDUserRuns.LLDD[length - 1].base;
				//console.log(LLDDBaseTemp);
				LLDDMADD = LLDDUserRuns.LLDD[length - 1].maxaccdd;
				LLDDLL = LLDDUserRuns.LLDD[length - 1].limits.replace("\)", "");
				LLDDLL = LLDDLL.replace('[', '');
				LLDDLL = LLDDLL.split(',');
				LLDDUL = LLDDLL[1] - 1;
				LLDDLL = LLDDLL[0];

			}

		}


		document.getElementById("LLDDBase").value = LLDDBaseTemp;

		document.getElementById("LLDDMADD").value = LLDDMADD;
		document.getElementById("LLDDFACC").value = LLDDFACC;
		document.getElementById("LLDDUL").value = LLDDUL;
		document.getElementById("k").value = LLDDk;
		document.getElementById("Station").value = LLDDselectedstation;
		document.getElementById("PeriodBegin").value = LLDDPeriodBegin;
		document.getElementById("PeriodEnd").value = LLDDPeriodEnd;

		//Filter stations by period on change
		periodFilter();

	})

}



// Log Logistic Degree Day Model
const LLDDModelHTML = '<div id="inr1"> Input1: Air Temperature <br>\
Output1: Daily Degree Days <br> Output2: Daily Degree Day Accumulation<br> Output3: % Development <br> Parameters<br>\
<div id="inr2"> Base = <input id="LLDDBase" type="number"> C \
<br> Upper Limit = <input id="LLDDUL" type="number"> C<br>\
50% ACC Deg Days =<input id ="LLDDFACC" type="number"> degree days<br>\
 Max Acc Deg Days = <input id ="LLDDMADD" type="number"> degree days<br>\
Rate of Development = <input id="k" type="number"> 1/degree days<br>\
</div>'

function LLDDModel(data, metadata) {
	LLDDBaseTemp = document.getElementById("LLDDBase").value
	LLDDUL = document.getElementById("LLDDUL").value
	LLDDMADD = document.getElementById("LLDDMADD").value
	LLDDk = document.getElementById("k").value
	LLDDFACC = document.getElementById("LLDDFACC").value
	LLDDPeriodBegin = document.getElementById("PeriodBegin").value  
	LLDDPeriodEnd = document.getElementById("PeriodEnd").value 

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
		let LLDH = temp - LLDDBaseTemp;
		if (LLDH < 0) {
			LLDH= 0
		}
		//Degree Hour
		tab += round(LLDH, 2) + "</td><td>";

		ADH = ADH + round(LLDH, 2);
		//Accumulated Degree Hour
		tab += round(ADH, 2) + "</td><td>";
		//Degree Day
		let LLDD = round(LLDH/24,3);
		tab += LLDD + "</td> <td>";
		//Accumulated Degree Day
		let ADD = round(ADH/24,3);
		tab += ADD  + "</td><td>";
		let ADD50 = LLDDFACC;
		if (!ADD50) {
			ADD50 = LLDDMADD / 2;
		}
		let LNADD = Math.log(ADD);
		//console.log(LNADD);
		let LNADD50 = Math.log(ADD50);
		let prcntDev = (100 / (1 + Math.exp(-LLDDk * (LNADD - LNADD50))));
		tab += prcntDev.toFixed(3) + "</td></tr>";

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
			let LLDDavg = dailytemp - LLDDBaseTemp;
			if (LLDDavg < 0) {
				LLDDavg = 0
			}
			dailytab += "<td>" + round(LLDDavg, 2) + "</td>";
			ADDavg = ADDavg + round(LLDDavg, 2);
			dailytab += "<td>" + round(ADDavg, 2) + "</td>";
			let ADD50avg = LLDDFACC;
			if (!ADD50avg) {
				ADD50avg = LLDDMADD / 2;
			}
			let LNADD = Math.log(ADDavg);
			let LNADD50 = Math.log(ADD50avg);
			let prcntDev = (100 / (1 + Math.exp(-LLDDk * (LNADD - LNADD50))));
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
		csvName = userInitials + ' LLDD ' + selectedStation + ' ' + LLDDPeriodBegin + ' ' + LLDDPeriodEnd;
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
