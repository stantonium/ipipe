/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/*Replace the yellow rectangle stuff with actual drawing per cesiums sandcastle 

https://sandcastle.cesium.com/index.html?src=Drawing%20on%20Terrain.html

const viewer = new Cesium.Viewer("cesiumContainer", {
    selectionIndicator: false,
    infoBox: false,
    terrainProvider: Cesium.createWorldTerrain(),
  });
  
  if (!viewer.scene.pickPositionSupported) {
    window.alert("This browser does not support pickPosition.");
  }
  
  viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
    Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
  );
  function createPoint(worldPosition) {
    const point = viewer.entities.add({
      position: worldPosition,
      point: {
        color: Cesium.Color.WHITE,
        pixelSize: 5,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      },
    });
    return point;
  }
  let drawingMode = "line";
  function drawShape(positionData) {
    let shape;
    if (drawingMode === "line") {
      shape = viewer.entities.add({
        polyline: {
          positions: positionData,
          clampToGround: true,
          width: 3,
        },
      });
    } else if (drawingMode === "polygon") {
      shape = viewer.entities.add({
        polygon: {
          hierarchy: positionData,
          material: new Cesium.ColorMaterialProperty(
            Cesium.Color.WHITE.withAlpha(0.7)
          ),
        },
      });
    }
    return shape;
  }
  let activeShapePoints = [];
  let activeShape;
  let floatingPoint;
  const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
  handler.setInputAction(function (event) {
    // We use `viewer.scene.pickPosition` here instead of `viewer.camera.pickEllipsoid` so that
    // we get the correct point when mousing over terrain.
    const earthPosition = viewer.scene.pickPosition(event.position);
    // `earthPosition` will be undefined if our mouse is not over the globe.
    if (Cesium.defined(earthPosition)) {
      if (activeShapePoints.length === 0) {
        floatingPoint = createPoint(earthPosition);
        activeShapePoints.push(earthPosition);
        const dynamicPositions = new Cesium.CallbackProperty(function () {
          if (drawingMode === "polygon") {
            return new Cesium.PolygonHierarchy(activeShapePoints);
          }
          return activeShapePoints;
        }, false);
        activeShape = drawShape(dynamicPositions);
      }
      activeShapePoints.push(earthPosition);
      createPoint(earthPosition);
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  
  handler.setInputAction(function (event) {
    if (Cesium.defined(floatingPoint)) {
      const newPosition = viewer.scene.pickPosition(event.endPosition);
      if (Cesium.defined(newPosition)) {
        floatingPoint.position.setValue(newPosition);
        activeShapePoints.pop();
        activeShapePoints.push(newPosition);
      }
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  // Redraw the shape so it's not dynamic and remove the dynamic shape.
  function terminateShape() {
    activeShapePoints.pop();
    drawShape(activeShapePoints);
    viewer.entities.remove(floatingPoint);
    viewer.entities.remove(activeShape);
    floatingPoint = undefined;
    activeShape = undefined;
    activeShapePoints = [];
  }
  handler.setInputAction(function (event) {
    terminateShape();
  }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
  
  const options = [
    {
      text: "Draw Lines",
      onselect: function () {
        if (!Cesium.Entity.supportsPolylinesOnTerrain(viewer.scene)) {
          window.alert(
            "This browser does not support polylines on terrain."
          );
        }
  
        terminateShape();
        drawingMode = "line";
      },
    },
    {
      text: "Draw Polygons",
      onselect: function () {
        terminateShape();
        drawingMode = "polygon";
      },
    },
  ];
  
  Sandcastle.addToolbarMenu(options);
  // Zoom in to an area with mountains
  viewer.camera.lookAt(
    Cesium.Cartesian3.fromDegrees(-122.2058, 46.1955, 1000.0),
    new Cesium.Cartesian3(5000.0, 5000.0, 5000.0)
  );
  viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
  */



