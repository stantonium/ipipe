/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
/* eslint-disable no-undef */
async function checkmodelmode() {
	console.log("checking the modelmode and getting weather");
	//third party model routine
	//console.log(ModelSource);
	//let test = ModelSource == 'iPIPE';
	//console.log(test);
	let selectedsource = localStorage.getItem('selectedsource');
	let table = document.getElementById('ModelMenuTable');
	table = (table.rows[3].cells[1].innerHTML);
	if (table == 'TAMU') {
		ModelSource = 'TAMU'
	}
	console.log(selectedsource);
	if (selectedsource > 1) {
		console.log('running ' + modelName + ' from ' + ModelSource)
		var params;
		selectedStation = document.getElementById('Station').value;
		if (modelName === 'Degree Day') {
			params = '{"Base":' + DDBaseTemp + ',';
			params = params + '"Upper Limit":' + DDUL + ',';
			params = params + '"Max ACC Degree Days":' + DDMADD + '}';
			modelAbbrev = 'DD';
		}
		else if (modelName === 'Logistic Degree Day') {
			params = '{"Base":' + LDDBaseTemp + ',';
			params = params + '"Upper Limit":' + LDDUL + ',';
			params = params + '"50 % Max ACC Degree Days":' + LDDFACC + ',';
			params = params + '"Max ACC Degree Days":' + LDDMADD + ',';
			params = params + '"Rate of Development":' + LDDk + '}';
			modelAbbrev = 'LDD';
		}
		else if (modelName === 'Log Logistic Degree Day') {
			params = '{"Base":' + LLDDBaseTemp + ',';
			params = params + '"Upper Limit":' + LLDDUL + ',';
			params = params + '"50 % Max ACC Degree Days":' + LLDDFACC + ',';
			params = params + '"Max ACC Degree Days":' + LLDDMADD + ',';
			params = params + '"Rate of Development":' + LLDDk + '}';
			modelAbbrev = 'LLDD';
		}
		else if (modelName === 'Weibull Degree Day') {
			params = '{"Base":' + WDDBaseTemp + ',';
			params = params + '"Upper Limit":' + WDDUL + ',';
			params = params + '"Max ACC Degree Days":' + WDDMADD + ',';
			params = params + '"Scale Factor":' + WDDs + ',';
			params = params + '"Shape Factor":' + WDDk + '}';
			modelAbbrev = 'WDD';
		}

		else if (modelName === 'Temperature Development Rate') {
			params = '{"c":' + TDRc + ',';
			params = params + '"PTMIN":' + TDRPTMIN + ',';
			params = params + '"PTMAX":' + TDRPTMAX + ',';
			params = params + '"PTOPT":' + TDRPTOPT + ',';
			params = params + '"OTD":' + TDROTD + '}';
			modelAbbrev = 'TDR';
		}
		else if (modelName === 'CART-SLD Leaf Wetness') {
			params = '{"dummy": 5}';

			modelAbbrev = 'CART';
		}

		if (ModelSource === 'TAMU') {
			let CTR_temp_pref = document.getElementById("CTR_temp_pref").value;
			let CTR_sigma = document.getElementById("CTR_sigma").value;
			let CTR_c = document.getElementById("CTR_c").value;
			console.log(params);
			params = params.slice(0, -1) + ',"CTR_temp_pref":' + CTR_temp_pref + ',"CTR_sigma":' + CTR_sigma + ',"CTR_c":' + CTR_c + '}';
			//modelName = `["Chappell Thermoregulation Model","${modelName}"]`
		}
		PeriodBegin = document.getElementById("PeriodBegin").value
		PeriodEnd = document.getElementById("PeriodEnd").value
		console.log(params + weathersource + PeriodBegin + PeriodEnd + selectedStation)
		$.ajax({
			url: './models/ThirdParty.php',
			data: {
				'ModelSource': ModelSource,
				'modelName': modelName,
				'weathersource': weathersource,
				'params': params,
				'PeriodBegin': PeriodBegin,
				'PeriodEnd': PeriodEnd,
				'selectedStation': selectedStation
			},
			type: 'POST'
		}).then(reply => {
			console.log(reply);
			console.log('ran ' + modelName + ' from ' + ModelSource);
			if (fromRunClick && modelMode && ModelSource == 'iPIPE') { csvName = runStr } else {
				csvName = userInitials + ' modelAbbrev ' + selectedStation + ' ' + PeriodBegin + ' ' + PeriodEnd;
			}
			
				tables = reply.split("|");
				tab = common_tab + tables[0];
				if (!tables[1]){
					alert('No weather found in database! Run this station using an iPiPE model')
				}
				dailytab = common_daily + tables[1];

				tab += "</tbody></table>"
				dailytab += "</tbody></table>"
				tab += "<div class=\"dijitDialogPaneActionBar\">"
				dailytab += "<div class=\"dijitDialogPaneActionBar\">"
				tab += "<button data-dojo-type=\"dijit/form/Button\" type=\"button\""
				tab += "<id=\"toggle\" data-dojo-props= style:'float:left;' onClick=\"ToggleTable\">Show Daily Summary</button>"

				dailytab += "<button data-dojo-type=\"dijit/form/Button\" type=\"button\""
				dailytab += "<id=\"toggle\" data-dojo-props= style:'float:left;' onClick=\"ToggleTable\">Show Hourly Data</button>"
				dailytab += "id=\"Download\"onClick=\"exportTableToCSV('" + csvName + ".csv')\">Download CSV</button>"

				dailytab += "<button data-dojo-type=\"dijit/form/Button\" type=\"button\""
				dailytab += "id=\"ChartData\"onClick=\"ChartData()\">Chart</button>"

				dailytab += "<button data-dojo-type=\"dijit/form/Button\" type=\"button\""
				dailytab += "id=\"cancel\"onClick=\"WeatherData.hide()\">Cancel</button></div>"
				tab += "<button data-dojo-type=\"dijit/form/Button\" type=\"button\""

				tab += "id=\"Download\"onClick=\"exportTableToCSV('" + csvName + ".csv')\">Download CSV</button>"
				tab += "<button data-dojo-type=\"dijit/form/Button\" type=\"button\""
				tab += "id=\"cancel\"onClick=\"WeatherData.hide()\">Cancel</button></div>"
				console.log(dailytab)
				WeatherData.set("content", dailytab);
				var table = $('#Results').DataTable({
					"scrollY": "400px",
					"scrollCollapse": true,
					"paging": false,
					"order": []

				})
				WeatherData.show();
				table.columns.adjust().draw();
			}
		)
	}

	//ipipe model routine
	else {
		console.log(weathersource);
		if (weathersource === 'HRRR') {
			selectedStation = document.getElementById('Station').value;
			console.log(selectedStation);
			getHRRRdata(selectedStation);
		}
		else if (weathersource === 'URMA') {
			PeriodBegin = document.getElementById("PeriodBegin").value;
			PeriodEnd = document.getElementById("PeriodEnd").value;
			if (PeriodBegin == "undefined") {
				alert("please specify the URMA biofix date");
				return;
			}
			if (PeriodEnd == "undefined") {
				alert("please specify the end of the model run");
				return;
			}
			selectedStation = document.getElementById('Station').value;
			console.log(selectedStation);
			getURMAdata(selectedStation);


		} else if (weathersource === 'URMA_HRRR') {
			console.log('need to schedule function')
		}
		else {


			if (isNamedRun === true && fromRunClick === false) {
				selectedStationArray = reduserstations;
			} else {
				// for testing only

				//selectedStationArray = ["72306013722"];
				//modelIndex = 1;
				//console.log(PeriodBegin, PeriodEnd, selectedStationArray);
				//*/
				PeriodBegin = document.getElementById("PeriodBegin").value;
				PeriodEnd = document.getElementById("PeriodEnd").value;
				//console.log(PeriodBegin);
				if (PeriodBegin == "undefined") {
					alert("please specify the biofix date");
					return;
				}
				if (PeriodEnd == "undefined") {
					alert("please specify the end of the model run");
					return;
				}
				selectedStationArray = document.getElementById("Station").value.split(',');
			}
			//console.log("isNamedRun is " + isNamedRun);
			//console.log("fromRunClick is " + fromRunClick);
			selectedStationArrayLength = selectedStationArray.length;
			//console.log("selectedStationArrayLength is " + selectedStationArrayLength);
			var k = 0;
			if (selectedStationArrayLength > 1) {
				while (k < selectedStationArray.length) {
					selectedStation = selectedStationArray[k];
					//console.log(selectedStation);
					await getWeather(selectedStation).then(function () {
						//console.log(selectedStation + " is received");
						//SaveRun(selectedStation);
						//console.log("DexieSuccess is " + DexieSuccess);
						if (DexieSuccess && !fromRunClick && isNamedRun) {
							SaveRun(selectedStation);
						} else { k--; }
						k++;
					});

				}
				document.getElementById('loading').style.display = 'none'; // Enable loading icon
			}
			else {
				//console.log("selected array length is " + selectedStationArrayLength);
				selectedStation = selectedStationArray[k];
				console.log(selectedStation);
				await getWeather(selectedStation).then(function () {
					if (DexieSuccess && !fromRunClick) {
						//SaveRun(selectedStation);
					} else if (!fromRunClick) {
						getWeather(selectedStation);
					}
				})
			}
		}
	}
}
function DisplayModels(SelectedModel) {
	let modname = SelectedModel
	//console.log(modname);
	//	try {
	//		document.getElementById('SessionRuns').innerHTML = '';
	//	} catch (err) {
	//		console.log(err)
	//	}
	switch (modelIndex) {
		case 0:
			GWRunNum = 0;
			break;
		case 1:

			document.getElementById('DDBase').disabled = true;

			document.getElementById('DDUL').disabled = true;
			document.getElementById('DDMADD').disabled = true;
			$.ajax({
				url: './models/DD.php',
				data: {
					'User': user,
					//'Model':SelectedModel
				},
				type: 'POST'
			}).done(reply => {

				if (reply) {
					//			console.log(reply);

					DDUserRuns = JSON.parse(reply);

					DDUserRuns.DD.forEach(Run => {
						if (!Run.Name.includes(";")) { null } else {
							let mname = Run.Name.split(';');
							mname = mname[0].split('&');
							mname = mname[0];
							//console.log(mname);
							//console.log(modname);
							if (mname == modname) {
								addItem(Run.Name, Run.RunNum)
							}
						}
					});
				}
			})

			break;
		case 2:

			document.getElementById('LDDBase').disabled = true;
			document.getElementById('LDDFACC').disabled = true;
			document.getElementById('LDDUL').disabled = true;
			document.getElementById('LDDMADD').disabled = true;
			document.getElementById('k').disabled = true;
			$.ajax({
				url: './models/LDD.php',
				data: {
					'User': user,
					//'Model':SelectedModel
				},
				type: 'POST'
			}).done(reply => {

				if (reply) {
					//			console.log(reply);

					LDDUserRuns = JSON.parse(reply);

					LDDUserRuns.LDD.forEach(Run => {
						if (!Run.Name.includes(";")) { null } else {
							let mname = Run.Name.split(';');
							mname = mname[0].split('&');
							mname = mname[0];
							//console.log(mname);
							//console.log(modname);
							if (mname == modname) {
								addItem(Run.Name, Run.RunNum)
							}
						}
					});
				}
			})

			break;
		case 3:
			document.getElementById('LLDDBase').disabled = true;
			document.getElementById('LLDDFACC').disabled = true;
			document.getElementById('LLDDUL').disabled = true;
			document.getElementById('LLDDMADD').disabled = true;
			document.getElementById('k').disabled = true;
			$.ajax({
				url: './models/LLDD.php',
				data: {
					'User': user,
					//'Model':SelectedModel
				},
				type: 'POST'
			}).done(reply => {

				if (reply) {
					//			console.log(reply);

					LLDDUserRuns = JSON.parse(reply);

					LLDDUserRuns.LLDD.forEach(Run => {
						if (!Run.Name.includes(";")) { null } else {
							let mname = Run.Name.split(';');
							mname = mname[0].split('&');
							mname = mname[0];
							//console.log(mname);
							//console.log(modname);
							if (mname == modname) {
								addItem(Run.Name, Run.RunNum)
							}
						}
					});
				}
			})
			break;
		case 4:
			document.getElementById('WDDBase').disabled = true;

			document.getElementById('WDDUL').disabled = true;
			document.getElementById('WDDMADD').disabled = true;
			document.getElementById('k').disabled = true;
			document.getElementById('s').disabled = true;
			$.ajax({
				url: './models/WDD.php',
				data: {
					'User': user,
					//'Model':SelectedModel
				},
				type: 'POST'
			}).done(reply => {

				if (reply) {
					//			console.log(reply);

					WDDUserRuns = JSON.parse(reply);

					WDDUserRuns.WDD.forEach(Run => {
						if (!Run.Name.includes(";")) { null } else {
							let mname = Run.Name.split(';');
							mname = mname[0].split('&');
							mname = mname[0];
							//console.log(mname);
							//console.log(modname);
							if (mname == modname) {
								addItem(Run.Name, Run.RunNum)
							}
						}
					});
				}
			})
			break;
		case 5:
			document.getElementById('c').disabled = true;

			document.getElementById('PTMIN').disabled = true;
			document.getElementById('PTMAX').disabled = true;
			document.getElementById('PTOPT').disabled = true;
			document.getElementById('OTD').disabled = true;
			$.ajax({
				url: './models/TDR.php',
				data: {
					'User': user,
					//'Model':SelectedModel
				},
				type: 'POST'
			}).done(reply => {

				if (reply) {
					//			console.log(reply);

					TDRUserRuns = JSON.parse(reply);

					TDRUserRuns.TDR.forEach(Run => {
						if (!Run.Name.includes(";")) { null } else {
							let mname = Run.Name.split(';');
							mname = mname[0].split('&');
							mname = mname[0];
							//console.log(mname);
							//console.log(modname);
							if (mname == modname) {
								addItem(Run.Name, Run.RunNum)
							}
						}
					});
				}
			})

			break;
	}

}
function populateModelParams(model) {
	let model1 = model.innerHTML;
	//console.log(model1);

	switch (modelIndex) {
		case 0:

			DDgetRun(model1);
			break;

		case 1:

			DDgetRun(model1);

			break;
		case 2:

			LDDgetRun(model1);

			break;
		case 3:

			LLDDgetRun(model1);

			break;
		case 4:

			WDDgetRun(model1);
			break;
		case 5:

			TDRgetRun(model1);
			break;
	}



}


