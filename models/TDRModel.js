/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

function TDRgetRun(R) {

	$.ajax({
		url: './models/TDRgetRun.php',
		data: {
			'User': user,
			'R': R
		},
		type: 'POST'
	}).done(reply => {
		var TDRUserRun = JSON.parse(reply);
		console.log(TDRUserRun);
		if (TDRUserRun) {
			if (TDRUserRun[0].station) {
				TDRselectedstation = TDRUserRun[0].station;
				console.log(TDRselectedstation);
				TDRPeriodBegin = TDRUserRun[0].TimePeriod.replace("\)", "");
				TDRPeriodBegin = TDRPeriodBegin.replace('[', '');
				TDRPeriodBegin = TDRPeriodBegin.split(',');
				TDRPeriodEnd = TDRPeriodBegin[1];
				// Prevent end date from going up by one
				TDRPeriodEnd = maintainEndDate(TDRPeriodEnd);
				console.log(TDRPeriodEnd);

				TDRPeriodBegin = TDRPeriodBegin[0];
				TDRc = TDRUserRun[0].c;
				TDRPTMIN = TDRUserRun[0].PTMIN;
				TDRPTMAX = TDRUserRun[0].PTMAX;
				TDRPTOPT = TDRUserRun[0].PTOPT;
				TDROTD = TDRUserRun[0].OTD;

				document.getElementById("c").value = TDRUserRun[0].c;
				document.getElementById("PTMIN").value = TDRUserRun[0].PTMIN;
				document.getElementById("PTMAX").value = TDRUserRun[0].PTMAX;
				document.getElementById("PTOPT").value = TDRUserRun[0].PTOPT;
				document.getElementById("OTD").value = TDRUserRun[0].OTD;
				document.getElementById("Station").value = TDRselectedstation
				if (TDRselectedstation.length > 1) { document.getElementById("run").style.display = "block" }
				document.getElementById("PeriodBegin").value = TDRPeriodBegin;
				document.getElementById("PeriodEnd").value = TDRPeriodEnd;
				PeriodBegin = TDRPeriodBegin;
				PeriodEnd = TDRPeriodEnd;
				HTMLPage = TDRUserRun[0].HTMLPage;
				NAME = TDRUserRun[0].StationName;
				LATITUDE = TDRUserRun[0].Latitude;
				LONGITUDE = TDRUserRun[0].Longitude;
				ELEVATION = TDRUserRun[0].Elevation;

			}
			if (!isNamedRun) {
			csvName = userInitials + ' TDR ' + TDRselectedstation + ' ' + TDRPeriodBegin + ' ' + TDRPeriodEnd
			}
			else {
				csvName = TDRUserRun[0].Name;
			}
			if (!modelMode && !fromRunClick) {
				checkmodelmode(TDRselectedstation);
			}
			if (fromRunClick) {
				checkmodelmode(TDRselectedstation);
			}
		}
		
		return;
	})
}

function onchangeTDR() {
	//First populate saved
	//console.log("Am I running?");
	document.getElementById("SavedModels").innerHTML = "";
	document.getElementById("Stations").style.display = "block";

	$.ajax({
		url: './models/TDRgetModels.php',
		data: {
			'User': user
		},
		type: 'POST'
	}).done(reply => {

		if (reply) {
			//console.log(reply);

			var TDRUserModels = JSON.parse(reply);

			//console.log(TDRUserModels);
		}

		if (TDRUserModels) {
			TDRRunNum = TDRUserModels.TDRMAX;
			//	console.log(RunNum);
			var length = TDRUserModels.TDR.length;
			//console.log(length);

			document.getElementById("SavedModels").innerHTML = NamedModelString + NamedModelString2;
			TDRUserModels.TDR.forEach(Run => addItem2(Run.Name, Run.RunNum));

			//console.log(TDRUserModels.TDR);

		}

	})
	//NOwpopulateruns
	document.getElementById("ActiveRuns").innerHTML = "";

	$.ajax({
		url: './models/TDR.php',
		data: {
			'User': user
		},
		type: 'POST'
	}).done(reply => {

		if (reply) {
			//console.log(reply);

			var TDRUserRuns = JSON.parse(reply);
			//console.log(TDRUserRuns);
		}
		document.getElementById("inputs").innerHTML = "";
		inputs.insertAdjacentHTML('afterbegin', TDRModelHTML);

		if (TDRUserRuns) {
			if (TDRUserRuns.TDRMAX > TDRRunNum) {
				TDRRunNum = TDRUserRuns.TDRMAX
			}

			//console.log(TDRRunNum);
			if (TDRRunNum) {
				var length = TDRUserRuns.TDR.length;
				//console.log(length);
				TDRselectedstation = TDRUserRuns.TDR[length - 1].station;
				//console.log(TDRselectedstation);
				TDRPeriodBegin = TDRUserRuns.TDR[length - 1].TimePeriod.replace("\)", "");
				TDRPeriodBegin = TDRPeriodBegin.replace('[', '');
				TDRPeriodBegin = TDRPeriodBegin.split(',');
				TDRPeriodEnd = TDRPeriodBegin[1];
				TDRPeriodBegin = TDRPeriodBegin[0];

				document.getElementById("ActiveRuns").innerHTML = string + string2;
				TDRUserRuns.TDR.forEach(Run => addItem(Run.Name, Run.RunNum));

				// Prevent end date from going up by one
				TDRPeriodEnd = maintainEndDate(TDRPeriodEnd);
				//console.log(TDRPeriodEnd);

				//console.log(TDRUserRuns.TDR);

			}

		}



		document.getElementById("c").value = TDRc
		document.getElementById("PTMIN").value = TDRPTMIN
		document.getElementById("PTMAX").value = TDRPTMAX
		document.getElementById("PTOPT").value = TDRPTOPT
		document.getElementById("OTD").value = TDROTD
		document.getElementById("Station").value = TDRselectedstation;
		document.getElementById("PeriodBegin").value = TDRPeriodBegin;
		document.getElementById("PeriodEnd").value = TDRPeriodEnd;

		//Filter stations by period on change
		periodFilter();

	})

}



