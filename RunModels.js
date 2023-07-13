/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
//string constants

// Initialize Cesium viewer
const viewer = new Cesium.Viewer('cesiumContainer', {
	//sceneMode: Cesium.SceneMode.SCENE2D,
	imageryProvider: Cesium.createWorldImagery({
		style: Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS,
	}),
	baseLayerPicker: true,
	sceneModePicker: true,
	timeline: false,

});
var scene = viewer.scene;
var globe = scene.globe;
var screenSpaceEventHandler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
//viewer.scene.debugShowFramesPerSecond = true;

//Initialize the Rectangle selector


/* Default hidden elements
[].forEach.call(document.querySelectorAll('.postrun'), function(el) {
	el.style.display = 'none';
});

[].forEach.call(document.querySelectorAll('.hourlydata'), function(el) {
	el.style.display = 'none';
});

[].forEach.call(document.querySelectorAll('.claro'), function(el) {
	el.style.display = 'none';
});

[].forEach.call(document.querySelectorAll('.modelparams'), function(el) {
	el.style.display = 'none';
});*/


// Toggle html toolbar via grid button
if (user !== 'guest') {
	gridBtn = parent.document.getElementById("iframelink");
	gridBtn.onclick = toggleToolbar;
}
function toggleToolbar() {
	var tb = document.getElementById("toolbar");
	if (tb.style.display === "none") {
		tb.style.display = "block";
	} else {
		tb.style.display = "none";
	}
}



//Set the camera to a US centered tilted view and switch back to moving in world coordinates.
viewer.camera.lookAt(Cesium.Cartesian3.fromDegrees(-98.0, 40.0), new Cesium.Cartesian3(0.0, -4790000.0, 3930000.0));
viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);


