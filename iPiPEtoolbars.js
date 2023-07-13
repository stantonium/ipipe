// Add all the toolbars
/* eslint-disable no-undef*/
/* eslint-disable no-unused-vars */

function loadipipetoolbar() {
	Sandcastle.addToolbarMenu([
		{
			text: 'Role',
			onselect: function () {
			}
		},
		{
			text: 'Developer',
			value: 'Developer',
			onselect: function () {
				role = 1;
			}
		}, {
			text: 'Operator',
			value: 'Operator',
			onselect: function () {
				role = 2;
			}
		}], 'Role');
	var roleChange = document.getElementById('Role');
	roleChange.addEventListener('change', function () {
		disableFollowing('Role', ['Group', 'Pest', 'Source', 'Template']);
	}, false);
	//console.log("Role:" + selectedrole);
	Sandcastle.addToolbarMenu([
		{
			text: 'Group',
			onselect: function () {
			}
		},
		{
			text: 'Cotton Modelers',
			value: 'Cotton Modelers',
			onselect: function () {
			}
		}, {
			text: 'Fruit Modelers',
			value: 'Fruit Modelers',
			onselect: function () {
			}
		}, {
			text: 'Field Crops',
			value: 'Field Crops',
			onselect: function () {
			}
		}, {
			text: 'Fruit Crops',
			value: 'Fruit Crops',
			onselect: function () {
			}
		}, {
			text: 'Vegetable Crops',
			value: 'Vegetable Crops',
			onselect: function () {
			}
		}, {
			text: 'Nut Crops',
			value: 'Nut Crops',
			onselect: function () {
			}
		}, {
			text: 'User-defined',
			value: 'User-defined',
			onselect: function () {
			}
		}], 'Group');
	var groupChange = document.getElementById('Group');
	groupChange.addEventListener('change', function () { disableFollowing('Group', ['Pest', 'Source', 'Template']) }, false);
	//console.log("Group:" + selectedgroup);
	Sandcastle.addToolbarMenu([{
		text: 'Pest Scientific Name',
		onselect: function () {
			//        alert('one');
		}
	},
	{
		text: 'Botrytis cinerea(Botrytis)',
		value: 'Botrytis',
		onselect: function () {
		}
	},
	{
		text: 'Phyllachora maydis (PHYRMA)',
		value: 'PHYRMA',
		onselect: function () {
		}
	}, {
		text: 'Striacosta albicosta (LOXAAL)',
		value: 'LOXAAL',
		onselect: function () {
		}
	}, {
		text: 'Diabrotica virfifera (DIABVI)',
		value: 'DIABVI',
		onselect: function () {
		}
	}, {
		text: 'Diabrotica barberi (DIABLO)',
		value: 'DIABLO',
		onselect: function () {
		}
	}, {
		text: 'Cysdia pomonella (CARPPO)',
		value: 'CARPPO',
		onselect: function () {
		}
	}, {
		text: 'Harrisina brillians (HARRBR)',
		value: 'HARRBR',
		onselect: function () {
		}
	}, {
		text: 'Delia platura (HYLEPL)',
		value: 'HYLEPL',
		onselect: function () {
		}
	}, {
		text: 'Delia radicum (HYLERA)',
		value: 'HYLERA',
		onselect: function () {
		}
	}, {
		text: 'Rhagoletis completa (RHAGCO)',
		value: 'RHAGCO',
		onselect: function () {
		}
	}, {
		text: 'Sesamia nonagrioides(SESANO)',
		value: 'SESANO',
		onselect: function () {
		}
	}, {
		text: 'User-selected',
		value: 'User-selected',
		onselect: function () {
		}
	}], 'Pest');
	var pestChange = document.getElementById('Pest');
	pestChange.addEventListener('change', function () { disableFollowing('Pest', ['Source', 'Template']) }, false);
	//console.log("Pest:" + selectedpest);

	Sandcastle.addToolbarMenu([
		{
			text: 'Model Template Source',
			onselect: function () {
			}
		}, {
			text: 'iPiPE',
			value: 'iPiPE',
			onselect: function () {
				if (ModelSource == 'TAMU') {
					deleteCTRParams();
				}
				ModelSource = 'iPIPE';
				
			}
		}, {
			text: 'NCSU',
			value: 'NCSU',
			onselect: function () {
				if (user == 'guest') {
					alert("Must be logged in to use NCSU models");
					window.location.href = "../index.php"
				} else {
					if (ModelSource == 'TAMU') {
						deleteCTRParams();
					}
					ModelSource = 'NCSU'; console.log(ModelSource);
				}
			}
		}, {
			text: 'TAMU',
			value: 'TAMU',
			onselect: function () {
				if (user == 'guest') {
					alert("Must be logged in to use TAMU models");
					window.location.href = "../index.php"
				} else {
					ModelSource = 'TAMU'; console.log(ModelSource);
					insertCTRParams();
				}
			}
		}
	], 'Source');

	var sourceChange = document.getElementById('Source');
	sourceChange.addEventListener('change', function () { disableFollowing('Source', ['Template']) }, false);

	Sandcastle.addToolbarMenu([

		{
			text: 'Model Template',
		},
		{
			text: 'Get Weather (GW)',
			onselect: function () {
				modelIndex = 0;
				modelName = 'Get Weather'
				document.getElementById("ActiveRuns").value = "";
				GWselectedstation = '';
				onchangeGW();
				//var saveAsModelBtn = document.getElementById('SaveAsModel');
				//if (saveAsModelBtn){ saveAsModelBtn.style.display = 'none'; }
			}
		},
		{
			text: 'Degree Day (DD)',
			onselect: function () {
				modelIndex = 1;
				modelName = 'Degree Day'
				document.getElementById("ActiveRuns").value = "";
				DDselectedstation = '';
				//onchangeDD();

			}
		}, {
			text: 'Logistic Degree Day (LDD)',
			onselect: function () {
				modelIndex = 2;
				modelName = 'Logistic Degree Day'
				document.getElementById("ActiveRuns").value = "";
				LDDselectedstation = '';

				onchangeLDD();

			}
		}, {
			text: 'Log Logistic Degree Day(LLDD)',
			onselect: function () {
				modelIndex = 3;
				modelName = 'Log Logistic Degree Day'
				document.getElementById("ActiveRuns").value = "";
				LLDDselectedstation = '';
				onchangeLLDD();

			}
		}, {
			text: 'Weibull Degree Day (WDD)',
			onselect: function () {
				modelIndex = 4;
				modelName = 'Weibull Degree Day'
				document.getElementById("ActiveRuns").value = "";
				WDDselectedstation = '';
				onchangeWDD();

			}
		}, {
			text: 'Temperature Development Rate (TDR)',
			onselect: function () {
				modelIndex = 5;
				modelName = 'Temperature Development Rate'
				document.getElementById("ActiveRuns").value = "";
				TDRselectedstation = '';
				onchangeTDR();

			}
		},
		{
			text: 'CART-SLD Leaf Wetness',
			onselect: function () {
				modelIndex = 6;
				modelName = 'CART-SLD Leaf Wetness'
				document.getElementById("ActiveRuns").value = "";
				CARTselectedstation = '';
				onchangeCART();

			}
		}

	], 'Template');
	var templateChange = document.getElementById('Template');
	templateChange.addEventListener('change', onTemplateChange, false);

	Sandcastle.addToolbarMenu([{
		text: 'Data Source',
		onselect: function () {
			document.getElementById("stationElem").style.display = "none";
			document.getElementById("PeriodElem").style.display = "none";
			document.getElementById("ActiveRuns").style.display = "none";
		}
	},
	{

		text: 'Global Hourly Observation',
		onselect: function () {
			document.getElementById("Station").value = '';//Clear selected station on data source switch
			document.getElementById("StationType").innerHTML = '<br>Station: <br>'
			document.getElementById("stationElem").style.display = "block";
			document.getElementById("PeriodElem").style.display = "block";
			document.getElementById("ActiveRuns").style.display = "block";
			document.getElementById("StationList").innerHTML = '';
			reduserstations = localStorage.getItem('redstations');
			reduserstations = JSON.parse(reduserstations);
			weathersource = 'GHO';
			viewer.scene.canvas.removeEventListener('click', droppoint);
			if (reduserstations) { reduserstations.forEach(populatestationlist); }

			for (var i = 0; i < entities.length; i++) {
				entities[i].show = false;
			}
			// Click event listener
			viewer.selectedEntityChanged.addEventListener(function () {
				selectedstat = viewer.selectedEntity;
				console.log(selectedstat)
				if (selectedstat) {
					if (Cesium.defined(selectedstat.properties.ID) && typeof selectedstat.properties.ID != "undefined") {
						selectedStation = document.getElementById("Station").value = selectedstat.properties.ID._value;
					} else if (typeof selectedstat.properties.USAF != "undefined") {
						var USAF = selectedstat.properties.USAF._value.toString();
						var WBAN = selectedstat.properties.WBAN._value.toString();
						while (WBAN.length < 5) {
							WBAN = "0" + WBAN;
						}
						selectedStation = document.getElementById("Station").value = USAF + WBAN;
					} else if (typeof selectedstat.properties.id != "undefined") {
						selectedStation = document.getElementById("Station").value = selectedstat.properties.id._value;
					}
					//		parent.document.getElementById("selectedStation").innerHTML = '&nbsp; ' + selectedStation;
					document.getElementById("run").style.display = "block";

				} else {
					console.log("No Station Selected")
				}
			});
			//console.log(entities);
			entities = [];
			loadISD();
			//$('#StationList > li').remove();//clear station list when switching data sources
		}
	},

	{

		text: 'HRRR (Forecast)',
		onselect: function () {

			if (user == 'guest') {
				alert("Must be logged in to use gridded weather");
				window.location.href = "../index.php"
			} else {

				document.getElementById("Station").value = '';//Clear selected station on data source switch
				document.getElementById("StationType").innerHTML = '<br>User area of interest: <button class="add" onclick="switchListeners()">ADD</button><br>'
				document.getElementById("stationElem").style.display = "block";
				document.getElementById("PeriodElem").style.display = "block";
				document.getElementById("ActiveRuns").style.display = "block";
				document.getElementById("StationList").innerHTML = '';
				let today = new Date()
				let Month = today.getMonth() + 1;
				if (Month < 10) {
					Month = Month.toString();
					Month = '0' + Month;
				}
				let t = today.getDate();
				if (t < 10) {
					t = t.toString();
					t = '0' + t;
				}
				console.log(t);
				console.log(typeof (t));
				let HRRRPeriodBegin = today.getFullYear() + '-' + Month + '-' + t;
				console.log(HRRRPeriodBegin);
				document.getElementById("PeriodBegin").value = HRRRPeriodBegin;
				PeriodBegin = document.getElementById("PeriodBegin").value;
				document.getElementById('PeriodBegin').disabled = true;
				let tomorrow = new Date();
				tomorrow.setDate(tomorrow.getDate() + 1);
				Month = tomorrow.getMonth() + 1;
				if (Month < 10) {
					Month = Month.toString();
					Month = '0' + Month;
				}
				console.log(Month);
				let tm = tomorrow.getDate();
				if (tm < 10) {
					tm = tm.toString();
					tm = '0' + tm;
				}
				let HRRRPeriodEnd = tomorrow.getFullYear() + '-' + Month + '-' + tm;
				document.getElementById("PeriodEnd").value = HRRRPeriodEnd;
				document.getElementById('PeriodEnd').disabled = true;
				document.getElementById('ScheduleButton').style.display = 'none';
				weathersource = 'HRRR';
				viewer.entities.removeAll();
				AddPointEventListener();
				AOISelect();
				for (var i = 0; i < entities.length; i++) {
					entities[i].show = false;
				}
				//console.log(entities);
				entities = [];
				loadPOIs();
				//$('#StationList > li').remove();//clear station list when switching data sources
			}
		}


	},
	/*{
	
		text: 'URMA (History)',
		onselect: function () {
			if (user == 'guest') {
				alert("Must be logged in to use gridded weather");
				window.location.href = "../index.php"
			} else {
	
				document.getElementById("Station").value = '';//Clear selected station on data source switch
				document.getElementById("StationType").innerHTML = '<br>User area of interest: <button class="add" onclick="switchListeners()">ADD</button><br>'
				document.getElementById("stationElem").style.display = "block";
				document.getElementById("PeriodElem").style.display = "block";
				document.getElementById("ActiveRuns").style.display = "block";
				document.getElementById("StationList").innerHTML = '';
				userpois = localStorage.getItem('userpois');
				document.getElementById("PeriodBegin").value = '2021-04-01';
				PeriodBegin = document.getElementById("PeriodBegin").value;
				document.getElementById('PeriodBegin').disabled = true;
				console.log(PeriodBegin);
				let today = new Date();
				let yesterday = new Date(today);
				yesterday.setDate(yesterday.getDate() - 1);
				let URMAPeriodEnd = yesterday.getFullYear();
				let Month = yesterday.getMonth() + 1;
				if (Month < 10) {
					Month = Month.toString();
					Month = '0' + Month;
				}
				let y = yesterday.getDate();
				if (y < 10) {
					y = y.toString();
					y = '0' + y;
				}
				URMAPeriodEnd = URMAPeriodEnd + '-' + Month + '-' + y;
				console.log(URMAPeriodEnd);
				document.getElementById("PeriodEnd").value = URMAPeriodEnd;
				document.getElementById('PeriodEnd').disabled = true;
				document.getElementById('ScheduleButton').style.display = 'none';
				weathersource = 'URMA';
				viewer.entities.removeAll();
				AddPointEventListener();
				AOISelect();
				for (var i = 0; i < entities.length; i++) {
					entities[i].show = false;
				}
				//console.log(entities);
				entities = [];
				loadPOIs();
				//$('#StationList > li').remove();//clear station list when switching data sources
			}
		}
	
	
	},*/
	{

		text: 'URMA + HRRR',
		onselect: function () {

			if (user == 'guest') {
				alert("Must be logged in to use gridded weather");
				window.location.href = "../index.php"
			} else {


				document.getElementById("Station").value = '';//Clear selected station on data source switch
				document.getElementById("StationType").innerHTML = '<br>User area of interest: <button class="add" onclick="switchListeners()">ADD</button><br>'
				document.getElementById("stationElem").style.display = "block";
				document.getElementById("PeriodElem").style.display = "block";
				//document.getElementById("ActiveRuns").style.display = "block";
				document.getElementById("StationList").innerHTML = '';
				userpois = localStorage.getItem('userpois');
				document.getElementById("PeriodBegin").value = '2021-04-01';
				document.getElementById('PeriodBegin').disabled = true;
				let tomorrow = new Date();
				tomorrow.setDate(tomorrow.getDate() + 1);
				let Month = tomorrow.getMonth() + 1;
				if (Month < 10) {
					Month = Month.toString();
					Month = '0' + Month;
				}
				let tm = tomorrow.getDate();
				if (tm < 10) {
					tm = tm.toString();
					tm = '0' + tm;
				}
				let HRRRPeriodEnd = tomorrow.getFullYear() + '-' + Month + '-' + tm;
				document.getElementById("PeriodEnd").value = HRRRPeriodEnd;
				document.getElementById('PeriodEnd').disabled = true;
				document.getElementById('ScheduleButton').style.display = 'none';
				weathersource = 'URMA_HRRR';
				viewer.entities.removeAll();
				AddPointEventListener();
				AOISelect();
				for (var i = 0; i < entities.length; i++) {
					entities[i].show = false;
				}
				//console.log(entities);
				entities = [];
				loadPOIs();
				//$('#StationList > li').remove();//clear station list when switching data sources
			}
		}


	}
	], 'obstype');
	var frequency;
	Sandcastle.addToolbarMenu([
		{
			text: 'Frequency',
			onselect: function () {
			}
		},
		{
			text: 'Daily',
			value: 'Daily',
			onselect: function () {
				frequency = 'daily';
			}
		}, {
			text: 'Weekly',
			value: 'Weekly',
			onselect: function () {
				frequency = 'weekly';
			}
		}], 'frequency');
	var recipient;
	Sandcastle.addToolbarMenu([
		{
			text: 'Recipient',
			onselect: function () {
			}
		},
		{
			text: 'Cotton Modelers',
			value: 'Cotton Modelers',
			onselect: function () {
				recipient = 'Cotton Modelers';
			}
		}, {
			text: 'Fruit Modelers',
			value: 'Fruit Modelers',
			onselect: function () {
				recipient = 'Fruit Modelers';
			}
		}, {
			text: 'Field Crops',
			value: 'Field Crops',
			onselect: function () {
				recipient = 'Field Crops';
			}
		}, {
			text: 'Fruit Crops',
			value: 'Fruit Crops',
			onselect: function () {
				recipient = 'Fruit Crops';
			}
		}, {
			text: 'Vegetable Crops',
			value: 'Vegetable Crops',
			onselect: function () {
				recipient = 'Vegetable Crops';
			}
		}, {
			text: 'Nut Crops',
			value: 'Nut Crops',
			onselect: function () {
				recipient = 'Nut Crops';
			}
		}, {
			text: 'User-defined',
			value: 'User-defined',
			onselect: function () {
				recipient = 'User-defined';
			}
		}], 'recipient');
	var delivery;
	Sandcastle.addToolbarMenu([
		{
			text: 'Delivery',
			onselect: function () {
			}
		},
		{
			text: 'Email',
			value: 'Email',
			onselect: function () {
				delivery = 'email';
			}
		}, {
			text: 'API',
			value: 'API',
			onselect: function () {
				delivery = 'api';
			}
		}], 'delivery');
	var units;
	Sandcastle.addToolbarMenu([
		{
			text: 'Units',
			onselect: function () {
			}
		},
		{
			text: 'English',
			value: 'English',
			onselect: function () {
				units = 'english';
			}
		}, {
			text: 'Metric',
			value: 'Metric',
			onselect: function () {
				units = 'metric';
			}
		}], 'units');
}
