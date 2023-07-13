/* eslint-disable no-useless-escape */
/* eslint-disable no-redeclare */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
function removeDBRun(R) {
	$.ajax({
		url: 'RemoveRuns.php',
		data: {
			'RunNum': R,
			'ModelIndex': modelIndex,
			'user_id': user.user_id
		},
		type: 'POST'
	}).done(function (reply) {
		//console.log(reply)
		//PullUserRuns(modelIndex);
	});
}

async function getoffset(LATITUDE, LONGITUDE, Date) {
	await $.ajax({
		url: 'getOffset.php',
		data: {
			'LAT': LATITUDE,
			'LONG': LONGITUDE,
			'DATE': Date
		},
		type: 'POST'
	}).done(function (reply) {
		console.log(reply);
		console.log(typeof (reply));
		let spli = reply.split(",");
		timezone = spli[2];
		console.log(typeof(timezone));
		timezone = timezone.trim();
		console.log(timezone);
		OFFSET = spli[0];
		STZC = spli[1];
		console.log(OFFSET, STZC);
		//GWModel(data);
	});

}

function removeSavedModel(R) {
	$.ajax({
		url: 'RemoveSavedModels.php',
		data: {
			'RunNum': R,
			'ModelIndex': modelIndex,
			'user_id': user.user_id
		},
		type: 'POST'
	}).done(function (reply) {
		//console.log(reply)
		//PullUserRuns(modelIndex);
	});


}




function removeItem(R) {

	var run = document.getElementById(R);
	if (run) {
		run.remove();
		removeDBRun(R);

	}
	var ul = document.getElementById("SessionRuns");
	if (ul) {
		if (ul.childNodes.length == 1) {
			document.getElementById("ActiveRuns").innerHTML = "";
			RunNum = 0;

			switch (modelIndex) {
				case 0:
					GWRunNum = 0;
					break;
				case 1:
					DDRunNum = 0;

					break;
				case 2:
					LDDRunNum = 0;
					break;
				case 3:
					LLDDRunNum = 0;
					break;
				case 4:
					WDDRunNum = 0;
					break;
				case 5:
					TDRRunNum = 0;
					break;
				case 6:
					CARTRunNum =0;
					break;
			}

		}
	}
}

function removeItem2(R) {
	var run = document.getElementById(R);
	console.log(R);
	if (run) {
		try {
			var lis = document.getElementById('SessionRuns').getElementsByTagName('li'); //list of Session Runs

			var warnin = '<p style="color:black">This will delete all runs saved under this model.  Do you wish to continue?</p><div class="dijitDialogPaneActionBar"><button data-dojo-type="dijit.form.Button" type="button" data-dojo-props="onClick:function(){dijit.byId(\'ModelWarning\').hide(); removeItem2Part2(\'' + R + '\');}">OK</button><button data-dojo-type="dijit.form.Button" type="button" data-dojo-props="onClick:function(){dijit.byId(\'ModelWarning\').hide(); }">Cancel</button></div>'


			ModelWarning.set("content", warnin)
			ModelWarning.show();
		} catch {
			removeSavedModel(R);
			leaveModelMode();
		}
	}
}

function removeItem2Part2(R) {
	console.log('test');
	var run = document.getElementById(R);
	//var c = confirm("This will delete all runs saved under this model.  Do you wish to continue?");
	//if (c) {
	var toDelete = []; //runs to delete
	var lis = document.getElementById('SessionRuns').getElementsByTagName('li'); //list of Session Runs
	let modelNamethatran = run.getElementsByTagName('span')[0].textContent; //name of model to be deleted

	//get runs that include the model name
	for (var p = 0; p < lis.length; p++) {
		nm = lis[p].innerHTML.toString().includes(modelNamethatran);
		if (nm) {
			console.log(lis[p].innerHTML);
			id = lis[p].getElementsByTagName('span')[0].id.replace('ID', '');
			toDelete.push(id);
		}
	}

	//remove each run
	for (var p = 0; p < toDelete.length; p++) {
		removeItem(toDelete[p]);
	}
	run.remove();
	let Ru = R.replace('DB', '');
	removeSavedModel(Ru);
	//}	
	var ul = document.getElementById("SavedUserModels");
	if (ul) {
		if (ul.childNodes.length == 1) {
			document.getElementById("SavedModels").innerHTML = "";
			//document.getElementById("ActiveRuns").innerHTML = "";
			// get out of model mode
			leaveModelMode();

		}
	}
}