// Temperature Development Rate Model
const TDRModelHTML = '<div id="inr1"> Input 1:  Air Temperature <br>\
Output1: % Development <br> Parameters<br>\
<div id="inr2"> <br>\
c = <input id="c" type="number"> <br>\
PTMIN = <input id="PTMIN" type="number"> C <br>\
PTMAX = <input id="PTMAX" type="number"> C<br>\
PTOPT = <input id ="PTOPT" type="number"> C<br>\
OTD = <input id="OTD" type="number"> days<br>\
</div>'
//add back if asked to: Expterm = <input id="Expterm" type="number"> <br>

function TDRModel(data,metadata) {
	//	 Expterm = document.getElementById("Expterm").value
	TDRc = document.getElementById("c").value
	TDRPTMIN = document.getElementById("PTMIN").value
	TDRPTMAX = document.getElementById("PTMAX").value
	TDRPTOPT = document.getElementById("PTOPT").value
	TDROTD = document.getElementById("OTD").value
	TDRPeriodBegin = document.getElementById("PeriodBegin").value  
	TDRPeriodEnd = document.getElementById("PeriodEnd").value 

	tab = common_tab;
	var Input1 = "Hourly Air Temperature",
		Output1 = "% Development",
		x = 0;
	//tab += "<th>" + Input1 + "</th> <th> Tminterm </th> <th> Tmaxterm </th> <th> Expterm </th> <th> Development Rate </th> <th> AdjDevRate</th> <th> " + Output1 + "</th></tr> </thead><tbody>";
	tab += "<th>" + Input1 + "</th> <th> " + Output1 + "</th></tr> </thead><tbody>";

	var len = data.length;
	var AdjDevTotal = 0;
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
		
		var DevRate = 0;
			var Tminterm;
			var Tmaxterm;
			var Expterm;
		if (temp < TDRPTMIN || temp > TDRPTMAX) {
			DevRate = 0;
			Tminterm = 0;
			Tmaxterm = 0;
			Expterm = 0;
		} else {
			Tminterm = (temp - TDRPTMIN) / (TDRPTOPT - TDRPTMIN);
			Tmaxterm = (TDRPTMAX - temp) / (TDRPTMAX - TDRPTOPT);
			Expterm = (TDRPTMAX - TDRPTOPT) / (TDRPTOPT - TDRPTMIN);
			DevRate = ((Tminterm) * (Tmaxterm ** Expterm)) ** TDRc;
		}
		let AdjDevRate = ((DevRate) / TDROTD) / 24;
		AdjDevTotal = AdjDevTotal + AdjDevRate;
		let prcntDev = (AdjDevTotal * 100);
		
		tab += "<td>" + temp + "</td>";
		//tab += "<td>" + Tminterm + "</td>";
		//tab += "<td>" + Tmaxterm + "</td>";
		//tab += "<td>" + Expterm + "</td>";
		//tab += "<td>" + DevRate + "</td>";
		//tab += "<td>" + AdjDevRate + "</td>";
		tab += "<td>" + prcntDev.toFixed(2) + "</td> </tr>";
		x++;
	}

	NAME = metadata[0].name;
	LATITUDE = metadata[0].latitude;
	LONGITUDE = metadata[0].longitude;
	ELEVATION = metadata[0].elevation;

	tab += "</tbody></table>"
	HTMLPage = tab;
	tab += "<div class=\"dijitDialogPaneActionBar\">"
	//tab+="<input id=\"ModelName\" data-dojo-type=\"dijit/form/TextBox\" type=\"textbox\" data-dojo-props=\"placeHolder: 'DD:RDM:V1'\">"


	if (fromRunClick === false) {
		tab += "<button data-dojo-type=\"dijit/form/Button\" type=\"button\""
		tab += "<id=\"Save\"onClick=\"SaveRun\">Save</button>"
	}
	tab += "<button data-dojo-type=\"dijit/form/Button\" type=\"button\""

	//name of CSV if downloaded
	if (fromRunClick && modelMode) { csvName = runStr } else {
		csvName = userInitials + ' TDR ' + selectedStation + ' ' + TDRPeriodBegin + ' ' + TDRPeriodEnd;
	}
	tab += "id=\"Download\"onClick=\"exportTableToCSV('" + csvName + ".csv')\">Download CSV</button>"

	tab += "<button data-dojo-type=\"dijit/form/Button\" type=\"button\""
	tab += "id=\"ChartData\"onClick=\"TDRChart()\">Chart</button>"

	tab += "<button data-dojo-type=\"dijit/form/Button\" type=\"button\""
	tab += "id=\"cancel\"onClick=\"WeatherData.hide()\">Cancel</button></div>"

	WeatherData.set("content", tab);
	var table = $('#Results').DataTable({
		"scrollY": "400px",
		"scrollCollapse": true,
		"paging": false

	});

	if (isNamedRun === true && selectedStationArrayLength > 1) {
		SaveRun();
	} else {
		WeatherData.show();
		table.columns.adjust().draw();
	}
	document.getElementById('loading').style.display = 'none';
}
