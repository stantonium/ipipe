/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
function switchListeners() {
    viewer.selectedEntityChanged.removeEventListener();
    console.log(viewer.dataSources);
    let sourceLength = viewer.dataSources.length;
    console.log(sourceLength);
    for (x = 8; x < sourceLength; x++) {
        console.log(viewer.dataSources._dataSources[x]);
        viewer.dataSources.remove(viewer.dataSources._dataSources[9]);
    }
    // loadUS();
    viewer.scene.canvas.addEventListener('click', droppoint);
}

// function for drill pick
function drillPick(windowPosition, limit = null, width = null, height = null) {
    var scene = viewer.scene;
    return scene.drillPick(windowPosition, limit, width, height);
}

// function to get lat and long from drill picked entities
function getDrillPickLatLong(pickedObjects) {
    if (Cesium.defined(pickedObjects)) {
        //exportArray = createCSVArray(pickedObjects);
    }
}
function saveAOI(longitudes, latitudes) {

    //Note test and fix this, catch the null value before line 26, delte try catch stuff. 
    //console.log(longitudes);
    //console.log(latitudes);
    //console.log(typeof (longitudes));
    if (typeof (longitudes) == 'object') { (alert("Must select Area first")); }

    //Note
    let AOI = '<form data-dojo-type="dijit.form.Form" onsubmit="SaveAOItoDB('
    // AOI += longitudes +'|' + latitudes;
    AOI += '); return false"><div class="dijitDialogPaneContentArea"><label for="AOIBox" style="color:black">Area of Interest Name: </label><div data-dojo-type="dijit.form.TextBox" data-dojo-props="required:true" id="AOINameBox" value="';
    AOI += '"></div></div><div class="dijitDialogPaneActionBar"><button data-dojo-type="dijit.form.Button" type="button" data-dojo-props="onClick:SaveAOItoDB">OK</button><button data-dojo-type="dijit.form.Button" type="button" data-dojo-props="onClick:function(){ModelName = null; dijit.byId(\'AOIPrompt\').hide(); }">Cancel</button></div> </form>';
    AOIPrompt.set("content", AOI);
    AOIPrompt.show();

    // catch{alert('must select an area');}


}
function entitySelection() {

    viewer.scene.screenSpaceCameraController.enableTranslate = false;
    viewer.scene.screenSpaceCameraController.enableTilt = false;
    viewer.scene.screenSpaceCameraController.enableLook = false;


    //var selector;
    var rectangleSelector = new Cesium.Rectangle();
    var cartesian = new Cesium.Cartesian3();
    var tempCartographic = new Cesium.Cartographic();
    var firstPoint = new Cesium.Cartographic();
    var firstPointSet = false;
    var mouseDown = false;
    var camera = viewer.camera;


    //Draw the selector while the user drags the mouse while holding shift
    screenSpaceEventHandler.setInputAction(function drawSelector(movement) {
        if (!mouseDown) {
            return;
        }
        //viewer.scene.screenSpaceCameraController.enableRotate = false;
        //viewer.scene.screenSpaceCameraController.enableTranslate = false;

        cartesian = camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid, cartesian);

        if (cartesian) {
            //mouse cartographic
            tempCartographic = Cesium.Cartographic.fromCartesian(cartesian, Cesium.Ellipsoid.WGS84, tempCartographic);

            if (!firstPointSet) {
                Cesium.Cartographic.clone(tempCartographic, firstPoint);
                firstPointSet = true;
            } else {
                rectangleSelector.east = Math.max(tempCartographic.longitude, firstPoint.longitude);
                rectangleSelector.west = Math.min(tempCartographic.longitude, firstPoint.longitude);
                rectangleSelector.north = Math.max(tempCartographic.latitude, firstPoint.latitude);
                rectangleSelector.south = Math.min(tempCartographic.latitude, firstPoint.latitude);
                selector.show = true;
            }
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE, Cesium.KeyboardEventModifier.SHIFT);

    var getSelectorLocation = new Cesium.CallbackProperty(function getSelectorLocation(time, result) {
        return Cesium.Rectangle.clone(rectangleSelector, result);
    }, false);

    // start shift click
    screenSpaceEventHandler.setInputAction(function startClickShift() {
        mouseDown = true;
        selector.rectangle.coordinates = getSelectorLocation;
        viewer.scene.canvas.removeEventListener('click', droppoint);
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN, Cesium.KeyboardEventModifier.SHIFT);






    //// added DoubleClick action to select point(s) /////////////////////////////////
    // Code from https://groups.google.com/g/cesium-dev/c/sfm049HSQgk
    var scene = viewer.scene;
    var handler;
    handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction(function (click) {
        // Scene.drillPick will get an array of all entities that overlap at the mouse click point
        var pickedObjects = drillPick(click.position);
        getDrillPickLatLong(pickedObjects);

    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    //////////end DoubleClick code////////////////////////////////////////////



    //Hide the rectangle selector and export menu by clicking anywhere
    screenSpaceEventHandler.setInputAction(function hideSelector() {
        selector.show = false;
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);


    //Add the rectangle to the scene
    selector = viewer.entities.add({
        selectable: false,
        show: false,
        rectangle: {
            coordinates: getSelectorLocation,
            material: Cesium.Color.BLACK.withAlpha(0.5)
        },
        properties: { // 0.0 lat and long for rectangle object
            "latitude": 0.0,
            "longitude": 0.0
        }
    });

    //console.log(selector);
    //console.log(typeof (selector));

    // end shift click
    screenSpaceEventHandler.setInputAction(function moveMarkers() {

        mouseDown = false;
        firstPointSet = false;
        selector.rectangle.coordinates = rectangleSelector;

        ////////added to get rectangle corner's lat long coords///////////////////
        //NE corner
        var rectangleNE_long = Cesium.Math.toDegrees(rectangleSelector.east);
        var rectangleNE_lat = Cesium.Math.toDegrees(rectangleSelector.north);

        //SW corner
        var rectangleSW_long = Cesium.Math.toDegrees(rectangleSelector.west);
        var rectangleSW_lat = Cesium.Math.toDegrees(rectangleSelector.south);

        //SE corner
        var rectangleSE_lat = rectangleSW_lat;
        var rectangleSE_long = rectangleNE_long;

        //NW corner
        var rectangleNW_long = rectangleSW_long;
        var rectangleNW_lat = rectangleNE_lat;

        longitudes = rectangleNW_long + ':' + rectangleSE_long;
        latitudes = rectangleSE_lat + ':' + rectangleNW_lat;


        // translate rectangle lat and long coords into window position lat long coords
        //Center of the Rectangle
        rectCenterCartesian = Cesium.Rectangle.center(rectangleSelector);
        rectCartesian3 = Cesium.Cartographic.toCartesian(rectCenterCartesian);
        WindowCoordsRectCenter = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, rectCartesian3);

        // use 3 corners to compute the width and height in window coords
        RectNECartesian3 = Cesium.Cartesian3.fromDegrees(rectangleNE_long, rectangleNE_lat);
        WindowCoordsRectNE = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, RectNECartesian3);
        RectNWCartesian3 = Cesium.Cartesian3.fromDegrees(rectangleNW_long, rectangleNW_lat);
        WindowCoordsRectNW = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, RectNWCartesian3);
        RectSECartesian3 = Cesium.Cartesian3.fromDegrees(rectangleSE_long, rectangleSE_lat);
        WindowCoordsRectSE = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, RectSECartesian3);

        // get the with and height of the rectangle in window coords
        WindowCoordsRectWidth = (WindowCoordsRectNE.x - WindowCoordsRectNW.x);
        WindowCoordsRectHeight = (WindowCoordsRectSE.y - WindowCoordsRectNW.y);
        // Round to the nearest integer for DrillPick
        WindowCoordsRectWidth = Math.round(WindowCoordsRectWidth);
        WindowCoordsRectHeight = Math.round(WindowCoordsRectHeight);

        // Drill pick via the rectangle
        var pickedObjects = drillPick(WindowCoordsRectCenter, null, WindowCoordsRectWidth, WindowCoordsRectHeight);
        getDrillPickLatLong(pickedObjects);
        //console.log(pickedObjects);
        //show export menu
        //exportMenu(WindowCoordsRectSE.x, WindowCoordsRectSE.y);
        ////////end added code/////////////////////////////////////////////////
        viewer.entities.remove(NorthWestCorner);
        viewer.entities.remove(NorthEastCorner);
        viewer.entities.remove(SouthEastCorner);
        viewer.entities.remove(SouthWestCorner);
        viewer.entities.remove(userPOI);
        viewer.entities.remove(yellowRectangle);

        NorthWestCorner = viewer.entities.add({
            name: "NorthWest",
            position: Cesium.Cartesian3.fromDegrees(rectangleNW_long, rectangleNW_lat),
            billboard: {
                image: pinBuilder.fromText("NW", Cesium.Color.BLACK, 48).toDataURL(),
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            },
        });
        NorthEastCorner = viewer.entities.add({
            name: "NorthEast",
            position: Cesium.Cartesian3.fromDegrees(rectangleNE_long, rectangleNE_lat),
            billboard: {
                image: pinBuilder.fromText("NE", Cesium.Color.BLACK, 48).toDataURL(),
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            },
        });
        SouthWestCorner = viewer.entities.add({
            name: "SouthWest",
            position: Cesium.Cartesian3.fromDegrees(rectangleSW_long, rectangleSW_lat),
            billboard: {
                image: pinBuilder.fromText("SW", Cesium.Color.BLACK, 48).toDataURL(),
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            },
        });
        SouthEastCorner = viewer.entities.add({
            name: "SouthEast",
            position: Cesium.Cartesian3.fromDegrees(rectangleSE_long, rectangleSE_lat),
            billboard: {
                image: pinBuilder.fromText("SE", Cesium.Color.BLACK, 48).toDataURL(),
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            },
        })

        //        },Cesium.ScreenSpaceEventType.LEFT_UP, Cesium.KeyboardEventModifier.SHIFT);
    }, Cesium.ScreenSpaceEventType.LEFT_UP);

    screenSpaceEventHandler.setInputAction(function moveMarkers() {

        mouseDown = false;
        firstPointSet = false;
        selector.rectangle.coordinates = rectangleSelector;

        ////////added to get rectangle corner's lat long coords///////////////////
        //NE corner
        var rectangleNE_long = Cesium.Math.toDegrees(rectangleSelector.east);
        var rectangleNE_lat = Cesium.Math.toDegrees(rectangleSelector.north);

        //SW corner
        var rectangleSW_long = Cesium.Math.toDegrees(rectangleSelector.west);
        var rectangleSW_lat = Cesium.Math.toDegrees(rectangleSelector.south);

        //SE corner
        var rectangleSE_lat = rectangleSW_lat;
        var rectangleSE_long = rectangleNE_long;

        //NW corner
        var rectangleNW_long = rectangleSW_long;
        var rectangleNW_lat = rectangleNE_lat;

        longitudes = rectangleNW_long + ':' + rectangleSE_long;
        latitudes = rectangleSE_lat + ':' + rectangleNW_lat;


        // translate rectangle lat and long coords into window position lat long coords
        //Center of the Rectangle
        rectCenterCartesian = Cesium.Rectangle.center(rectangleSelector);
        rectCartesian3 = Cesium.Cartographic.toCartesian(rectCenterCartesian);
        WindowCoordsRectCenter = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, rectCartesian3);

        // use 3 corners to compute the width and height in window coords
        RectNECartesian3 = Cesium.Cartesian3.fromDegrees(rectangleNE_long, rectangleNE_lat);
        WindowCoordsRectNE = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, RectNECartesian3);
        RectNWCartesian3 = Cesium.Cartesian3.fromDegrees(rectangleNW_long, rectangleNW_lat);
        WindowCoordsRectNW = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, RectNWCartesian3);
        RectSECartesian3 = Cesium.Cartesian3.fromDegrees(rectangleSE_long, rectangleSE_lat);
        WindowCoordsRectSE = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, RectSECartesian3);

        // get the with and height of the rectangle in window coords
        WindowCoordsRectWidth = (WindowCoordsRectNE.x - WindowCoordsRectNW.x);
        WindowCoordsRectHeight = (WindowCoordsRectSE.y - WindowCoordsRectNW.y);
        // Round to the nearest integer for DrillPick
        WindowCoordsRectWidth = Math.round(WindowCoordsRectWidth);
        WindowCoordsRectHeight = Math.round(WindowCoordsRectHeight);

        // Drill pick via the rectangle
        var pickedObjects = drillPick(WindowCoordsRectCenter, null, WindowCoordsRectWidth, WindowCoordsRectHeight);
        getDrillPickLatLong(pickedObjects);
        //console.log(pickedObjects);
        //show export menu
        //exportMenu(WindowCoordsRectSE.x, WindowCoordsRectSE.y);
        ////////end added code/////////////////////////////////////////////////
        viewer.entities.remove(NorthWestCorner);
        viewer.entities.remove(NorthEastCorner);
        viewer.entities.remove(SouthEastCorner);
        viewer.entities.remove(SouthWestCorner);


        NorthWestCorner = viewer.entities.add({
            name: "NorthWest",
            position: Cesium.Cartesian3.fromDegrees(rectangleNW_long, rectangleNW_lat),
            billboard: {
                image: pinBuilder.fromText("NW", Cesium.Color.BLACK, 48).toDataURL(),
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            },
        });
        NorthEastCorner = viewer.entities.add({
            name: "NorthEast",
            position: Cesium.Cartesian3.fromDegrees(rectangleNE_long, rectangleNE_lat),
            billboard: {
                image: pinBuilder.fromText("NE", Cesium.Color.BLACK, 48).toDataURL(),
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            },
        });
        SouthWestCorner = viewer.entities.add({
            name: "SouthWest",
            position: Cesium.Cartesian3.fromDegrees(rectangleSW_long, rectangleSW_lat),
            billboard: {
                image: pinBuilder.fromText("SW", Cesium.Color.BLACK, 48).toDataURL(),
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            },
        });
        SouthEastCorner = viewer.entities.add({
            name: "SouthEast",
            position: Cesium.Cartesian3.fromDegrees(rectangleSE_long, rectangleSE_lat),
            billboard: {
                image: pinBuilder.fromText("SE", Cesium.Color.BLACK, 48).toDataURL(),
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            },
        })

    }, Cesium.ScreenSpaceEventType.LEFT_UP, Cesium.KeyboardEventModifier.SHIFT);
    //},Cesium.ScreenSpaceEventType.LEFT_UP);


}