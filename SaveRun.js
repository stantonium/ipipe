/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
/* eslint-disable no-undef */
/* eslint-disable no-inner-declarations */
function SaveRun(s) {
	//console.log(fromRunClick);
	console.log(s);
	console.log(selectedStation);
	console.log(typeof (selectedStation));
	if (typeof (selectedStation) != "string") {
		selectedStation = document.getElementById("Station");
	}
	var now = new Date();

	//console.log(HTMLPage); 
	console.log(typeof (WeatherData));
	console.log(WeatherData);
	//document.getElementById("WeatherData").style.display = "none"; 
	WeatherData.hide();


	//console.log(modelIndex);
	//Code here to insert val into the ActiveRuns array.  Insert an object which contains val as RunName and all the parameters that go with it.

	//console.log(selectedStation);

	if (modelIndex == 0) {
		GWRunNum += 1;
		//console.log(GWRunNum);
		if (GWRunNum == 1) { document.getElementById("ActiveRuns").innerHTML = string + string2; }
		var val = userInitials + '&nbspGW&nbsp' + selectedStation + '&nbsp' + PeriodBegin + '&nbsp' + PeriodEnd + '<br>' + now;
		if (isNamedRun) { val = document.getElementById(ActiveSaved).innerHTML + now }

		addItem(val, GWRunNum);


		function SavetoGW() {
			$.ajax({
				url: './models/GWSaveRuns.php',
				data: {
					"Name": val,
					"station": selectedStation,
					"TimePeriod": "[" + PeriodBegin + "," + PeriodEnd + "]",
					"user_id": parseInt(user.user_id),
					"RunNum": GWRunNum,
					"datelastrun": now.toLocaleString("en-US").replace("/", "-").replace("/", "-").replace(",", "").trim()
				},

				type: 'POST'
			});
		}
		SavetoGW();
	} else if (modelIndex == 1) {
		DDRunNum += 1;
		if (DDRunNum == 1) { document.getElementById("ActiveRuns").innerHTML = string + string2; }
		//console.log(selectedStation);
		//console.log(PeriodBegin);
		//console.log(PeriodEnd);
		var val = userInitials + '&nbspDD&nbsp' + selectedStation + '&nbsp' + PeriodBegin + '&nbsp' + PeriodEnd + '<br>' + now;
		if (isNamedRun) {
			let str = document.getElementById(ActiveSaved).innerHTML;
			str = str.split(">");
			str = str[1];
			str = str.split("/");
			str = str[0];
			str = str.replace("<", "&nbsp;");
			//console.log(str);
			val = str + selectedStation + '&nbsp' + PeriodBegin + '&nbsp' + PeriodEnd + '<br>' + now
		}

		addItem(val, DDRunNum);

		function SavetoDD() {
			$.ajax({
				url: './models/DDSaveRuns.php',
				data: {
					"Name": val,
					"base": DDBaseTemp,
					"maxaccdd": DDMADD,
					"station": selectedStation,
					"TimePeriod": "[" + PeriodBegin + "," + PeriodEnd + "]",
					"user_id": parseInt(user.user_id),
					"datelastrun": now.toLocaleString("en-US").replace("/", "-").replace("/", "-").replace(",", "").trim(),
					"RunNum": DDRunNum,
					"limits": "[" + DDLL + "," + DDUL + "]"

				},

				type: 'POST'
			});
		}
		SavetoDD();

	} else if (modelIndex == 2) {
		LDDRunNum += 1;
		if (LDDRunNum == 1) { document.getElementById("ActiveRuns").innerHTML = string + string2; }

		//console.log(modelIndex);

		var val = userInitials + '&nbspLDD&nbsp' + selectedStation + '&nbsp' + PeriodBegin + '&nbsp' + PeriodEnd + '<br>' + now;
		if (isNamedRun) {
			let str = document.getElementById(ActiveSaved).innerHTML;
			str = str.split(">");
			str = str[1];
			str = str.split("/");
			str = str[0];
			str = str.replace("<", "&nbsp;");
			console.log(str);
			val = str + selectedStation + '&nbsp' + PeriodBegin + '&nbsp' + PeriodEnd + '<br>' + now
		}


		addItem(val, LDDRunNum);

		function SavetoLDD() {
			$.ajax({
				url: './models/LDDSaveRuns.php',
				data: {
					"Name": val,
					"base": LDDBaseTemp,
					"maxaccdd": LDDMADD,
					"k": LDDk,
					"station": selectedStation,
					"TimePeriod": "[" + PeriodBegin + "," + PeriodEnd + "]",
					"user_id": parseInt(user.user_id),
					"datelastrun": now.toLocaleString("en-US").replace("/", "-").replace("/", "-").replace(",", "").trim(),
					"RunNum": LDDRunNum,
					"limits": "[" + LDDLL + "," + LDDUL + "]",
					"lddfacc": LDDFACC
				},

				type: 'POST'
			});
		}
		SavetoLDD();
	} else if (modelIndex == 3) {
		LLDDRunNum += 1;
		if (LLDDRunNum == 1) { document.getElementById("ActiveRuns").innerHTML = string + string2; }

		//console.log(modelIndex);
		var val = userInitials + '&nbspLLDD&nbsp' + selectedStation + '&nbsp' + PeriodBegin + '&nbsp' + PeriodEnd + '<br>' + now;
		if (isNamedRun) {
			let str = document.getElementById(ActiveSaved).innerHTML;
			str = str.split(">");
			str = str[1];
			str = str.split("/");
			str = str[0];
			str = str.replace("<", "&nbsp;");
			//console.log(str);
			val = str + selectedStation + '&nbsp' + PeriodBegin + '&nbsp' + PeriodEnd + '<br>' + now
		}


		addItem(val, LLDDRunNum);

		function SavetoLLDD() {
			$.ajax({
				url: './models/LLDDSaveRuns.php',
				data: {
					"Name": val,
					"base": LLDDBaseTemp,
					"maxaccdd": LLDDMADD,
					"k": LLDDk,
					"station": selectedStation,
					"TimePeriod": "[" + PeriodBegin + "," + PeriodEnd + "]",
					"user_id": parseInt(user.user_id),
					"datelastrun": now.toLocaleString("en-US").replace("/", "-").replace("/", "-").replace(",", "").trim(),
					"RunNum": LLDDRunNum,
					"limits": "[" + LLDDLL + "," + LLDDUL + "]",
					"llddfacc": LLDDFACC
				},

				type: 'POST'
			});
		}
		//console.log("Here")
		SavetoLLDD();
		//console.log("There")

	} else if (modelIndex == 4) {
		WDDRunNum += 1;
		if (WDDRunNum == 1) { document.getElementById("ActiveRuns").innerHTML = string + string2; }

		console.log(modelIndex);
		var val = userInitials + '&nbspWDD&nbsp' + selectedStation + '&nbsp' + PeriodBegin + '&nbsp' + PeriodEnd + '<br>' + now;
		if (isNamedRun) {
			let str = document.getElementById(ActiveSaved).innerHTML;
			str = str.split(">");
			str = str[1];
			str = str.split("/");
			str = str[0];
			str = str.replace("<", "&nbsp;");
			console.log(str);
			val = str + selectedStation + '&nbsp' + PeriodBegin + '&nbsp' + PeriodEnd + '<br>' + now
		}

		addItem(val, WDDRunNum);
		function SavetoWDD() {
			$.ajax({
				url: './models/WDDSaveRuns.php',
				data: {
					"Name": val,
					"base": WDDBaseTemp,
					"maxaccdd": WDDMADD,
					"s": WDDs,
					"k": WDDk,
					"station": selectedStation,
					"TimePeriod": "[" + PeriodBegin + "," + PeriodEnd + "]",
					"user_id": parseInt(user.user_id),
					"datelastrun": now.toLocaleString("en-US").replace("/", "-").replace("/", "-").replace(",", "").trim(),
					"RunNum": WDDRunNum,
					"limits": "[" + WDDLL + "," + WDDUL + "]"
				},

				type: 'POST'
			});
		}

		SavetoWDD();

	} else if (modelIndex == 5) {
		TDRRunNum += 1;
		if (TDRRunNum == 1) { document.getElementById("ActiveRuns").innerHTML = string + string2; }

		//console.log(modelIndex);
		var val = userInitials + '&nbspTDR&nbsp' + selectedStation + '&nbsp' + PeriodBegin + '&nbsp' + PeriodEnd + '<br>' + now;
		if (isNamedRun) {
			let str = document.getElementById(ActiveSaved).innerHTML;
			str = str.split(">");
			str = str[1];
			str = str.split("/");
			str = str[0];
			str = str.replace("<", "&nbsp;");
			//console.log(str);
			val = str + selectedStation + '&nbsp' + PeriodBegin + '&nbsp' + PeriodEnd + '<br>' + now
		}

		addItem(val, TDRRunNum);
		function SavetoTDR() {
			$.ajax({
				url: './models/TDRSaveRuns.php',
				data: {
					"Name": val,
					"c": TDRc,
					"PTMIN": TDRPTMIN,
					"PTMAX": TDRPTMAX,
					"PTOPT": TDRPTOPT,
					"OTD": TDROTD,
					"station": selectedStation,
					"TimePeriod": "[" + PeriodBegin + "," + PeriodEnd + "]",
					"user_id": parseInt(user.user_id),
					"datelastrun": now.toLocaleString("en-US").replace("/", "-").replace("/", "-").replace(",", "").trim(),
					"RunNum": TDRRunNum

				},

				type: 'POST'
			});
		}

		SavetoTDR();

	}else if (modelIndex == 6) {
		CARTRunNum += 1;
		if (CARTRunNum == 1) { document.getElementById("ActiveRuns").innerHTML = string + string2; }

		//console.log(modelIndex);
		var val = userInitials + '&nbspCART&nbsp' + selectedStation + '&nbsp' + PeriodBegin + '&nbsp' + PeriodEnd + '<br>' + now;
		if (isNamedRun) {
			let str = document.getElementById(ActiveSaved).innerHTML;
			str = str.split(">");
			str = str[1];
			str = str.split("/");
			str = str[0];
			str = str.replace("<", "&nbsp;");
			//console.log(str);
			val = str + selectedStation + '&nbsp' + PeriodBegin + '&nbsp' + PeriodEnd + '<br>' + now
		}

		addItem(val, CARTRunNum);
		function SavetoCART() {
			$.ajax({
				url: './models/CARTSaveRuns.php',
				data: {
					"Name": val,
					"station": selectedStation,
					"TimePeriod": "[" + PeriodBegin + "," + PeriodEnd + "]",
					"user_id": parseInt(user.user_id),
					"datelastrun": now.toLocaleString("en-US").replace("/", "-").replace("/", "-").replace(",", "").trim(),
					"RunNum": CARTRunNum

				},

				type: 'POST'
			});
		}

		SavetoCART();

	}
	//schedule the run if we are in model mode and operator mode
	if (role == 2 && modelMode) {
		ScheduleModelMenu();

	}
}