function AOISelect() {

    viewer.selectedEntityChanged.addEventListener(function () {
        selectedstat = viewer.selectedEntity;
        //console.log(selectedstat._name);
        //console.log(selectedstat._properties._longitude._value);
        if (selectedstat) {
            
            document.getElementById("run").style.display = "none";   
            selectedStation = document.getElementById("Station").value = selectedstat._name;
            PointName = selectedStation;
            try {
            LONGITUDE = selectedstat._properties._longitude._value;
            LATITUDE = selectedstat._properties._latitude._value;
            console.log(LONGITUDE);
            console.log(selectedstat);
            if (weathersource=='URMA_HRRR'){
                document.getElementById("schedule").style.display = "block"; }  
            
            else{
            document.getElementById("run").style.display = "block"; }  
        } catch(error){
                console.log('did not click on a point')
                console.log(LONGITUDE)
                console.log(error)
            }
            loadcounties(selectedStation);
   
        }

    });
}
function showInitialArea() {
    const WGS84_a = 6378137.0;
    const WGS84_b = 6356752.3;

    function DegToRad(degrees) {
        return (Math.PI * degrees / 180.0);
    }
    function RadToDeg(radians) {
        return (180.0 * radians / Math.PI);
    }
    function WGS84EarthRadius(lat) {
        let An = WGS84_a * WGS84_a * Math.cos(lat);
        let Bn = WGS84_b * WGS84_b * Math.sin(lat);
        let Ad = WGS84_a * Math.cos(lat);
        let Bd = WGS84_b * Math.sin(lat);
        return (Math.sqrt((An * An + Bn * Bn) / (Ad * Ad + Bd * Bd)));
    }
    function boundingBox(LATITUDE, LONGITUDE) {
        let lat = DegToRad(LATITUDE);
        let lon = DegToRad(LONGITUDE);
        let halfSide = 500.0;

        let radius = WGS84EarthRadius(lat);
        let pradius = radius * Math.cos(lat);

        let latMin = lat - halfSide / radius;
        let latMax = lat + halfSide / radius;
        let lonMin = lon - halfSide / pradius;
        let lonMax = lon + halfSide / pradius;

        let orderedArray = [RadToDeg(lonMin), RadToDeg(latMin), RadToDeg(lonMax), RadToDeg(latMax)];
        let orderedString = RadToDeg(lonMin) + ", " + RadToDeg(latMin) + ", " + RadToDeg(lonMax) + ", " + RadToDeg(latMax);
        return (orderedArray);
    }


    //console.log(boundingBox(LATITUDE, LONGITUDE));
    let yellowRectangleCords = boundingBox(LATITUDE, LONGITUDE);
    //console.log(yellowRectangleCords);
    yellowRectangle = viewer.entities.add({
        name: "yellow translucent rectangle",
        rectangle: {
            coordinates: Cesium.Rectangle.fromDegrees(
                yellowRectangleCords[0],
                yellowRectangleCords[1],
                yellowRectangleCords[2],
                yellowRectangleCords[3]
            ),
            material: Cesium.Color.YELLOW.withAlpha(0.2),
        },
    });
    viewer.zoomTo(yellowRectangle);


    NorthWestCorner = viewer.entities.add({
        name: "NorthWest",
        position: Cesium.Cartesian3.fromDegrees(yellowRectangleCords[0], yellowRectangleCords[3]),
        billboard: {
            image: pinBuilder.fromText("NW", Cesium.Color.BLACK, 48).toDataURL(),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        },
    });
    NorthEastCorner = viewer.entities.add({
        name: "NorthEast",
        position: Cesium.Cartesian3.fromDegrees(yellowRectangleCords[2], yellowRectangleCords[3]),
        billboard: {
            image: pinBuilder.fromText("NE", Cesium.Color.BLACK, 48).toDataURL(),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        },
    });
    SouthWestCorner = viewer.entities.add({
        name: "SouthWest",
        position: Cesium.Cartesian3.fromDegrees(yellowRectangleCords[0], yellowRectangleCords[1]),
        billboard: {
            image: pinBuilder.fromText("SW", Cesium.Color.BLACK, 48).toDataURL(),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        },
    });
    SouthEastCorner = viewer.entities.add({
        name: "SouthEast",
        position: Cesium.Cartesian3.fromDegrees(yellowRectangleCords[2], yellowRectangleCords[1]),
        billboard: {
            image: pinBuilder.fromText("SE", Cesium.Color.BLACK, 48).toDataURL(),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        },
    });
    latitudes = yellowRectangleCords[1] + ":" + yellowRectangleCords[3];
    longitudes = yellowRectangleCords[0] + ":" + yellowRectangleCords[2];
    screenSpaceEventHandler.setInputAction(function callSaveAOI() {

        saveAOI(longitudes, latitudes, LATITUDE, LONGITUDE);
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}

function drawSavedAOI(yellowRectangleCords, name, id) {

    //console.log(boundingBox(LATITUDE, LONGITUDE));
    // let yellowRectangleCords = boundingBox(LATITUDE, LONGITUDE);
    // console.log(yellowRectangleCords);
    var yellowRectangle = viewer.entities.add({
        name: "yellow translucent rectangle",
        rectangle: {
            coordinates: Cesium.Rectangle.fromDegrees(
                yellowRectangleCords[0], //smaller lon (more negative)
                yellowRectangleCords[2], //smaller lat
                yellowRectangleCords[1], //larger lon
                yellowRectangleCords[3]  //lerger lat
            ),
            material: Cesium.Color.YELLOW.withAlpha(0.2),
        },
    });


    let f = Cesium.Rectangle.center(yellowRectangle.rectangle.coordinates._value, yellowRectangle);
    let pin = Cesium.Cartographic.toCartesian(f);
    let ellipsoid = viewer.scene.globe.ellipsoid;
    let cartographic = ellipsoid.cartesianToCartographic(pin);
    let pinlat = Cesium.Math.toDegrees(cartographic.latitude);
    let pinlong = Cesium.Math.toDegrees(cartographic.longitude);
    //console.log(yellowRectangle);
    //console.log(yellowRectangle.rectangle.coordinates);
    //console.log(f);
    //console.log(pinlong);
    //console.log(pinlat);

    viewer.zoomTo(yellowRectangle);
    CenterPoint = viewer.entities.add({
        id: id,
        name: name,
        description: 'area of interest: ' + user.name ,
        properties: {latitude: pinlat, longitude: pinlong},
        position: Cesium.Cartesian3.fromDegrees(pinlong, pinlat),
        billboard: {
            image: pinBuilder.fromMakiIconId("farm", Cesium.Color.PURPLE, 48),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        }
    });
    //console.log(CenterPoint);
}

function SavePOI() {
    //PointName = dijit.byId('pointNameBox').get('value');
    //dijit.byId('PoiPrompt').hide();
    //SavePOIPart2();
    //console.log(LONGITUDE);
    //console.log(LATITUDE);
    //var url = Cesium.buildModuleUrl("Assets/Textures/maki/grocery.png");
    //console.log(url);

    userPOI = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(LONGITUDE, LATITUDE),
        point: {
            pixelSize: 10,
            color: Cesium.Color.PURPLE,
        },
        label: {
            text: PointName,
            font: '14pt monospace',
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            outlineWidth: 2,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            pixelOffset: new Cesium.Cartesian2(0, -9)

        }
    });

    //selectedStation = document.getElementById("Station").value = PointName;
    showInitialArea();
    entitySelection();
}