// Prevent end date from going up by one
function maintainEndDate(PeriodEnd) {
	PeriodEnd = Date.parse(PeriodEnd);
	PeriodEnd = new Date(PeriodEnd);
	PeriodEnd = PeriodEnd.getFullYear() + "-" + appendLeadingZeroes(PeriodEnd.getMonth() + 1) + "-" + appendLeadingZeroes(PeriodEnd.getDate());
	return PeriodEnd;
}



function addItem(val, RunNum) {
	var ul = document.getElementById("ActiveRuns").innerHTML;
	//	console.log(ul);
	if (ul == "") {
		document.getElementById("ActiveRuns").innerHTML = string + string2
	}
	// Hide 'Save As Model' if on 'Get Weather'
	if (modelIndex === 0) {
		var saveAsModelBtn = document.getElementById('SaveAsModel');
		if (saveAsModelBtn) {
			saveAsModelBtn.style.display = 'none';
		}
	}

	ul = document.getElementById("SessionRuns");

	var li = document.createElement("li");
	li.setAttribute('id', RunNum);
	li.setAttribute('onclick', "removeItem(" + RunNum + ")");
	var span = document.createElement("span");
	//console.log("on load isNamedRun is " + isNamedRun);
	span.setAttribute('id', RunNum + 'ID');
	if (!isNamedRun) {
		span.setAttribute('onclick', "PopulateVars(" + RunNum + "); fromRunClick = true");
	} else {
		span.setAttribute('onclick', "PopulateVars(" + RunNum + "); fromRunClick = true; runStr = \'" + val + "\'; event.stopPropagation(); setTimeout(function(){},1000);");
	}
	span.innerHTML = val;
	li.prepend(span);
	ul.prepend(li);
	//	console.log(ul.childNodes);

}

function addItem2(val, RunNum) {
	var ul = document.getElementById("SavedUserModels");
	var li = document.createElement("li");
	li.setAttribute('id', RunNum + 'DB');
	li.setAttribute('onclick', "removeItem2(" + '\'' + RunNum + 'DB' + '\'' + ")");
	var span = document.createElement("span");
	span.setAttribute('id', RunNum + 'ID');
	span.setAttribute('onclick', "PopulateModels(" + '\'' + RunNum + 'DB' + '\'' + ")");
	span.innerHTML = val;
	li.prepend(span);
	ul.prepend(li);
	//	console.log(ul.childNodes);

}



function SaveModelParams(ModelTemplateName, Params, ModelName) {

	$.ajax({
		url: 'DBqueries.php',
		data: {
			ModelTemplateName,
			Params,
			ModelName
		},
		type: 'POST'
	}).done(function (reply) {
		alert(reply)
	});
}

//Function to Download the Model results

function downloadCSV(csv, filename) {
	var csvFile;
	//	var downloadLink;

	// CSV file
	csvFile = new Blob([csv], {
		type: "text/csv"
	});

	// Download link
	downloadLink = document.createElement("a");

	// File name
	downloadLink.download = filename;

	// Create a link to the file
	downloadLink.href = window.URL.createObjectURL(csvFile);

	// Hide download link
	downloadLink.style.display = "none";

	// Add the link to DOM
	//document.body.appendChild(downloadLink);
	//downloadLink.click();
	//document.body.removeChild(downloadLink);
	// Click download link

	var conf = '<p style="color:black">The file containing these observations is called <br><b>' + filename + '</b><br> It will be downloaded to your hard drive.</p><div class="dijitDialogPaneActionBar"><button data-dojo-type="dijit.form.Button" type="button" data-dojo-props="onClick:function(){dijit.byId(\'CSVPrompt\').hide(); exportTableToCSVPart2(\'' + filename + '\');}">OK</button><button data-dojo-type="dijit.form.Button" type="button" data-dojo-props="onClick:function(){dijit.byId(\'CSVPrompt\').hide(); }">Cancel</button></div>'


	CSVPrompt.set("content", conf)
	CSVPrompt.show();

	//	downloadLink.click();
	//console.log(downloadLink);

}