function PopulateModels(R) {
	fromRunClick = false;
	ActiveSaved = R;
	//console.log(R);
	modelMode = true;
	R = R.replace(/DB/, '');
	let currentSelectedModel = document.getElementById(R + 'ID');

	//Routine that happens when there is a previously Selected Model set
	if (SelectedModel) {
		if (SelectedModel == currentSelectedModel) {
			SelectedModel.setAttribute('style', 'color:white;');
			leaveModelMode();
			SelectedModel = false;
		} else {
			SelectedModel.setAttribute('style', 'color:white;');
			SelectedModel = currentSelectedModel;
			SelectedModel.setAttribute('style', 'color:red;');
		}
		document.getElementById("ActiveRuns").innerHTML = string;
		populateModelParams(SelectedModel);
		DisplayModels(SelectedModel);
	} else
	//Nothing previously selected, go Into model mode and Display the current runs. 
	{
		SelectedModel = currentSelectedModel;
		SelectedModel.setAttribute('style', 'color:red;');
		if (weathersource != 'URMA_HRRR') {
			document.getElementById('addStation').style.display = 'block';
			document.getElementById('StationList').style.display = "block";
			document.getElementById("ActiveRuns").innerHTML = string;
		}
		else {
			ShowScheduleMenu();

		}
		isNamedRun = true;
		var wstations;
		//if (stationcolor == "blue") {
		//	wstations = localStorage.getItem('bluestations');
		//} else {
		wstations = localStorage.getItem('redstations');
		//}
		userstations = JSON.parse(wstations);
		if (userstations == null) { userstations = []; }
		console.log(userstations);
		document.getElementById('StationList').innerHTML = '';
		if (userstations) { userstations.forEach(populatestationlist); }
		populateModelParams(SelectedModel);
		DisplayModels(SelectedModel);

	}

	event.stopPropagation();
}

