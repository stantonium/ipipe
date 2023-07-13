/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

function GetModelName() {
	ModelName = dijit.byId('nameBox').get('value');
	dijit.byId('ModelPrompt').hide();
	SaveAsModelPart2();
}


function SaveAsModel() {
	var ModelAbbrev = "";
	switch (modelIndex) {

		case 0: ModelAbbrev = "GW"; break;
		case 1: ModelAbbrev = "DD"; break;
		case 2: ModelAbbrev = "LDD"; break;
		case 3: ModelAbbrev = "LLDD"; break;
		case 4: ModelAbbrev = "WDD"; break;
		case 5: ModelAbbrev = "TDR"; break;
		
	}
	
	var MN = userInitials + " " + ModelAbbrev;
	var uiop = '<form data-dojo-type="dijit.form.Form" onsubmit="GetModelName(); return false"><div class="dijitDialogPaneContentArea"><label for="nameBox" style="color:black">Model Name: </label><div data-dojo-type="dijit.form.TextBox" data-dojo-props="required:true" id="nameBox" value="';
	uiop += MN;
	uiop += '"></div></div><div class="dijitDialogPaneActionBar"><button data-dojo-type="dijit.form.Button" type="button" data-dojo-props="onClick:GetModelName">OK</button><button data-dojo-type="dijit.form.Button" type="button" data-dojo-props="onClick:function(){ModelName = null; dijit.byId(\'ModelPrompt\').hide(); }">Cancel</button></div> </form>';
	ModelPrompt.set("content", uiop)
	ModelPrompt.show();
}


