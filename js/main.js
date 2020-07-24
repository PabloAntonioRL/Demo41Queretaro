var map;

define([
    "recursos/js/MapFactory",
    "recursos/js/GoogleMap",
    "recursos/js/LayerFactory",
    //'luciad/util/Promise',
    "recursos/js/Util",
    
    "luciad/reference/ReferenceProvider",
    "samples/common/LayerConfigUtil",
    "recursos/js/Shapes",
    "luciad/view/LayerType",
    "./DefaultBalloon",
    
    "./LectoresLayer",
    "./painters/LectoresPainter",
    "./painters/MatrizPainter",
    "./painters/MatrizPainterDensidad",
    "./balloons/LectoresBalloon",
    "./balloons/MatrizBalloon"
], function (MapFactory, GoogleMap, LayerFactory, Util,
         ReferenceProvider, LayerConfigUtil, Shapes, LayerType, DefaultBalloon, LectoresLayer, LectoresPainter, MatrizPainter, MatrizPainterDensidad, 
         LectoresBalloon, MatrizBalloon) {
    
    var referenceC = ReferenceProvider.getReference("CRS:84");
    var referenceE = ReferenceProvider.getReference("EPSG:4978");
    var referenceM = ReferenceProvider.getReference("EPSG:3857");
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
            .test(navigator.userAgent);
    var is2d = false;
    var googleMap = false, editable;
    
    var resultadoGoogle;
    
    
    /*
     * Funcion encargada de crear el mala dependiendo de si esta en un dispositivo mobil o no
     * creara el mapa en 3d o 2d, ademas de si esta activado e mapa de google 
     * 
     * Google: satellite, hybrid, roadmap o terrain
     * Bing: AerialWithLabels, Road  o Aerial
    */
    function Start() {
        if(googleMap)
            map = GoogleMap.crearMapaGoogle("map", "roadmap"); 
        else {
            if(isMobile || is2d)
                map = MapFactory.makeMap3d("map", {reference: referenceM}, {
                    includeBackground: false, includeElevation: false, includeLayerControl: true,
                    includeMouseLocation: false, includeBingLayer: ["Aerial"]});
            else
                map = MapFactory.makeMap3d("map", {reference: referenceE}, {
                    includeBackground: false, includeElevation: true, includeLayerControl: true,
                    includeMouseLocation: true, newLayerControl: true, includeBingLayer: ["AerialWithLabels", "Road", "CanvasDark"]});
        } 
        CrearCapas();
        //map.effects.light = LightEffect.createSunLight();
    }
    
    function CrearCapas() {
        var grid = LayerConfigUtil.addLonLatGridLayer(map);
        
        var mexicoLayer = LayerFactory.createKmlLayer({label: "Mexico", selectable: false, layerType: LayerType.BASE}, '../../proyecto/recursos/estados.kml');
        map.layerTree.addChild(mexicoLayer, "below", grid);
        /*var queryFinishedHandle = mexicoLayer.workingSet.on("QueryFinished", function() {
            if(mexicoLayer.bounds) 
                map.mapNavigator.fit({bounds: mexicoLayer.bounds, animate: true});
            queryFinishedHandle.remove();
        });*/
        
        var matriz2 = LayerFactory.createMemoryLayer(referenceC, {label:"Matriz Densidad", visible: false, selectable:true, layerType: LayerType.DINAMIC, painter: new MatrizPainterDensidad()});
        map.layerTree.addChild(matriz2);
        matriz2.balloonContentProvider = function (feature) {
            return MatrizBalloon.getBalloon(feature);
        };
        var matriz = LayerFactory.createMemoryLayer(referenceC, {label:"Matriz",visible: false, selectable:true, layerType: LayerType.DINAMIC, painter: new MatrizPainter()});
        map.layerTree.addChild(matriz);
        matriz.balloonContentProvider = function (feature) {
            return MatrizBalloon.getBalloon(feature);
        };
        
        var sensores = LayerFactory.createMemoryLayer(referenceC, {label: "Lectores de Placas", selectable: true, painter: new LectoresPainter(), layerType: LayerType.DINAMIC},
            "data/coord.geojson", function (features, layer) {
                LectoresLayer.start(layer, [matriz, matriz2], features);
                var queryFinishedHandle2 = layer.workingSet.on("QueryFinished", function() {
                    if(layer.bounds) 
                        map.mapNavigator.fit({bounds: layer.bounds, animate: true});
                    queryFinishedHandle2.remove();
                });
            });
        map.layerTree.addChild(sensores);
        sensores.balloonContentProvider = function (feature) {
            return LectoresBalloon.getBalloon(feature);
        };
    }
    //timeUpdated();
    function timeUpdated() {
        $('#timelabel').text(Util.formatTime());
        
        setTimeout(timeUpdated,500);
    }
    Start();
    /* 
    * ==============================================================================================
    *                                   descarga de Capas
    * ============================================================================================== 
    */
    $("#bDescargar").click(function(div) {
        var featuresPromise = editable.model.query();
        Promise.when(featuresPromise, function (cursor) {
            var txt = '{"type": "FeatureCollection", "name": "Datos",'+
                '"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },\n'+
                '"features": [\n';
            var index = 0;
            while (cursor.hasNext()) {
                var feature = cursor.next();
                var properties = JSON.stringify(feature.properties);
                var id = feature.id;
                txt += '{ \n\t"type": "Feature", "id": "'+id+'", "properties": '+properties+',\n\t';
                var geometry = feature.geometry;
                var type = Shapes.getShapeType(feature.shape);
                txt += '"geometry":{"type":"'+type+'", "coordinates":';
                var coordinates = coordinatesToString(geometry.coordinates, type);
                txt += coordinates+'}';
                txt += '\n},';
                index++;
            }
            txt += "\n]}";
            console.log(txt);
            div.currentTarget.href = 'data:text/plain;charset=utf-8,'
                + encodeURIComponent(txt);
        });
        
    });
    
    function coordinatesToString(coordinates, type) {
        var txt = "", x=0;
        switch(type) {
            default:
            case "Polygon":
                txt += "[";
                x++;
            case "Polyline":
                while(coordinates.length === 1) {
                    coordinates = coordinates[0];
                    x++;
                    txt+= "[";
                }
                for(var c in coordinates) {
                    if(c>0)
                        txt += ",";
                    var punto = "["+(coordinates[c].x || coordinates[c][0])+","+(coordinates[c].y || coordinates[c][1])+"]";
                    txt += punto;
                }
                for(c=0; c < x; c++)
                    txt +="]";
                break;
            case "Point":
                var punto = "["+(coordinates.x || coordinates[0])+","+(coordinates.y || coordinates[1])+"]";
                txt += punto;
        }
        return txt;
    }
   
   
   $("#cambiarMapa").click(function () {
       map.destroy();
       is2d = !is2d;
       document.getElementById("cambiarMapa").innerHTML = is2d? "3D" : "2D";
       Start();
   });
    /* 
    * ==============================================================================================
    *                                   Panel izquierdo
    * ============================================================================================== 
    */
    var leftPanel = document.getElementById("panelIzquierdo");
    var showPanelI = $("#showLeftPanel");
    showPanelI.click(function () {
        togglePanel(leftPanel, showPanelI);
    });
    function togglePanel(element, button) {
        var classes = element.className.split(' ');
        var collapsed = classes.indexOf('collapsed') !== -1;
        var padding = {};
        var id = element.id;
        if (collapsed) {
            classes.splice(classes.indexOf('collapsed'), 1);
            //$("#timeMapPanel").fadeIn();
        } else {
            padding[id] = 0;
            classes.push('collapsed');
            //$("#timeMapPanel").fadeOut();
        }
        button.toggleClass("active", collapsed);
        button.find("> span").toggleClass("glyphicon-chevron-right", !collapsed);
        button.find("> span").toggleClass("glyphicon-chevron-left", collapsed);
        // Update the class list on the element
        element.className = classes.join(' ');
    }
    // ==================================================================== //
    var btnHidePro = $("#hideGraficaPro");
    btnHidePro.click(function (element) {
        var chart = document.getElementById("graficaProcedencia");
        var active = btnHidePro.hasClass("active"); 
        var classes = chart.className.split(' ');
        if(active) {
            classes.splice(classes.indexOf('hide'), 1);
        } else {
            classes.push('hide');
        }
        btnHidePro.toggleClass("active", !active);
        btnHidePro.find("> span").toggleClass("glyphicon-chevron-up", active);
        btnHidePro.find("> span").toggleClass("glyphicon-chevron-down", !active);
        chart.className = classes.join(' ');
    });
    var btnHideTip = $("#hideGraficaTip");
    btnHideTip.click(function (element) {
        var active = btnHideTip.hasClass("active"); 
        var chart = document.getElementById("graficaTipo");
        var classes = chart.className.split(' ');
        if(active) {
            classes.splice(classes.indexOf('hide'), 1);
        } else {
            classes.push('hide');
        }
        btnHideTip.toggleClass("active", !active);
        btnHideTip.find("> span").toggleClass("glyphicon-chevron-up", active);
        btnHideTip.find("> span").toggleClass("glyphicon-chevron-down", !active);
        chart.className = classes.join(' ');
    });
    
    var btnHideDia = $("#hideGraficaDias");
    btnHideDia.click(function (element) {
        var active = btnHideDia.hasClass("active"); 
        var chart = document.getElementById("graficaDias");
        var classes = chart.className.split(' ');
        if(active) {
            classes.splice(classes.indexOf('hide'), 1);
        } else {
            classes.push('hide');
        }
        btnHideDia.toggleClass("active", !active);
        btnHideDia.find("> span").toggleClass("glyphicon-chevron-up", active);
        btnHideDia.find("> span").toggleClass("glyphicon-chevron-down", !active);
        chart.className = classes.join(' ');
    });
    var btnHideCon = $("#hideGraficaCon");
    btnHideCon.click(function (element) {
        var active = btnHideCon.hasClass("active"); 
        var chart = document.getElementById("controlesODM");
        var classes = chart.className.split(' ');
        if(active) {
            classes.splice(classes.indexOf('hide'), 1);
        } else {
            classes.push('hide');
        }
        btnHideCon.toggleClass("active", !active);
        btnHideCon.find("> span").toggleClass("glyphicon-chevron-up", active);
        btnHideCon.find("> span").toggleClass("glyphicon-chevron-down", !active);
        chart.className = classes.join(' ');
    });
    var btnHideODM = $("#hideGraficaODM");
    btnHideODM.click(function (element) {
        var active = btnHideODM.hasClass("active"); 
        var chart = document.getElementById("graficaODM");
        var classes = chart.className.split(' ');
        if(active) {
            classes.splice(classes.indexOf('hide'), 1);
        } else {
            classes.push('hide');
        }
        btnHideODM.toggleClass("active", !active);
        btnHideODM.find("> span").toggleClass("glyphicon-chevron-up", active);
        btnHideODM.find("> span").toggleClass("glyphicon-chevron-down", !active);
        chart.className = classes.join(' ');
    });
    var btnHideHeat = $("#hideGraficaHeat");
    btnHideHeat.click(function (element) {
        var active = btnHideHeat.hasClass("active"); 
        var chart = document.getElementById("graficaHeat");
        var classes = chart.className.split(' ');
        if(active) {
            classes.splice(classes.indexOf('hide'), 1);
        } else {
            classes.push('hide');
        }
        btnHideHeat.toggleClass("active", !active);
        btnHideHeat.find("> span").toggleClass("glyphicon-chevron-up", active);
        btnHideHeat.find("> span").toggleClass("glyphicon-chevron-down", !active);
        chart.className = classes.join(' ');
    });
        
});
/* 
 * ==============================================================================================
 *                                   FIN DEL MAIN
 * ============================================================================================== 
 */

$(".draggable").draggable({ cancel: ".nodraggable", grid: [ 10, 10 ] })
        .resizable({ grid: [ 10, 10 ]
});

