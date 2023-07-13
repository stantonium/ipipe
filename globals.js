const string = "<ul id=\"SessionRuns\" style= \"height:100px; overflow:hidden; overflow-y:scroll; list-style-image: url('../images/x.png');\" dir=\"rtl\"; )> </ul>";
const string2 = '<button id="SaveAsModel" onclick="SaveAsModel()"> Save As Model </button>';
const NamedModelString = "User Model <ul id=\"SavedUserModels\" style= \"height:100px; overflow:hidden; overflow-y:scroll; list-style-image: url('../images/x.png');\" dir=\"rtl\"; )> </ul>";
//const  NamedModelString2 = "<button id=\"ReNameModel\" onclick=\"RenameModel()\">Rename Model</button> <button id=\"ShareModel\" onclick=\"ShareModel()\"> Show schedule</button>";
const NamedModelString2 = "<button id=\"ShareModel\" onclick=\"getScheduledModel()\"> Show schedule </button>";
//const ScheduleButton = "<button id=\"ScheduleButton\" onclick=\"ScheduleModelMenu()\"> Schedule Model </button>";
const common_tab = "<table id = \"Results\" border=\"1\" class=\"display\" style=\"color:black\" width = \"100%\"> <thead><tr> \
<th> UTC Date (yyyymmdd) </th><th> UTC Time (hh:mm:ss) </th><th> Local Date </th> <th> Local Time </th> <th>Day of Year (d) </th> \
<th>Hour of Day (hr)</th>"; // These are the time and date columns that are common to all models 
const common_daily = "<table id = \"Results\" border=\"1\" class=\"display\" style=\"color:black\" width = \"100%\"> <thead><tr> \
<th> Local Date </th><th>Day of Year (d) </th>";
//disable rightclick
window.addEventListener("contextmenu", e => e.preventDefault());

const stationMetadata = {
	name: 'Station Name',
	latitude: 'Latitude (deg)',
	longitude: 'Longitude (deg)',
	elevation: 'Elevation (m)'
};

const allResultColumns = {
	UTC_Timestamp: 'primary key',
	UTC_Date: 'UTC Date yyyymmdd',
	UTC_Time: 'UTC Time hh:mm:ss',
	Local_Date: 'Local Date',
	Local_Time: 'Local Time',
	Day_of_Year: 'Day of Year (d)',
	Hour_of_Day: 'Hour of Day (hr)'
};

const DBResultColumns = {
	Sea_Level_Pressure: 'Sea Level Pressure (hPa)',
	Station_Pressure: 'Station Pressure (hPa)',
	Air_Temperature: 'Air Temperature (C)',
	Dew_Point: 'Dew Point (C)',
	Wet_Bulb: 'Wet Bulb (C)',
	Relative_Humidity: 'Relative Humidity (%)',
	Incoming_Solar_Radiation: 'Incoming Solar Radiation (Watts/m2)',
	Cloud_Cover: 'Cloud Cover (%)',
	Wind_Direction: 'Wind Direction (deg)',
	Wind_Speed: 'Wind Speed (m/s)',
	Precipitation: 'Precipitation (mm)',
	Open_Water_Evaporation: 'Open Water Evaporation (mm)',
	Snowfall: 'Snowfall (cm)',
	Snow_Depth: 'Snow Depth (cm)',
	Snow_water_equivalent: 'Snow water equivalent (mm)',
	Net_Radiation: 'Net Radiation'
};
var callnumber = 0;
var isDaily = true;
var tab;
var dailytab;
var modelAbbrev;
var db;

var entities = [];

var reduserstations = [];
reduserstations = localStorage.getItem('redstations');
reduserstations = JSON.parse(reduserstations);
try { var user = parent.getuser(); } catch {
	user = 'guest'
}


var IndexDbNotFound = 0;

// globals for all results
var selectedStation;
var selectedStationArrayLength;

var NAME;
var LATITUDE;
var LONGITUDE;
var ELEVATION;
var OFFSET;
var STZC;
var timezone;

//GW Paremeter Defaults
var GWRunNum = 0;
var GWselectedstation;
var GWPeriodBegin;
var GWPeriodEnd;
var GWUserRuns;

//DD Parameter Defaults
var DDRunNum = 0;
var DDBaseTemp = 10;
var DDLL = 1;
var DDUL = 20;
var DDMADD = 25;
var DDPeriodBegin;
var DDPeriodEnd;
var DDselectedstation;
var DDUserRuns;

//LDD Paremeter Defaults
var LDDRunNum = 0;
var LDDBaseTemp = 10;
var LDDLL = 1;
var LDDUL = 20;
var LDDk = 0.004;
var LDDMADD = 25;
var LDDFACC = 1500;
var LDDPeriodBegin;
var LDDPeriodEnd;
var LDDselectedstation;
var LDDUserRuns;

//LLDD Paremeter Defaults
var LLDDRunNum = 0;
var LLDDBaseTemp = 10;
var LLDDLL = 1;
var LLDDUL = 20;
var LLDDk = 21;
var LLDDMADD = 25;
var LLDDFACC = 1500;
var LLDDPeriodBegin;
var LLDDPeriodEnd;
var LLDDselectedstation;
var LLDDUserRuns;

//WDD Paremeter Defaults
var WDDRunNum = 0;
var WDDBaseTemp = 10;
var WDDLL = 1;
var WDDUL = 20;
var WDDs = 25;
var WDDk = 30;
var WDDMADD = 25;
var WDDPeriodBegin;
var WDDPeriodEnd;
var WDDselectedstation;
var WDDUserRuns;

//TDR Paremeter Defaults
var TDRRunNum = 0;
var TDRc = 1;
var TDRPTMIN = 20;
var TDRPTMAX = 30;
var TDRPTOPT = 25;
var TDROTD = 35;
var TDRPeriodBegin;
var TDRPeriodEnd;
var TDRselectedstation;
var TDRUserRuns;
// CART has no parameers
var CARTRunNum = 0;
var CARTPeriodBegin;
var CARTPeriodEnd;
var CARTselectedstation;
var CARTUserRuns;


var DBRun = [];
//var PulledRuns = [];
var modelIndex = 0;
var modelName;
//var below for LDD+LLDD+WDD(shape factor)
var k = 63;
//var below for WDD
var s = 74;
//var below for TDR
var c = 90;
var PTMIN = 89;
var PTMAX = 78;
var PTOPT = 67;
var OTD = 56;

// Boolean for named models
var isNamedRun = false;
var fromRunClick = false;
var modelMode = false;
var ActiveSaved = '';
// Other globals
var DexieSuccess = false;
var PeriodBegin;
var PeriodEnd;
var SelectedRun;
var SelectedNamedRun;
var SelectedModel;
var selectedstat;
var weathersource;

//Globals used for LocalPoints
var PointName;
var userPOI;
var yellowRectangle;
//area of interest
var NorthWestCorner;
var NorthEastCorner;
var SouthWestCorner;
var SouthEastCorner;
var longitudes;
var latitudes;
const pinBuilder = new Cesium.PinBuilder();
//userprofilevariables
var role = localStorage.getItem('selectedrole');

if (user !== 'guest' && user) {
	var patt = /\b[a-zA-Z]/g;
	var userInitials = user.name.match(patt);
	//console.log("User Name:" + user.name);
	userInitials = userInitials.toString().replace(/,/g, '');

	parent.document.getElementById("User").innerHTML = user.name + ' (' + userInitials + ')';
	//	onchangeGW();

}
