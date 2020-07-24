/*
 * Nuevo archivo por Pablo
 */
var timeRange={};
define([
    "recursos/js/Util", "./LectoresCharts", "luciad/view/PaintRepresentation", "./MatrizLayer",
    'luciad/util/ColorMap'
], function (Util, LectoresCharts, PaintRepresentation, MatrizLayer, ColorMap) {
    
    var capaLectores = null, capaMatriz, capaMatrizDensidad, features=[];
    var fechaI = $("#fechaInicio");
    var fechaF = $("#fechaFin");
    var horaI = document.getElementById("horaInicio");
    var horaF = document.getElementById("horaFin");
    var switch3d = document.getElementById("verODM3d");
    var selectorO = document.getElementById("selectOrigen");
    var verMatriz = document.getElementById("verMatriz");
    var panelTimeLine = $("#timeMapPanel");
    var btnVentanaODM = $("#verVentanaODM");
    var panelShanky = $("#panelShanky");
    var panelTip = $("#panelTipo");
    var panelPro = $("#panelProcedencia");
    var panelHeat = $("#panelHeatMap");
    var divODM = "graficaODM", divPro="graficaProcedencia", divTip="graficaTipo", divHeat="graficaHeat";
    var actualData = [];
    var loading = $("#loadingGraficas1");
    var timeLine = document.getElementById("timeLineChart");
    //var baseUrl = "http://localhost:5000";
    var baseUrl = "http://unv.aggme.tech:5118"; 
    
    function getData(inicio, fin, handeler, errorHandeler) {
        var parametros = "";
        if(inicio) {
            inicio = Util.formatDate(inicio, "aaaa-mm-ddThh:mm:ss");
            parametros += "?inicio="+inicio;
            if(fin) {
                fin = Util.formatDate(fin, "aaaa-mm-ddThh:mm:ss");
                parametros += "&fin="+fin;
            }
        } 
        loading.fadeIn();
        //var timer = new Timer("vaisala");
        //timer.startTimer();
        $.getJSON(baseUrl+"/odm"+parametros, function (data) {
            //timer.lap();
            console.log("============ Conectado con Servidor ODM ============");
            console.log(data);
            if(typeof data === "string") {
                //alert(data);
                if(errorHandeler)
                    errorHandeler(data, inicio, fin);
            } else
                handeler(data, inicio, fin);
            loading.fadeOut();
            //timer.endTimer();
        }).fail(function (e) {
            console.error(e);
            if(errorHandeler)
                errorHandeler(e, inicio, fin);
            loading.fadeOut();
            //timer.endTimer();
        });
    }
    function getLocalData(inicio, fin, handeler, errorHandeler) {
        $.getJSON("data/result.json", function (data) {
            //timer.lap();
            console.log(data);
            handeler(data, inicio, fin);
            //timer.endTimer();
        }).fail(function (e) {
            console.error(e);
            if(errorHandeler)
                errorHandeler(e, inicio, fin);
            //timer.endTimer();
        });
    }
    /*
    * =============================================================================
    *                  Start
    * =============================================================================
    */
    function start(layer, layers, ubicaciones) {
        capaLectores = layer;
        capaMatriz = layers[0];
        capaMatrizDensidad = layers[1];
        features = ubicaciones;
        fechaI.datepicker({
            dateFormat: 'yy-mm-dd',
            maxDate: new Date()
        });
        fechaF.datepicker({
            dateFormat: 'yy-mm-dd',
            maxDate: new Date()
        });
        setDates("2020-02-10 01:00:00", "2020-02-10 03:00:00");
        timeRange.inicio = "2020-02-10 01:00:00";
        timeRange.fin = "2020-02-10 03:00:00";
        getData("2020-02-10 01:00:00", "2020-02-10 03:00:00", function (data, inicio, fin) {
            setNodes(data);
            actualData = data;
            crearGraficas(data, inicio, fin);
            
        });
        
    }
    
    function setDates(inicio, fin) {
        fechaI[0].value = Util.formatDate(inicio, "aaaa-mm-dd");
        fechaF[0].value = Util.formatDate(fin, "aaaa-mm-dd");
        var date = new Date(inicio);
        var sStartTime = date.getHours();
        horaI.selectedIndex  = sStartTime;
        
        date = new Date(fin);
        var sEndTime = date.getHours();
        if(sEndTime+1 >= 24) {
            sEndTime = 0;
            date = date.getTime() + (1000*60*60);
            sEndDate = Util.formatDate(date, "aaaa-mm-dd");
        } else
            sEndTime ++;
        horaF.selectedIndex = sEndTime;
    }
    
    function setNodes(data) {
        var nodos=[];
        for(var o in data) {
            if(o!=="horas" && o!=="tipo")
                nodos[nodos.length] = o;
        }
        Util.setOptions("selectOrigen", nodos, "Todos", nodos);
    }
    
    function crearGraficas(data, inicio, fin) {
        var origen = selectorO.selectedOptions[0].value;
        if(origen==="0" || origen ===0){
            origen=null;
        }
        if(inicio && fin) {
            actualizarFeatures(data, inicio, fin);
            LectoresCharts.crearTimeLine("timeLineChart", data, inicio, fin, origen,null, true);
            setEventChart();
        }
            LectoresCharts.crearGraficaDias("graficaDias", data, origen,null, true);
            LectoresCharts.crearGraficaTipo(divTip, data, origen,null, true);
            LectoresCharts.crearGraficaProcedencia(divPro, data, origen,null, true);
            LectoresCharts.crearGraficaODM(divODM, data, origen,null, true);
            LectoresCharts.crearHeatMap(divHeat, data, origen,null, true);
    }
    function actualizarGraficas(data, inicio, fin) {
        var origen = selectorO.selectedOptions[0].value;
        if(origen==="0" || origen ===0){
            origen=null;
        }
        if(inicio && fin) {
            actualizarFeatures(data, inicio, fin);
            LectoresCharts.crearTimeLine("timeLineChart", data, inicio, fin, origen);
            setEventChart();
        }
            LectoresCharts.crearGraficaDias("graficaDias", data, origen, null);
            LectoresCharts.crearGraficaTipo(divTip, data, origen, null);
            LectoresCharts.crearGraficaProcedencia(divPro, data, origen, null);
            LectoresCharts.crearGraficaODM(divODM, data, origen, null);
            LectoresCharts.crearHeatMap(divHeat, data, origen,null);
    }
    /*
    * =============================================================================
    *                  Actualizador
    * =============================================================================
    */
    function quitarFiltros() {
        capaMatrizDensidad.filter = null;
    }
    function actualizarLayers(inicio, fin) {
        var selectOrigen = selectorO.selectedOptions[0].value;
        if(selectOrigen==="0" || selectOrigen ===0){
            selectOrigen=null;
        }
        inicio = typeof inicio==="string"? Date.parse(inicio): inicio;
        fin = typeof fin==="string"? Date.parse(fin): fin;
        capaMatrizDensidad.filter = function (feature) {
            var fecha = feature.properties.horaInt;
            var visible = false;
            if(fecha >= inicio && fecha<fin)
                visible = true;
            if(selectOrigen && visible ===true) {
                var origen = feature.properties.origen;
                if(origen === selectOrigen)
                    return true;
                else
                    return false;
            } else
                return visible;
        };;
        capaMatriz.filter = function (feature) {
            var datos = feature.properties.datos;
            var visible = false;
            for(var i in datos) {
                var fecha = datos[i].hora;
                fecha = Date.parse(fecha);
                if(fecha >= inicio && fecha<fin) {
                    visible = true;
                    break;
                }
            }
            
            if(selectOrigen && visible ===true) {
                var origen = feature.properties.origen;
                if(origen === selectOrigen)
                    return true;
                else
                    return false;
            } else
                return visible;
        };
        /*capaLectores.filter = function(feature) { 
            if(selectOrigen) {
                var Id = feature.properties.Id;
                if(Id === selectOrigen)
                    return true;
                else
                    return false;
            } else
                return true; 
        };*/
    }
    
    function actualizarFeatures(data, inicio, fin) {
        var x = data.horas;
        var totalH = new Array(x.length), i=0;
        var index={};
        var total =0;
        for(var i in x) {
            index[x[i]] = i;
            totalH[i] = 0;
        }
        capaMatriz.painter.restartContador();
        capaLectores.painter.restartContador();
        
        MatrizLayer.destruirMatriz(capaMatrizDensidad);
        MatrizLayer.destruirMatriz(capaMatriz);
        var matriz={}, mayor=0;
        features.forEach(function (feature) {
        //for(var i in features) {
            totalH = [];
            var id = feature.id;
            var prop = feature.properties;
            var lon = feature.shape.x;
            var lat = feature.shape.y;
            var o = data[id];
            var hora=0;
            var destino;
            total=0;
            matriz[id] = {};
            //for(var o in data) {
                //if(o!=="horas" && o!=="tipo") {
            for(var d in o) {
                matriz[id][d] = matriz[id][d]|| {};
                for(var f in o[d]) {
                    for(var e in o[d][f]) {
                        if(e !== "hora") {
                            var datos = o[d][f][e];
                            for(var v in datos) {
                                hora += datos[v];
                            }
                        }
                    }
                    i = index[o[d][f]["hora"]];
                    totalH[i] = totalH[i] || 0;
                    totalH[i] +=hora;
                    total += hora;
                    matriz[id][d][f] = {total: hora, hora: o[d][f]["hora"]};
                    mayor = hora>mayor? hora: mayor;
                    hora=0;
                }
                destino = capaLectores.model.get(d);
            }
            var p = {
                Id: id,
                Ubicacion: prop.Ubicacion || id,
                "Bloque Tiempo": inicio+" "+fin,
                Longitud: prop.Longitud || lon,
                Latitud: prop.Latitud || lat,
                Tipo: "Nodo",
                "Total en rango de tiempo": total,
                "Total por hora": totalH,
                "Horas": x,
                Matriz: matriz[id]
            };
            feature.properties = p;
            capaLectores.model.put(features[i]);
        });
        
        for(var o in matriz) {
            var origen = capaLectores.model.get(o);
            for(var d in matriz) {
                var destino = capaLectores.model.get(d);
                if(origen && destino) {
                    if(switch3d.checked)
                        MatrizLayer.crearDensidad3D(capaMatrizDensidad, origen, destino, matriz[o][d], mayor);
                    else
                        MatrizLayer.crearDensidad(capaMatrizDensidad, origen, destino, matriz[o][d], mayor);
                    MatrizLayer.crearConexion(capaMatriz, origen, destino, matriz[o][d]);
                }
            }
        }
    }
    
    function actualizarDatos() {
        var inicio = fechaI[0].value+"T"+horaI.selectedOptions[0].innerHTML;
        var fin = fechaF[0].value+"T"+horaF.selectedOptions[0].innerHTML;
        var ini = Date.parse(inicio);
        var fi = Date.parse(fin);
        if(ini >= fi) {
            //alert("La fecha de inicio debe ser menor que la fecha de fin");
            loading.fadeOut();
            return 0;
        }
        var rango = fi - ini;
        if(rango > (1000*60*60*10)) {
            //alert("El rango de tiempo no debe ser mayor a 10 horas");
            loading.fadeOut();
            return 0;
        }
        getData(inicio, fin, function (data, i, f) {
            actualData = data;
            actualizarGraficas(data, i, f);
            timeRange.inicio = i;
            timeRange.fin = f;
            actualizarLayers(i, f);
        });
    }
    fechaI.on("change", actualizarDatos);
    fechaF.on("change", actualizarDatos);
    horaI.addEventListener("change", actualizarDatos);
    horaF.addEventListener("change", actualizarDatos);
    /*
    * =============================================================================
    *                  Labels
    * =============================================================================
    */
    switch3d.addEventListener("click", function () {
        var inicio = fechaI[0].value+" "+horaI.selectedOptions[0].innerHTML;
        var fin = fechaF[0].value+" "+horaF.selectedOptions[0].innerHTML;
        actualizarFeatures(actualData, inicio, fin);
    });
    $("#updateCharts").click(function () {
        loading.fadeIn();
        var inicio = fechaI[0].value+" "+horaI.selectedOptions[0].innerHTML;
        var fin = fechaF[0].value+" "+horaF.selectedOptions[0].innerHTML;
        actualizarGraficas(actualData, inicio, fin);
        loading.fadeOut();
    });
    var btnLabels = $("#labels");
    btnLabels.click(function (element) {
        var classes = btnLabels[0].className.split(' ');
        var active = classes.indexOf('active') !== -1;
        try {
            capaLectores.setPaintRepresentationVisible(PaintRepresentation.LABEL, !active);
            capaMatriz.setPaintRepresentationVisible(PaintRepresentation.LABEL, !active);
        }catch (e) {
            console.log(e);
        }
        btnLabels.toggleClass("active", !active);
    });
    
    var densidad = $("#Densidad");
    densidad.on("input", function() {
        var x = 1, y = 0;
        x = parseInt(densidad.val());
        if(x < 100) {
            if(capaMatrizDensidad.visible===false)
                capaMatrizDensidad.visible = true;
            capaMatriz.visible = false;
            capaMatrizDensidad.painter.updateDensity(capaMatrizDensidad, x);
        } else {
            capaMatrizDensidad.visible = false;
            capaMatriz.visible = true;
        }
    });
    var radio = $("#RadioLectores");
    radio.on("input", function() {
        capaLectores.filter = function () { return true; };
    });
    /*
    * =============================================================================
    *                  TimeLine
    * =============================================================================
    */
    function setEventChart() {
        timeLine.on('plotly_relayout', function(eventdata){  
            var startTime = eventdata['xaxis.range[0]'];
            var endTime = eventdata['xaxis.range[1]'];
            if(!startTime && !endTime) {
                var data = eventdata['xaxis.range'];
                startTime = data[0];
                endTime = data[1];
            }
            var data, feature;
            data = filtrarTime(actualData, startTime, endTime);
            actualizarGraficas(data);
            timeRange.inicio = startTime;
            timeRange.fin = endTime;
            actualizarLayers(startTime, endTime);
        });
    }
    function filtrarTime(data, inicio, fin) {
        var h = data.horas;
        var y = new Array(h.length), i=0;
        var horas =[], j=0;
        var index={};
        inicio = Date.parse(inicio);
        fin = Date.parse(fin);
        for(var i in h) {
            var fecha = Date.parse(h[i]);
            if(fecha >= inicio && fecha <fin) {
                horas[horas.length] = h[i];
                index[h[i]] = j;
                y[y.length] = 0;
                j++;
            }
        }
        if(horas.length ===0) {
            console.log("no se actualizaron los datos");
            return data;
        }
        var newData={};
        var datos =[];
        newData["horas"] = data["horas"];
        newData["tipo"] = data["tipo"];
        for(var o in data) {
            if(o !== "horas" && o !== "tipo") {
                newData[o] = {};
                for(var d in data[o]) {
                    newData[o][d] = {};
                    for(var f in data[o][d]) {
                        //for(var e in data[o][d][f]) {
                        i = index[data[o][d][f]["hora"]];
                        if(i>=0) {
                            //newData[o][d][f] = newData[o][d][f] || [];
                            newData[o][d][f] = data[o][d][f];
                        }
                        //}
                    }
                }
            }
        }
        
        return newData;
    }
    /*
    * =============================================================================
    *                  TimeLine
    * =============================================================================
    */
    selectorO.addEventListener("change", function () {
        var inicio = fechaI[0].value+" "+horaI.selectedOptions[0].innerHTML;
        var fin = fechaF[0].value+" "+horaF.selectedOptions[0].innerHTML;
        actualizarGraficas(actualData);
        actualizarLayers(inicio, fin);
    });
    verMatriz.addEventListener("click", function() {
        var x = parseInt(densidad.val());
        if(x < 100) {
            capaMatrizDensidad.visible = true;
            capaMatriz.visible = false;
        } else {
            capaMatrizDensidad.visible = false;
            capaMatriz.visible = true;
        }
    });
    /*
    * =============================================================================
    *                  TimeLine
    * =============================================================================
    */
    function setChartPanel(divs) {
        divs.forEach(function (div) {
            var panel = $("#"+div);
            var btn = $("#"+div+"btn");
            var btnCerrar = $("#"+div+"Cerrar");
            
            btn.click(function () {
                var origen = selectorO.selectedOptions[0].value;
                Plotly.purge("grafica"+div);
                divODM = "balloon"+div;
                LectoresCharts.crearGraficaODM(divODM, actualData, origen,{width: panelShanky.innerWidth()-20, height: panelShanky.innerHeight()-20}, true);
                panelShanky.fadeIn();
            });
        });
    }
    // ============================ Balloon ODM ======================================== //
    btnVentanaODM.click(function () {
        var origen = selectorO.selectedOptions[0].value;
        Plotly.purge(divODM);
        divODM = "graficaShanky";
        LectoresCharts.crearGraficaODM(divODM, actualData, origen,{width: panelShanky.innerWidth()-20, height: panelShanky.innerHeight()-20}, true);
        panelShanky.fadeIn();
    });
    $("#cerrarBalloonChartODM").click(function () {
        var origen = selectorO.selectedOptions[0].value;
        Plotly.purge(divODM);
        divODM = "graficaODM";
        LectoresCharts.crearGraficaODM(divODM, actualData, origen,{width: 500}, true);
        panelShanky.fadeOut();
    });
    panelShanky.resize(function (event) {
        var width = event.currentTarget.clientWidth - 20;
        var height = event.currentTarget.clientHeight - 30;
        LectoresCharts.resizeGrafica("graficaShanky", {width: width, height: height});
        
    });
    // ============================ Balloon Procedencia ======================================== //
    $("#verVentanaPro").click(function () {
        var origen = selectorO.selectedOptions[0].value;
        Plotly.purge(divPro);
        divPro = "graficaProcedencia2";
        LectoresCharts.crearGraficaProcedencia(divPro, actualData, origen,{width: panelPro.innerWidth()-20, height: panelPro.innerHeight()-20}, true);
        panelPro.fadeIn();
    });
    $("#cerrarBalloonChartPro").click(function () {
        var origen = selectorO.selectedOptions[0].value;
        Plotly.purge(divPro);
        divPro = "graficaProcedencia";
        LectoresCharts.crearGraficaProcedencia(divPro, actualData, origen, null, true);
        panelPro.fadeOut();
    });
    panelPro.resize(function (event) {
        var width = event.currentTarget.clientWidth - 20;
        var height = event.currentTarget.clientHeight - 30;
        LectoresCharts.resizeGrafica("graficaProcedencia2", {width: width, height: height});
    });
    // ================================ Balloon Tipo ==================================== //
    $("#verVentanaTip").click(function () {
        var origen = selectorO.selectedOptions[0].value;
        Plotly.purge(divTip);
        divTip = "graficaTipo2";
        LectoresCharts.crearGraficaTipo(divTip, actualData, origen,{width: panelTip.innerWidth()-20, height: panelTip.innerHeight()-20}, true);
        panelTip.fadeIn();
    });
    $("#cerrarBalloonChartTip").click(function () {
        var origen = selectorO.selectedOptions[0].value;
        Plotly.purge(divTip);
        divTip = "graficaTipo";
        LectoresCharts.crearGraficaTipo(divTip, actualData, origen, null, true);
        panelTip.fadeOut();
    });
    panelTip.resize(function (event) {
        var width = event.currentTarget.clientWidth - 20;
        var height = event.currentTarget.clientHeight - 30;
        LectoresCharts.resizeGrafica("graficaTipo2", {width: width, height: height});
        
    });
    // ==================================================================== //
    panelTimeLine.resize(function (event) {
        var width = event.currentTarget.clientWidth - 10;
        var height = event.currentTarget.clientHeight - 20;
        LectoresCharts.resizeGrafica("timeLineChart", {width: width, height: height});
        
    });
    // ==================================================================== //
    $("#verVentanaHeat").click(function () {
        var origen = selectorO.selectedOptions[0].value;
        Plotly.purge(divHeat);
        divHeat = "graficaHeatMap2";
        LectoresCharts.crearHeatMap(divHeat, actualData, origen,{width: panelHeat.innerWidth()-20, height: panelHeat.innerHeight()-20}, true);
        panelHeat.fadeIn();
    });
    $("#cerrarBalloonChartHeat").click(function () {
        var origen = selectorO.selectedOptions[0].value;
        Plotly.purge(divHeat);
        divHeat = "graficaHeat";
        LectoresCharts.crearHeatMap(divHeat, actualData, origen, null, true);
        panelHeat.fadeOut();
    });
    panelHeat.resize(function (event) {
        var width = event.currentTarget.clientWidth - 20;
        var height = event.currentTarget.clientHeight - 30;
        LectoresCharts.resizeGrafica("graficaHeatMap2", {width: width, height: height});
        
    });
    
    // ==================================================================== //
    $("#cerrarTimeLine").click(function() {
        $("#timeMapPanel").fadeOut();
        document.getElementById("verTimeLine").checked = false;
    });
    $("#verTimeLine").click(function (e) {
        var c = e.currentTarget.checked;
        if(c===true) 
            $("#timeMapPanel").fadeIn();
        else
            $("#timeMapPanel").fadeOut();
    });
    
    return {start: start};
});

function getRangeTime() {
    return timeRange;
}