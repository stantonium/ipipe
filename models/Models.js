function include(file) {
	var script = document.createElement('script');
	script.src = file;
	script.type = 'text/javascript';
	script.defer = true;

	document.getElementsByTagName('head').item(0).appendChild(script);

}

include('models/DDModel.js');
include('models/LDDModel.js');
include('models/LLDDModel.js');
include('models/WDDModel.js');
include('models/TDRModel.js');
include('models/CARTModel.js');
include('models/ThirdPartyModels/TAMU/RADD.js');
console.log("included");
