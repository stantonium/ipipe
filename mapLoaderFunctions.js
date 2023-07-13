function loadCommunidadSpain()
{
	viewer.dataSources.add(Cesium.GeoJsonDataSource.load('./data/CommunidadAutonoma.geojson', {
		stroke: Cesium.Color.RED,
		fill: Cesium.Color.PINK.withAlpha(0.05),
		strokeWidth: 3
	}));
}

function loadUS() {
	viewer.dataSources.add(Cesium.GeoJsonDataSource.load('./data/ne_10m_us_states_no_texas.topojson', {
		stroke: Cesium.Color.RED,
		fill: Cesium.Color.PINK.withAlpha(0.05),
		strokeWidth: 3
	}));
	viewer.dataSources.add(Cesium.GeoJsonDataSource.load('./data/South Texas.geojson', {
		stroke: Cesium.Color.RED,
		fill: Cesium.Color.PINK.withAlpha(0.05),
		strokeWidth: 3
	}));
	viewer.dataSources.add(Cesium.GeoJsonDataSource.load('./data/North Texas.geojson', {
		stroke: Cesium.Color.RED,
		fill: Cesium.Color.PINK.withAlpha(0.05),
		strokeWidth: 3
	}));
	viewer.dataSources.add(Cesium.GeoJsonDataSource.load('./data/East Texas.geojson', {
		stroke: Cesium.Color.RED,
		fill: Cesium.Color.PINK.withAlpha(0.05),
		strokeWidth: 3
	}));
	viewer.dataSources.add(Cesium.GeoJsonDataSource.load('./data/West Texas.geojson', {
		stroke: Cesium.Color.RED,
		fill: Cesium.Color.PINK.withAlpha(0.05),
		strokeWidth: 3
	}));
	viewer.dataSources.add(Cesium.GeoJsonDataSource.load('./data/Central Texas.geojson', {
		stroke: Cesium.Color.RED,
		fill: Cesium.Color.PINK.withAlpha(0.05),
		strokeWidth: 3
	}));
	viewer.dataSources.add(Cesium.GeoJsonDataSource.load('./data/Panhandle Texas.geojson', {
		id: 'PT',
		stroke: Cesium.Color.RED,
		fill: Cesium.Color.PINK.withAlpha(0.05),
		strokeWidth: 3
	}));
	viewer.dataSources.add(Cesium.GeoJsonDataSource.load('./data/Upper Gulf Coast Texas.geojson', {
		stroke: Cesium.Color.RED,
		fill: Cesium.Color.PINK.withAlpha(0.05),
		strokeWidth: 3
	}));
}

function loadISD(place) {
	var ISDlist;
	var sourcegeojson = './data/state_weather_stations/' + place + '.geojson'
	console.log(sourcegeojson);
	ISD_weatherstations = new Cesium.GeoJsonDataSource.load(sourcegeojson);
	ISD_weatherstations.then(function (dataSource) {
		viewer.dataSources.add(dataSource);
		entities = dataSource.entities.values;
		for (var i = 0; i < entities.length; i++) {
			let entity = entities[i];
			var WBAN = entity.properties.WBAN._value.toString();
			while (WBAN.length < 5) {
				WBAN = "0" + WBAN;
			}

			var USAF = entity.properties.USAF._value.toString();

			var isd = '<option value="' + USAF + WBAN + '">';



			if (WBAN == "99999" || USAF == "999999") {
				entity.show = !entity.show;
				entities.splice(i, 1);
				i--;
			} else { ISDlist += isd; }
			entity.billboard = undefined;
			entity.point = new Cesium.PointGraphics({
				color: Cesium.Color.RED,
				pixelSize: 5
			});
		}
		//Filter stations by period on change
		periodFilter();
		document.getElementById('StationsList').innerHTML = ISDlist;

	});
}

function loadcounty() {
	viewer.dataSources.add(Cesium.GeoJsonDataSource.load('./data/stateswithpoints/North Carolina.geojson', {
		stroke: Cesium.Color.YELLOW,
		fill: Cesium.Color.PINK.withAlpha(0.05),
		strokeWidth: 3
	}));
}


function loadGHCND() {
	var GHCNDlist;
	GHCND_weatherstations = new Cesium.GeoJsonDataSource.load('./data/ghcnd_stations_2023.geojson');
	GHCND_weatherstations.then(function (dataSource) {
		viewer.dataSources.add(dataSource);
		entities = dataSource.entities.values;
		for (var i = 0; i < entities.length; i++) {
			var entity = entities[i];
			var gh = '<option value="' + entity.properties.ID._value.toString() + '">';
			GHCNDlist += gh;

			entity.billboard = undefined;
			entity.point = new Cesium.PointGraphics({
				color: Cesium.Color.BLUE,
				pixelSize: 5
			});
		}
		//Filter stations by period on change
		periodFilter();
		document.getElementById('StationsList').innerHTML = GHCNDlist;
	});
}

function loadSpain() {
	let SpainWeather = './data/state_weather_stations/SP.geojson';
	let Spain_weatherstations = new Cesium.GeoJsonDataSource.load(SpainWeather);
		viewer.dataSources.add(Spain_weatherstations);
	}

    // Load forecast stations as yellow dots Note this is deprecated, was something we were working on with JOE
/*function loadForecast() {

	var Forecast_sites = new Cesium.GeoJsonDataSource.load('./data/fcst.geojson');
	Forecast_sites.then(function (dataSource) {
		viewer.dataSources.add(dataSource);
		entities = dataSource.entities.values;
		for (var i = 0; i < entities.length; i++) {
			let entity = entities[i];
			entity.billboard = undefined;
			entity.point = new Cesium.PointGraphics({
				color: Cesium.Color.YELLOW,
				pixelSize: 5
			});
		}
	});



}
*/