function exportTableToCSVPart2() {
	console.log(downloadLink);
	downloadLink.click();
}


function exportTableToCSV(filename) {


	switch (modelIndex) {
		case 0:
			params = '';
			break;
		case 1:
			params = '\n Base,' + DDBaseTemp + ',,,StationID,' + selectedStation +'\n Upper Limit,' + DDUL + ',,,Latitude,' + LATITUDE +' \n Max Acc Degree Days,' + DDMADD +',,,Longitude,' + LONGITUDE + '\n,,,,Elevation,' + ELEVATION 

			break;
		case 2:
			params = '\n Base,' + LDDBaseTemp + ',,, StationID,' + selectedStation +'\n Upper Limit,' +LDDUL +',,, Latitude,' + LATITUDE +'\n50 % Acc Degree Days,' + LDDFACC + ',,,Longitude,' + LONGITUDE + ' \n Max Acc Degree Days,' + LDDMADD + ',,,Elevation,' + ELEVATION + '\n Rate of Development,' + LDDk
			
			break;
		case 3:
			params = '\n Base,' + LLDDBaseTemp + '\n Upper Limit,' + LLDDUL + ',,, Latitude,' + LATITUDE +'\n50 % Acc Degree Days,' + LLDDFACC + ',,,Longitude,' + LONGITUDE + '\n Max Acc Degree Days,' + LLDDMADD + ',,,Elevation,' + ELEVATION +'\n Rate of Development,' + LLDDk
			
			break;
		case 4:
			params = '\n Base,' + WDDBaseTemp + ',,, StationID,' + selectedStation +'\n Upper Limit,' + WDDUL + ',,, Latitude,' + LATITUDE +'\n Max Acc Degree Days,' + WDDMADD + ',,,Longitude,' + LONGITUDE +'\n Shape Factor,' + WDDk + ',,,Elevation,' + ELEVATION + '\n Scale Factor,' + WDDs
			
			break;
		case 5:
			params = '\n c,' + TDRc +  ',,, StationID,' + selectedStation +'\n PTMIN,' + TDRPTMIN +  ',,, Latitude,' + LATITUDE +'\n PTMAX,' + TDRPTMAX + ',,,Longitude,' + LONGITUDE + '\n PTOPT,' + TDRPTOPT + ',,,Elevation,' + ELEVATION +'\n OTD,' + TDROTD
			
			break;
		case 6:
			params = '\n,,,,StationID,' + selectedStation + '\n,,,,Latitude,' + LATITUDE + '\n,,,,Longitude,' + LONGITUDE + '\n,,,,Elevation,' + ELEVATION 

	}
	var csv = ['Model,' + modelName + ',,, Station Name,' + NAME + params];
	var weather = document.querySelector("#WeatherData");
	var rows = weather.querySelectorAll("table tr");

	for (var i = 1; i < rows.length; i++) {
		var row = [],
			cols = rows[i].querySelectorAll("td, th");

		for (var j = 0; j < cols.length; j++)
			row.push(cols[j].innerText);

		csv.push(row.join(","));
	}
	//console.log(csv);
	// Download CSV file
	downloadCSV(csv.join("\n"), filename);

}

//Function To calculate a daynumber, see:
// https://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366/27790471#27790471
//https://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366

function dayNo(y, m, d) {
	return --m >= 0 && m < 12 && d > 0 && d < 29 + (
		4 * (y = y & 3 || !(y % 25) && y & 15 ? 0 : 1) + 15662003 >> m * 2 & 3
	) && m * 31 - (m > 1 ? (1054267675 >> m * 3 - 6 & 7) - y : 0) + d;
}