function PopulateVars(R) {

	var mod = document.getElementById(R + 'ID');

	if (SelectedRun) {
		SelectedRun.setAttribute('style', 'color:white;');
	}
	SelectedRun = mod;
	SelectedRun.setAttribute('style', 'color:red;')
	document.getElementById('loading').style.display = 'block';
	console.log(R);
	switch (modelIndex) {
		case 0:

			GWgetRun(R);
			break;

		case 1:

			DDgetRun(R);


			break;
		case 2:

			LDDgetRun(R);

			break;
		case 3:

			LLDDgetRun(R);

			break;
		case 4:

			WDDgetRun(R);
			break;
		case 5:

			TDRgetRun(R);
			break;
		case 6:
			CARTgetRun(R)
	}

	event.stopPropagation();

}

// Toggle between the houly and daily tables
function ToggleTable() {
	WeatherData.hide();
	//console.log(isDaily);
	if (isDaily == false) {
		WeatherData.set("content", dailytab);
		//console.log("dailytab is " + dailytab)
		var table = $('#Results').DataTable({
			"scrollY": "400px",
			"scrollCollapse": true,
			"paging": false,
			"order": []

		});
		isDaily = true;
		setTimeout(function () { WeatherData.show() }, 500);
		table.columns.adjust().draw();
	} else {
		WeatherData.set("content", tab);
		var table = $('#Results').DataTable({
			"scrollY": "400px",
			"scrollCollapse": true,
			"paging": false

		});
		isDaily = false;
		setTimeout(function () { WeatherData.show(); table.columns.adjust().draw() }, 500);
		//WeatherData.show();


	}
}