screenSpaceEventHandler.setInputAction(function onLeftClick(movement) {
	var pickedFeature = viewer.scene.pick(movement.position);
	if (Cesium.defined(pickedFeature)) {
		console.log(pickedFeature.id)
		var entity = pickedFeature.id;
		console.log(entity.name);
		console.log(modelIndex)
		console.log(user.user_id);
		if (modelIndex == 7){
			let m = userInitials + '_ICS_BC_' + entity.name;
			ScheduleModel('Daily', user.user_id, 'API', 'English', m, 'ics', entity.name);
		}
		else{
			loadISD(entity.id);}
	}
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

loadUS();
loadCommunidadSpain();
//console.log("howdy");


//loadcounty();

//Load the GHCND weather stations as Blue Dots

//loadGHCND();

//Load the ISD weather stations as Red Dots

loadSpain();

//viewer.dataSources.add(ISD_weatherstations);


//Show/hide stations when Period is changed
function periodFilter() { //begin = PeriodBegin, end = PeriodEnd

	let begin = document.getElementById('PeriodBegin').value;
	let end = document.getElementById('PeriodEnd').value;
	//if (begin>end) {alert("Begin Date cannot be greater after End Date")};	

	//Keep begin from being after end, and vice versa
	//document.getElementById('PeriodBegin').setAttribute('max', end);
	//document.getElementById('PeriodEnd').setAttribute('min', begin);

	var redbegin = parseInt(begin.replace(/-/g, ''));
	var redend = parseInt(end.replace(/-/g, ''));
	//console.log(redbegin,redend);
	// console.log(entities);
	// get begin and end of every station, set show to false if not within selected range
	for (var i = 0; i < entities.length; i++) {
		let entity = entities[i];
		var BEGIN = entity.properties.BEGIN._value;
		var END = entity.properties.END._value;
		entity.show = true;
		if (BEGIN > redbegin || END < redend) {
			entity.show = false;
		}
	}
}




// Show run button when enter is pressed in station field
var statInput = document.getElementById("Station");
statInput.addEventListener("keyup", function (event) {
	if (event.keyCode === 13) {
		document.getElementById("run").style.display = "block";
		//console.log('Enter pressed');	
	}
});

statInput.onblur = function () { document.getElementById("run").style.display = "block"; }
statInput.onmouseup = function () { document.getElementById("run").style.display = "block"; }

// Add all the toolbars
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
}, {
	text: 'Botrytis Cinerea (Botrytis)',
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
			if (ModelSource == 'TAMU') {
				deleteCTRParams();
			}
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

sourceChange.addEventListener('change', function () {
       try{document.getElementById('Template').innerHTML='';} catch{};
	var ModelSource = document.getElementById("Source").getElementsByTagName('select')[0].selectedIndex;
switch (ModelSource) {
	case 1:
		ModelSource = 'iPIPE';
		addToolbarMenu(IpipeMenus, 'Template');
		break;
	case 2:
		ModelSource = 'NCSU';
		addToolbarMenu(NCSUMenus, 'Template');
		break;
	case 3:
		ModelSource = 'TAMU';
		//insertCTRParams()
		addToolbarMenu(IpipeMenus, 'Template');
		break;
}
console.log(ModelSource);


	 disableFollowing('Source', ['Template']) }, false);



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
		HideScheduleMenu();
		document.getElementById("StationList").innerHTML = '';
		reduserstations = localStorage.getItem('redstations');
		reduserstations = JSON.parse(reduserstations);
		weathersource = 'GHO';
		viewer.scene.canvas.removeEventListener('click', droppoint);

		//screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
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
		//entities = [];
		//loadISD();
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

	text: 'Schedule history and forecast',
	onselect: function () {

		if (user == 'guest') {
			alert("Must be logged in to use gridded weather");
			window.location.href = "../index.php"
		} else {


			document.getElementById("Station").value = '';//Clear selected station on data source switch
			document.getElementById("StationType").innerHTML = '<br>User area of interest: <button class="add" onclick="switchListeners()">ADD</button><br>'
			document.getElementById("stationElem").style.display = "block";
			document.getElementById("PeriodElem").style.display = "none";
			//document.getElementById("ActiveRuns").style.display = "block";
			document.getElementById("StationList").innerHTML = '';
			userpois = localStorage.getItem('userpois');
			var saveAsModelBtn = document.getElementById('SaveAsModel');
			if (saveAsModelBtn) {
				saveAsModelBtn.style.display = 'none';
			}
			//document.getElementById("PeriodBegin").value = '2022-11-01';

			//	let tomorrow = new Date();
			//	tomorrow.setDate(tomorrow.getDate() + 1);
			//	let Month = tomorrow.getMonth() + 1;
			//	if (Month < 10) {
			//		Month = Month.toString();
			//		Month = '0' + Month;
			//	}
			//	let tm = tomorrow.getDate();
			//	if (tm < 10) {
			//		tm = tm.toString();
			//		tm = '0' + tm;
			//}
			//let HRRRPeriodEnd = tomorrow.getFullYear() + '-' + Month + '-' + tm;
			//document.getElementById("PeriodEnd").value = HRRRPeriodEnd;
			//document.getElementById('PeriodEnd').disabled = true;
			//document.getElementById('ScheduleButton').style.display = 'block';
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
	},
	{
		text: 'Now',
		value: 'Now',
		onselect: function () {
			frequency = 'now';
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

/*
//This code detects period changes. Only necessary if we show/hide run button based on whether a date is selected
var beginChange = document.getElementById('PeriodBegin');
beginChange.addEventListener('change', function() {
	beginVal = beginChange.value;
	console.log(beginVal);
}, false);

var endChange = document.getElementById('PeriodEnd');
endChange.addEventListener('change', function() {
	endVal = endChange.value;
	console.log(endVal);
}, false);
*/

// Store 'Role' selection and load when refreshed
storeForRefresh('Role', 'selectedrole');

// Store 'Group' selection and load when refreshed
storeForRefresh('Group', 'selectedgroup');

// Store 'Pest' selection and load when refreshed
storeForRefresh('Pest', 'selectedpest');

// Store 'Source' selection and load when refreshed
storeForRefresh('Source', 'selectedsource');
//document.getElementById(selectid).getElementsByTagName('select')[0].selectedIndex = localStorage.getItem(setname);
var ModelSource = document.getElementById("Source").getElementsByTagName('select')[0].selectedIndex;
switch (ModelSource) {
	case 1:
		ModelSource = 'iPIPE';
		addToolbarMenu(IpipeMenus, 'Template');
		break;
	case 2:
		ModelSource = 'NCSU';
		addToolbarMenu(NCSUMenus, 'Template');
		break;
	case 3:
		ModelSource = 'TAMU';
		insertCTRParams()
		addToolbarMenu(IpipeMenus, 'Template');
		break;
}
console.log(ModelSource);

// disable elements, then enable them based on selected values
disableDiv('Group', true);
disableDiv('Pest', true);
disableDiv('Source', true);
disableDiv('Template', true);
disableFollowing('Role', ['Group', 'Pest', 'Source', 'Template']);

loadUS();