function AddPointEventListener() {

    // Click no layer listener

    viewer.entities.add({
        id: 'mou',
        label: {
            // position : Cesium.Cartesian2.ZERO,
            show: true   // Removed semicolon here
        }
    });

}



function droppoint(f) {
    let entity = viewer.entities.getById('mou');
    var ellipsoid = viewer.scene.globe.ellipsoid;
    // Mouse over the globe to see the cartographic position
    var cartesian = viewer.camera.pickEllipsoid(new Cesium.Cartesian3(f.clientX, f.clientY), ellipsoid);
    if (cartesian) {
        var cartographic = ellipsoid.cartesianToCartographic(cartesian);
        LONGITUDE = Cesium.Math.toDegrees(cartographic.longitude).toFixed(7);
        LATITUDE = Cesium.Math.toDegrees(cartographic.latitude).toFixed(7);
        entity.position = cartesian;
        entity.label.show = false;
        entity.label.font_style = 84;
        //entity.position= Cesium.Cartesian2.ZERO;
        entity.label.text = '(' + LONGITUDE + ', ' + LATITUDE + ')';
        var result = entity.label.text;  // We can reuse this
        //document.getElementById("demo").innerHTML = result;
        let state = viewer.selectedEntity._name;
        console.log(state);
        loadcounties(state);
        //console.log(viewer.selectedEntity);
        viewer.zoomTo(viewer.selectedEntity);

        if (state.match(/Texas.*/)) {
            viewer.dataSources.add(Cesium.GeoJsonDataSource.load('./data/states/east_texas/' + county, {
                markerColor: Cesium.Color.RED,
                markerSize: 7,
                markerSymbol: '.'
            }));
        } else {
        let gridpoints = new Cesium.GeoJsonDataSource.load('./data/stateswithpoints/' + state + '.geojson', {         
                markerColor: Cesium.Color.RED,
                markerSize: 7,
                markerSymbol: '.'
            });
            viewer.dataSources.add(gridpoints);
        }
        let poip = '<form data-dojo-type="dijit.form.Form" onsubmit="SavePOI('
        poip += LATITUDE + ',' + LONGITUDE;
        poip += '); return false"><div class="dijitDialogPaneContentArea"><label for="nameBox" style="color:black">Point of Interest Name: </label><div data-dojo-type="dijit.form.TextBox" data-dojo-props="required:true" id="pointNameBox" value="';
        poip += '"></div></div><div class="dijitDialogPaneActionBar"><button data-dojo-type="dijit.form.Button" type="button" data-dojo-props="onClick:SavePOI">OK</button><button data-dojo-type="dijit.form.Button" type="button" data-dojo-props="onClick:function(){ModelName = null; dijit.byId(\'PoiPrompt\').hide(); }">Cancel</button></div> </form>';
        PoiPrompt.set("content", poip)
        //PoiPrompt.show();
        SavePOI();
    } else {
        entity.label.show = false;
    }
    //viewer.scene.canvas.removeEventListener('click', droppoint);
    AOISelect();
}
function loadPOIs() {
    $.ajax({
        url: 'getAOIs.php',
        data: {
            'user_id': user.user_id
        },
        type: 'POST'
    }).done(function (reply) {
        //console.log(reply);
        //console.log("dude");
        if (reply) {
            let corners = JSON.parse(reply);
            console.log(corners);
            let L = Object.keys(corners).length
            //console.log(L);
            //console.log(corners[1]);
            var x;
            for (x in corners) {
                //  console.log(corners[x].name);
                //console.log(corners[x].longitudes);
                yellowRectangleCords = new Array;
                let NW = corners[x].longitudes.split(':');
                let SE = corners[x].latitudes.split(':');
                yellowRectangleCords[0] = NW[0];
                yellowRectangleCords[1] = NW[1];
                yellowRectangleCords[2] = SE[0];
                yellowRectangleCords[3] = SE[1];
                //  console.log(yellowRectangleCords);
                drawSavedAOI(yellowRectangleCords, corners[x].name, corners[x].id);
            }
        }
    })
}