function round(value, decimals) {
	return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

//Get the Data


//Populate the textBox and Put dropdown into list

function stationFilter() {
	var ss = document.getElementById("Station").value;
	if (ss == '') { document.getElementById("run").style.display = "none" }
	//Note this options filter code is superceded by the html5 datalist element
	//	var input, filter, ul, li, a, i, txtValue;
	//	input = document.getElementById("searchInput");
	//	filter = input.value.toUpperCase();
	//	ul = document.getElementById("stationList");
	//	li = ul.getElementsByTagName("li");
	//	for (i = 0; i < li.length; i++) {
	//		a = li[i].getElementsByTagName("a")[0];
	//		txtValue = a.textContent || a.innerText;
	//		if (txtValue.toUpperCase().indexOf(filter) > -1) {
	//			li[i].style.display = "";
	//		} else {
	//			li[i].style.display = "none";
	//		}
	//	}
}


// Hide/show elements by class after clicking a button
function btnHide(classname) {
	var x = document.getElementsByClassName(classname);
	for (var i = 0; i < x.length; i++) {
		if (x[i].style.display === "none") {
			x[i].style.display = "block";
		} else {
			x[i].style.display = "none";
		}
	}
}

// Hide/show elements by id after clicking a button
function btnHideId(idname) {
	var x = document.getElementById(idname);
	if (x.style.display === "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}


// disable following elements when current one is not selected, enable when it is
function disableFollowing(currentId, followingIds) {
	let val = document.getElementById(currentId).getElementsByTagName('select')[0].value;
		console.log(val);
		console.log(followingIds.length);
		console.log(followingIds);
		for (let j = 0; j < followingIds.length; j++) {
		if (val == 'undefined') {
			disableDiv(followingIds[j], true);
		} else {
			disableDiv(followingIds[j], false);
			//stop enabling if this element is not selected
		
				console.log(j);
				console.log(document.getElementById(followingIds[j]));
				try{
				console.log(document.getElementById(followingIds[j]).getElementsByTagName('select')[0].value );}
				catch{document.getElementById(followingIds[j]).getElementsByTagName('select')[0].value = 'undefined'

				}
			if (document.getElementById(followingIds[j]).getElementsByTagName('select')[0].value == 'undefined') {
				break;
			}
			
		}
	}
	templateHide();
}

// Hides 'Stations' and 'inputs' if 'Template' is disabled, shows them if 'Template' is enabled
function templateHide() {
	let template = document.getElementById('Template');
	if (template.disabled == true) {
		document.getElementById('Stations').style.display = 'none';
		document.getElementById('inputs').style.display = 'none';
		
	} else {
		let templ = template.getElementsByTagName('select')[0].selectedIndex;
		if (templ != 0) {
			document.getElementById('Stations').style.display = 'block';
			document.getElementById('inputs').style.display = 'block';
			document.getElementById('SavedModels').style.display = 'block';
		}
	}
}

// disable(true) or enable(false) all the elements in a div
function disableDiv(divId, bool) {
	let nodes = document.getElementById(divId).getElementsByTagName('*');
	//disable if true
	if (bool) {
		document.getElementById(divId).disabled = true;
		for (var i = 0; i < nodes.length; i++) {
			nodes[i].disabled = true;
		}
	}
	//enable if false
	else {
		document.getElementById(divId).disabled = false;
		for (var i = 0; i < nodes.length; i++) {
			nodes[i].disabled = false;
		}
	}
}

//stores selected values for refresh
function storeForRefresh(selectid, setname) {
	//stores variable in localStorage on change
	document.getElementById(selectid).onchange = function () {
		localStorage.setItem(setname, document.getElementById(selectid).getElementsByTagName('select')[0].selectedIndex);
	};

	//sets the variable to the value in localstorage
	if (localStorage.getItem(setname)) {
		document.getElementById(selectid).getElementsByTagName('select')[0].selectedIndex = localStorage.getItem(setname);
	}

}

// executes every time the template is changed
function onTemplateChange() {
	//	console.log(modelIndex);
	document.getElementById('inputs').style.display = 'block';
	document.getElementById('SavedModels').style.display = 'block';
	// get out of model mode
	leaveModelMode();
}

// Get out of model mode
function leaveModelMode() {
	document.getElementById('StationList').style.display = "none";
	document.getElementById('addStation').style.display = 'none';
	isNamedRun = false;
	switch (modelIndex) {
		case 0:
			GWRunNum = 0;
			break;
		case 1:
			onchangeDD();
			break;
		case 2:
			onchangeLDD()
			break;
		case 3:
			onchangeLLDD()
			break;
		case 4:
			onchangeWDD();
			break;
		case 5:
			onchangeTDR();
			break;

	}
}

function populatestationlist(item, index) {

	var li = document.createElement("li");
	var textnode = document.createTextNode(item);
	li.appendChild(textnode);
	li.setAttribute('id', textnode.textContent);
	li.setAttribute('onclick', 'removeStation("' + textnode.textContent + '")')
	document.getElementById('StationList').prepend(li);

}
// Add stations to model

function addStations() {
	//console.log(userstations);
	var stat = document.getElementById('Station').value;
	if (stat) {

		var li = document.createElement("li");
		var textnode = document.createTextNode(stat);
		//document.getElementById('Station').value = userstations;
		li.appendChild(textnode);
		li.setAttribute('id', textnode.textContent);
		li.setAttribute('onclick', 'removeStation("' + textnode.textContent + '")')
		document.getElementById('StationList').prepend(li);

		/*if (stationcolor == "blue") {
			if (blueuserstations) { blueuserstations.unshift(stat); } else { blueuserstations = []; blueuserstations.unshift(stat) }

			localStorage.setItem('bluestations', JSON.stringify(blueuserstations));
		}*/
		//else {
		if (reduserstations) { reduserstations.unshift(stat); } else { reduserstations = []; reduserstations.unshift(stat); }

		localStorage.setItem('redstations', JSON.stringify(reduserstations));
		//}


	}
}

// Remove stations from model
function removeStation(listId) {


	/*if (stationcolor == "blue") {
		var item = document.getElementById(listId);
		var a = blueuserstations.indexOf(item.id.toString());
		console.log(blueuserstations);
		document.getElementById('StationList').removeChild(item);
		blueuserstations.splice(a, 1);
		console.log(blueuserstations);
		localStorage.setItem('bluestations', JSON.stringify(blueuserstations));
	}*/
	//else {
	var item = document.getElementById(listId);
	var a = reduserstations.indexOf(item.id.toString());
	//console.log(reduserstations, a);
	document.getElementById('StationList').removeChild(item);
	reduserstations.splice(a, 1);
	localStorage.setItem('redstations', JSON.stringify(reduserstations));
	//}



}

// Append leading zeros to date in DDModel.js and friends
function appendLeadingZeroes(n) {
	if (n <= 9) {
		return "0" + n;
	}
	return n
}

//Restrict date inputs to the past
function validDate() {
	var today = new Date().toISOString().split('T')[0];
	document.getElementById("PeriodBegin").setAttribute('max', today);
	document.getElementById("PeriodEnd").setAttribute('max', today);
}
//function RenameModel(M) {
//	var qwerty = '<form data-dojo-type="dijit.form.Form"><div class="dijitDialogPaneContentArea"><label for="nameBox2" value="' + M + '" style="color:black">Model Name: </label><div data-dojo-type="dijit.form.TextBox" data-dojo-props="required:true" id="nameBox2"></div></div><div class="dijitDialogPaneActionBar"><button data-dojo-type="dijit.form.Button" type="button" data-dojo-props="onClick:function(){var newName = dijit.byId(\'nameBox2\').get(\'value\'); dijit.byId(\'RenamePrompt\').hide(); RenameModelPart2(newName);}">OK</button><button data-dojo-type="dijit.form.Button" type="button" data-dojo-props="onClick:function(){dijit.byId(\'RenamePrompt\').hide(); }">Cancel</button></div></form>';/
//	RenamePrompt.set("content", qwerty)
//	RenamePrompt.show();
//}

//function RenameModelPart2(newName) {
//	var ul = document.getElementById("SavedUserModels");
//	if (!ul) {


//		var string = "User Model <ul id=\"SavedUserModels\" style= \"height:100px; overflow:hidden; overflow-y:scroll; list-style-image: url('../images/x.png');\" dir=\"rtl\"; )> </ul>";
		//var string2 = "<button id=\"ReNameModel\" onclick=\"RenameModel('DD:RDM:V1')\">Rename Model</button> <button id=\"ShareModel\" onclick=\"ShareModel()\"> Share Model </button>";
//		var string2 = "<button id=\"ShareModel\" onclick=\"ShareModel()\"> Share Model </button>";
//		document.getElementById("SavedModels").innerHTML = string + string2;
//	};
//	addItem2(newName);

//	console.log(newName);

//}



//endlimit