function SaveAsModelPart2() {
	var now = new Date();

	if (!ModelName) { alert('Please enter a model name.'); return }


	var ul = document.getElementById("SavedUserModels");
	if (!ul) {

		document.getElementById("SavedModels").innerHTML = NamedModelString + NamedModelString2;
	}


	function SavetoGW(ModelName) {
		$.ajax({
			url: './models/GWSaveAsModel.php',
			data: {
				"Name": ModelName,
				"station": GWselectedstation,
				"TimePeriod": "[" + GWPeriodBegin + "," + GWPeriodEnd + "]",
				"user_id": parseInt(user.user_id),
				"RunNum": GWRunNum,
				"datelastrun": now.toLocaleString("en-US").replace("/", "-").replace("/", "-").replace(",", "").trim(),
				"weathersource": weathersource
			},

			type: 'POST'
		});
	}
	function SavetoDD(ModelName) {
		$.ajax({
			url: './models/DDSaveAsModel.php',
			data: {
				"Name": ModelName,
				"base": DDBaseTemp,
				"maxaccdd": DDMADD,
				"station": DDselectedstation,
				"TimePeriod": "[" + DDPeriodBegin + "," + DDPeriodEnd + "]",
				"user_id": parseInt(user.user_id),
				"datelastrun": now.toLocaleString("en-US").replace("/", "-").replace("/", "-").replace(",", "").trim(),
				"RunNum": DDRunNum,
				"limits": "[" + DDLL + "," + DDUL + "]",
				"weathersource": weathersource
			},

			type: 'POST'
		}).done(reply => { if (reply.length > 2) { alert(reply); } else { addItem2(ModelName, DDRunNum) } })
	}

	function SavetoLDD(ModelName) {
		$.ajax({
			url: './models/LDDSaveAsModel.php',
			data: {
				"Name": ModelName,
				"base": LDDBaseTemp,
				"maxaccdd": LDDMADD,
				"k": LDDk,
				"station": LDDselectedstation,
				"TimePeriod": "[" + LDDPeriodBegin + "," + LDDPeriodEnd + "]",
				"user_id": parseInt(user.user_id),
				"datelastrun": now.toLocaleString("en-US").replace("/", "-").replace("/", "-").replace(",", "").trim(),
				"RunNum": LDDRunNum,
				"limits": "[" + LDDLL + "," + LDDUL + "]",
				"lddfacc": LDDFACC,
				"weathersource": weathersource
			},

			type: 'POST'
		}).done(reply => { if (reply.length > 2) { alert(reply); } else { addItem2(ModelName, LDDRunNum) } })

	}

	function SavetoLLDD(ModelName) {
			$.ajax({
				url: './models/LLDDSaveAsModel.php',
				data: {
					"Name": ModelName,
					"base": LLDDBaseTemp,
					"maxaccdd": LLDDMADD,
					"k": LLDDk,
					"station": LLDDselectedstation,
					"TimePeriod": "[" + LLDDPeriodBegin + "," + LLDDPeriodEnd + "]",
					"user_id": parseInt(user.user_id),
					"datelastrun": now.toLocaleString("en-US").replace("/", "-").replace("/", "-").replace(",", "").trim(),
					"RunNum": LLDDRunNum,
					"limits": "[" + LLDDLL + "," + LLDDUL + "]",
					"llddfacc": LLDDFACC,
					"weathersource": weathersource
				},

				type: 'POST'
			}).done(reply => { if (reply.length > 2) { alert(reply); } else { addItem2(ModelName, LLDDRunNum) } })

		}

		function SavetoWDD(ModelName) {
			$.ajax({
				url: './models/WDDSaveAsModel.php',
				data: {
					"Name": ModelName,
					"base": WDDBaseTemp,
					"maxaccdd": WDDMADD,
					"s": WDDs,
					"k": WDDk,
					"station": WDDselectedstation,
					"TimePeriod": "[" + WDDPeriodBegin + "," + WDDPeriodEnd + "]",
					"user_id": parseInt(user.user_id),
					"datelastrun": now.toLocaleString("en-US").replace("/", "-").replace("/", "-").replace(",", "").trim(),
					"RunNum": WDDRunNum,
					"limits": "[" + WDDLL + "," + WDDUL + "]",
					"weathersource": weathersource
				},

				type: 'POST'
			}).done(reply => { if (reply.length > 2) { alert(reply); } else { addItem2(ModelName, WDDRunNum) } })

		}

		function SavetoTDR(ModelName) {
			$.ajax({
				url: './models/TDRSaveAsModel.php',
				data: {
					"Name": ModelName,
					"c": TDRc,
					"PTMIN": TDRPTMIN,
					"PTMAX": TDRPTMAX,
					"PTOPT": TDRPTOPT,
					"OTD": TDROTD,
					"station": TDRselectedstation,
					"TimePeriod": "[" + TDRPeriodBegin + "," + TDRPeriodEnd + "]",
					"user_id": parseInt(user.user_id),
					"datelastrun": now.toLocaleString("en-US").replace("/", "-").replace("/", "-").replace(",", "").trim(),
					"RunNum": TDRRunNum,
					"weathersource": weathersource

				},

				type: 'POST'
			}).done(reply => { if (reply.length > 2) { alert(reply); } else { addItem2(ModelName, TDRRunNum) } })

		}

		function SavetoCART(ModelName) {
			$.ajax({
				url: './models/CARTSaveAsModel.php',
				data: {
					"Name": ModelName,
					"station": CARTselectedstation,
					"TimePeriod": "[" + CARTPeriodBegin + "," + CARTPeriodEnd + "]",
					"user_id": parseInt(user.user_id),
					"datelastrun": now.toLocaleString("en-US").replace("/", "-").replace("/", "-").replace(",", "").trim(),
					"RunNum": CARTRunNum,
					"weathersource": weathersource

				},

				type: 'POST'
			}).done(reply => { if (reply.length > 2) { alert(reply); } else { addItem2(ModelName, CARTRunNum) } })

		}
//this is the end of the saved functions
//now get the parameters and save the models

	if (modelIndex == 0) {
		GWRunNum += 1;
		//console.log(GWRunNum);
		SavetoGW(ModelName);
	} else if (modelIndex == 1) {
		DDRunNum += 1;
		DDBaseTemp = document.getElementById("DDBase").value;
		DDMADD = document.getElementById("DDMADD").value;
		DDUL = document.getElementById("DDUL").value;
		DDselectedstation = document.getElementById("Station").value;
		SavetoDD(ModelName)


	} else if (modelIndex == 2) {
		LDDRunNum += 1;

		//console.log(modelIndex);

		
		LDDBaseTemp = document.getElementById("LDDBase").value;
		LDDUL = document.getElementById("LDDUL").value;
		LDDMADD = document.getElementById("LDDMADD").value;
		LDDk = document.getElementById("k").value;
		LDDFACC = document.getElementById("LDDFACC").value;
		LDDselectedstation = document.getElementById("Station").value;
		SavetoLDD(ModelName);
	} else if (modelIndex == 3) {
		LLDDRunNum += 1;

		//console.log(modelIndex);


		
		LLDDBaseTemp = document.getElementById("LLDDBase").value;
		LLDDUL = document.getElementById("LLDDUL").value;
		LLDDMADD = document.getElementById("LLDDMADD").value;
		LLDDk = document.getElementById("k").value;
		LLDDFACC = document.getElementById("LLDDFACC").value;
		LLDDselectedstation = document.getElementById("Station").value;
		SavetoLLDD(ModelName);


	} else if (modelIndex == 4) {
		WDDRunNum += 1;

		//console.log(modelIndex);

		
		WDDBaseTemp = document.getElementById("WDDBase").value;
		WDDUL = document.getElementById("WDDUL").value;
		WDDMADD = document.getElementById("WDDMADD").value;
		WDDs = document.getElementById("s").value;
		WDDk = document.getElementById("k").value;
		WDDselectedstation = document.getElementById("Station").value;
		SavetoWDD(ModelName);

	} else if (modelIndex == 5) {
		TDRRunNum += 1;

		//console.log(modelIndex);
		TDRc = document.getElementById("c").value;
		TDRPTMIN = document.getElementById("PTMIN").value;
		TDRPTMAX = document.getElementById("PTMAX").value;
		TDRPTOPT = document.getElementById("PTOPT").value;
		TDROTD = document.getElementById("OTD").value;
		TDRselectedstation = document.getElementById("Station").value;
		SavetoTDR(ModelName);

	}
	else if (modelIndex ==6) {
		CARTselectedstation = document.getElementById("Station").value;
		SavetoCART(ModelName);
	}
}
