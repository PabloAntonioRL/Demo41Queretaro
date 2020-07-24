/*
 * Nuevo archivo por Pablo
 */

define(["./painters/colorManager"], function (colorManager) {
    var bgColor = "";
    var leftP = $("#panelIzquierdo");
    var timePanel = $("#timeMapPanel");
    var generalLayout = {
        //autosize: false,
        width: leftP.innerWidth()-30,
        height: 200,
        margin: {
          l: 0,
          r: 0,
          b: 0,
          t: 0
        },
        font: {
            color: "#ffffff"
        },
        xaxis: {
            gridcolor: '#6a6868',
            zerolinecolor: "#bdbdbd"
        },
        yaxis: {
            gridcolor: '#6a6868',
            zerolinecolor: "#bdbdbd"
        },
        paper_bgcolor: '#17202a82',
        plot_bgcolor: '#17202a82'
    };
    colorManager.loadPalettes("selectColorODM");
    function merge(obj1, obj2) {
        var newObj = {}, key;
        for(key in obj1) newObj[key] = obj1[key];
        for(key in obj2) newObj[key] = obj2[key];
        return newObj;
    }
    function ordenacion(a, b) {
            if (a.value > b.value) {
              return -1;
            }
            if (a.value < b.value) {
              return 1;
            }
            // a must be equal to b
            return 0;
        }
    /* 
    * ==============================================================================================
    *                                   Grafica de dias de la semana
    * ============================================================================================== 
    */
    function crearGraficaDias(div, data) {
        var data = [
            {
              x: ['Domingo', 'Lunes', 'Martes','Miercoles', 'Jueves','Viernes','Sabado'],
              y: [20, 14, 23, 10, 30, 15, 22],
              type: 'bar'
            }
        ];
        var layout = {
            height: 150
        };
        layout = merge(generalLayout, layout );
        layout.margin = {
            l: 30,
            r: 25,
            b: 50,
            t: 10
        };
        Plotly.newPlot(div, data, layout);
    }
    /* 
    * ==============================================================================================
    *                                   dGrafica de procedencias
    * ============================================================================================== 
    */
    function normalized (string) {
        string.replace(/ /g, "");
        return string.toLowerCase();
    }
    function crearGraficaProcedencia(div, data, origen,setLayout, firsTime) {
        var zonas = {
            "estado": [
              "Aguascalientes", "Baja California", "Baja California Sur", "Colima", "Distrito Federal", "Durango",  "Estado de México", /*"Federal", */"Guanajuato", "Guerrero",
              "Hidalgo", "Jalisco",  "Michoacán",  "Morelos", "Nuevo León", "Puebla", "Querétaro", "San Luis Potosí", "Sin Identificar","Sinaloa", "Tlaxcala", "Veracruz",
              "Yucatán", "Zacatecas"
            ],
            "zona": [
              "Occidente", "Norte", "Norte", "Bajío", "Centro",  "Norte","Centro", /*"Zona Federal", */"Bajío", "Sur", "Centro", "Bajío", "Bajío", "Centro",
              "Norte", "Centro", "Centro", "Norte", "No Identificado", "Norte", "Centro", "Sur", "Sur", "Norte"]
        };
        var z = ["Occidente", "Norte", "Bajío", "Centro", /*"Zona Federal", */"Sur", "No Identificado"];
        var labels =[], parents=[], values=[], colors=[], mayor=0;
        var es = [], index={}, i=0;
        //data = data[origen];
        if(origen && origen !=="0") {
            o=origen;
            for(var d in data[o]) {
                    for(var f in data[o][d]) {
                        for(var e in data[o][d][f]) {
                            if(e !== "hora") {
                                datos = data[o][d][f][e];
                                if(!index[e]) {
                                    index[e] = i;
                                    i++;
                                    es[index[e]] = {name: e, value: 0};
                                }
                                for(var v in datos) {
                                    es[index[e]].value += datos[v];
                                }
                            }
                        }
                    }
                }
        } else {
        for(var o in data) {
            if(o !== "horas" && o !== "tipo") {
                for(var d in data[o]) {
                    for(var f in data[o][d]) {
                        for(var e in data[o][d][f]) {
                            if(e !== "hora") {
                                datos = data[o][d][f][e];
                                if(!index[e]) {
                                    index[e] = i;
                                    i++;
                                    es[index[e]] = {name: e, value: 0};
                                }
                                for(var v in datos) {
                                    es[index[e]].value += datos[v];
                                }
                            }
                        }
                    }
                }
            }
        }
        }
        es.sort(ordenacion);
        mayor = es[0].value;
        o = 0;
        d=0;
        for(o in z) {
            labels[labels.length] = z[o];
            parents[parents.length] = "";
            values[values.length] = 0;
            colors[colors.length] = colorManager.getGradianColor("Blues", d).rgb;
        }
        for(e in es) {
            var name = normalized(es[e].name);
            for(o in zonas.estado) {
                if(name === normalized(zonas.estado[o])) {
                    labels[labels.length] = es[e].name;
                    parents[parents.length] = zonas.zona[o];
                    values[values.length] = es[e].value;
                    d = (es[e].value / mayor) *100;
                    colors[colors.length] = colorManager.getGradianColor("Blues", d).rgb;
                    break;
                }
            }
            //if(values.length>8)
              //  break;
            /*
            //labels[labels.length] = 
            if(labels.length > 5) {
                parents[parents.length] = "Otros";
                o+=es[e].value;
            } else
                parents[parents.length] = "Procedencia";
            */
        }
        /*labels[labels.length] = "Otros";
        values[values.length] = o;
        parents[parents.length] = "Procedencia";*
        console.log(labels);
        console.log(parents);
        console.log(colors);*/
        var dataLayout = [{
            type: "sunburst",
            labels: labels, //["Eve", "Cain", "Seth", "Enos", "Noam", "Abel", "Awan", "Enoch", "Azura"],
            parents: parents, //["", "Eve", "Eve", "Seth", "Seth", "Eve", "Eve", "Awan", "Eve" ],
            values:  values, //[0, 14, 12, 10, 2, 6, 6, 4, 4],
            outsidetextfont: {size: 10, color: "#377eb8"},
            //leaf: {opacity: 0.4},
            marker: {line: {width: 2}}
        }];
        var layout = merge(generalLayout, {
            height: 200,
            //sunburstcolorway: colors
        });
        
        if(setLayout)
            layout = merge(layout, setLayout);
        if(firsTime === true)
            Plotly.newPlot(div, dataLayout, layout);
        else {
            var chart = document.getElementById(div);
            var newLayout = chart.layout;
            layout = merge(layout, newLayout);
            Plotly.react(div, dataLayout, layout);
        }
    }
    /* 
    * ==============================================================================================
    *                                   dGrafica de Tipo
    * ============================================================================================== 
    */
   function crearGraficaTipo(div, data, origen,setLayout, firsTime) {
        var yo = data.tipo;
        var x = new Array(yo.length), i=0;
        var index={};
        for(var i in yo) {
            index[yo[i]] = i;
            x[i] = 0;
        }
        var text = {
"Transporte privado": "Privado",
"Público Local Automoviles/Taxi": "Taxi",
"Transporte privado camiones/pickups": "Pickups",
"Ninguno":"Ninguno",
"Autotransporte Federal": "Autotransporte",
"Público Local Camiones":"Camiones"
};
        var y=[];
        for(i in yo) {
            y[i] = text[yo[i]];
        }
        var datos =[];
        if(origen && origen !=="0") {
            o=origen;
            for(var d in data[o]) {
                    for(var f in data[o][d]) {
                        for(var e in data[o][d][f]) {
                            if(e !== "hora") {
                                datos = data[o][d][f][e];
                                for(var v in datos) {
                                    x[v] += datos[v];
                                }
                            }
                        }
                    }
                }
        } else {
        for(var o in data) {
            if(o !== "horas" && o !== "tipo") {
                for(var d in data[o]) {
                    for(var f in data[o][d]) {
                        for(var e in data[o][d][f]) {
                            if(e !== "hora") {
                                datos = data[o][d][f][e];
                                for(var v in datos) {
                                    x[v] += datos[v];
                                }
                            }
                        }
                    }
                }
            }
        }
        }
        //console.log(x);
        //console.log(y);
        var dataLayout = [{
            type: 'bar',
            x: x,
            y: y,
            orientation: 'h'
        }];
        var layout = {
            height: 200,
            margin: {
                l: 100,
                r: 0,
                b: 30,
                t: 0
            },
            font: {
            color: "#ffffff"
            },
            xaxis: {
                gridcolor: '#6a6868',
                zerolinecolor: "#bdbdbd"
            },
            yaxis: {
                gridcolor: '#6a6868',
                zerolinecolor: "#bdbdbd"
            },
            paper_bgcolor: '#17202a82',
            plot_bgcolor: '#17202a82'
        };
        //layout = merge(generalLayout, layout);
        if(setLayout)
            layout = merge(layout, setLayout);
        if(firsTime === true)
            Plotly.newPlot(div, dataLayout, layout);
        else {
            var chart = document.getElementById(div);
            var newLayout = chart.layout;
            layout = merge(layout, newLayout);
            Plotly.react(div, dataLayout, layout);
        }
   }
    /* 
    * ==============================================================================================
    *                                   Grafica de ODM
    * ============================================================================================== 
    */
    function resizeGraficaODM(div, newLayout) {
        var chart = document.getElementById(div);
        var layout = chart.layout;
        layout = merge(layout, newLayout);
        Plotly.relayout(div, layout);
    }
    function crearGraficaODM(div, data, origenS, setLayout, firsTime) {
        var labels=[], index={}, i=0, x=[];
        for(var o in data) {
            if(o !== "horas" && o !== "tipo") {
                labels[i] = o;
                //x[i] = 0;
                index[o] = i;
                i++;
            }
        }
        //labels[labels.lencght] = "Otros";
        var origen =[], destino=[];
        var j=0;
        for(o in data) {
            if(o!=="tipo" && o!=="horas") {
                i= index[o];
                origen[i] = origen[i] || {name:o, value:0};
                for(var d in data[o]) {
                    j = index[d];
                    destino[j] = destino[j] || {name:d, value:0};
                    destino[j].value ++;
                    origen[i].value ++;
                }
            }
        }
        origen.sort(ordenacion);
        destino.sort(ordenacion);
        var mayorLabel = origen[0].value> destino[0].value? origen[0].value: destino[0].value;
        var labelColors=[];
        var nOrigen=document.getElementById("nOrigenODM").value||5, nDestino =document.getElementById("nDestinosODM").value||5, k=0;
        i=0;
        var datos =[], source=[], target=[], mayor=0;
        if(origenS && origenS !=="0") {
            o=origenS;
            
                for(j=0; j<nDestino; j++) {
                    d = destino[j].name;
                    for(var f in data[o][d]) {
                        for(var e in data[o][d][f]) {
                            if(e !== "hora") {
                                datos = data[o][d][f][e];
                                for(var v in datos) {
                                    x[k] = x[k] || 0;
                                    x[k] += datos[v];
                                }
                            }
                        }
                    }
                    source[k] = index[o];
                    target[k] = index[d];
                    mayor = x[k]>mayor? x[k]: mayor;
                    k++;
                }
        } else {
            for(i=0; i<nOrigen; i++) {
                o = origen[i].name;
                for(j=0; j<nDestino; j++) {
                    d = destino[j].name;
                    for(var f in data[o][d]) {
                        for(var e in data[o][d][f]) {
                            if(e !== "hora") {
                                datos = data[o][d][f][e];
                                for(var v in datos) {
                                    x[k] = x[k] || 0;
                                    x[k] += datos[v];
                                }
                            }
                        }
                    }
                    source[k] = index[o];
                    target[k] = index[d];
                    mayor = x[k]>mayor? x[k]: mayor;
                    k++;
                }
            }
        /*for(o in data) {
            if(o !== "horas" && o !== "tipo") {
                origen[origen.length] = {name:o, value:data[o].length};
                for(d in data[o]) {
                    destino[destino.length]={name:d, value: data[o][d].length};
                    for(var f in data[o][d]) {
                        for(var e in data[o][d][f]) {
                            if(e !== "hora") {
                                datos = data[o][d][f][e];
                                for(var v in datos) {
                                    x[i] = x[i] || 0;
                                    x[i] += datos[v];
                                }
                            }
                        }
                    }
                    source[i] = index[o];
                    target[i] = index[d];
                    i++;
                }
            }
        }*/
        }
        var colors =[], idColor;
        try {
            idColor = document.getElementById("selectColorODM").selectedOptions[0].value;
        } catch(e) {}
        idColor = "Blues";
        for(i in x) {
            var p = (x[i] / mayor) *100;
            colors[i] = colorManager.getGradianColor(idColor, p, 0.5).rgba;
        }
        /*console.log(labels);
        console.log(target);
        console.log(source);
        console.log(x);*/
        var dataLayout = {
            type: "sankey",
            orientation: "h",
            node: {
              pad: 15,
              thickness: 30,
              line: {
                color: "black",
                width: 0.5
              },
              label: labels
              //color: colors
            },

            link: {
                source: source,
                target: target,
                value: x,
                color: colors
            }
        };
        dataLayout = [dataLayout];
        var layout = {
            height: 400,
            //width: 500,
            font: {
              size: 8
            }
        };
        layout = merge(generalLayout, layout);
        if(setLayout)
            layout = merge(layout, setLayout);
        if(firsTime === true)
            Plotly.newPlot(div, dataLayout, layout);
        else {
            var chart = document.getElementById(div);
            var newLayout = chart.layout;
            layout = merge(layout, newLayout);
            Plotly.react(div, dataLayout, layout);
        }
    }
    /* 
    * ==============================================================================================
    *                                   Grafica de Linea de tiempo
    * ============================================================================================== 
    */
    
    function crearTimeLine(div, data, inicio, fin, origen, firsTime) {
        var layout = {
            autosize: false,
            width: timePanel.innerWidth(),
            height: timePanel.innerHeight()-5,
            margin: {
                t: 3
            },
            font: {
                color: "#ffffff"
            },
            xaxis: {
                gridcolor: '#6a6868',
                zerolinecolor: "#bdbdbd",
                rangeselector: {buttons: [
                        {
                            count: 1,
                            label: '1h',
                            step: 'hour',
                            stepmode: 'backward'
                        },{step: 'all'}
                ]},
                rangeslider: {range: [inicio, fin]},
                type: 'date'
            },
            yaxis: {
                gridcolor: '#6a6868',
                zerolinecolor: "#bdbdbd"
            },
            paper_bgcolor: '#17202a82',
            plot_bgcolor: '#17202a82',
       };
       data = formatTimeLine(data, inicio, fin, origen);
       
        if(firsTime === true)
            Plotly.newPlot(div, data, layout, {responsive: true});
        else {
            var chart = document.getElementById(div);
            var newLayout = chart.layout;
            layout = merge(layout, newLayout);
            Plotly.react(div, data, layout, {responsive: true});
        }
    }
    function formatTimeLine(data, inicio, fin, origen) {
        var newData = [];
        var x = data.horas;
        var y = new Array(x.length), i=0;
        var index={};
        for(var i in x) {
            index[x[i]] = i;
            y[i] = 0;
        }
        var datos =[];
        if(origen && origen !=="0") {
            o=origen;
            for(var d in data[o]) {
                    for(var f in data[o][d]) {
                        for(var e in data[o][d][f]) {
                            i = index[data[o][d][f]["hora"]];
                            if(e !== "hora") {
                                datos = data[o][d][f][e];
                                for(var v in datos) {
                                    y[i] += datos[v];
                                }
                            }
                        }
                    }
                }
        } else {
            for(var o in data) {
                if(o !== "horas" && o !== "tipo") {
                    for(var d in data[o]) {
                        for(var f in data[o][d]) {
                            for(var e in data[o][d][f]) {
                                i = index[data[o][d][f]["hora"]];
                                if(e !== "hora") {
                                    datos = data[o][d][f][e];
                                    for(var v in datos) {
                                        y[i] += datos[v];
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return [{
            x: x,
            y: y,
            //mode: "lines", 
            type: "bar"
        }];
    }
    /* 
    * ==============================================================================================
    *                                   Grafica de Linea de tiempo
    * ============================================================================================== 
    */
    function crearHeatMap(div, data, origen, setLayout, firsTime) {
        var labels=[], index={}, indexH={}, i=0, j=0;
        var horas = data.horas;
        for(var o in data) {
            if(o !== "horas" && o !== "tipo") {
                labels[i] = o;
                index[o] = i;
                i++;
            }
        }
        horas = horas.sort();
        for(o in horas) {
            indexH[horas[o]] = o;
        }
        var datos =[], z=[];
        if(origen && origen !=="0") {
            o=origen;
            labels = [o];
            j = 0;
            z[j] = z[j] || new Array(horas.length);
            for(var d in data[o]) {
                    for(var f in data[o][d]) {
                        for(var e in data[o][d][f]) {
                            i = indexH[data[o][d][f]["hora"]];
                            if(e !== "hora") {
                                datos = data[o][d][f][e];
                                for(var v in datos) {
                                    z[j][i] = z[j][i] || 0;
                                    z[j][i] += datos[v];
                                }
                            }
                        }
                    }
                }
        } else {
            for(var o in data) {
                if(o !== "horas" && o !== "tipo") {
                    j = index[o];
                    z[j] = z[j] || new Array(horas.length);
                    for(var d in data[o]) {
                        for(var f in data[o][d]) {
                            for(var e in data[o][d][f]) {
                                i = indexH[data[o][d][f]["hora"]];
                                if(e !== "hora") {
                                    datos = data[o][d][f][e];
                                    for(var v in datos) {
                                        z[j][i] = z[j][i] || 0;
                                        z[j][i] += datos[v];
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        var idcolor = document.getElementById("selectColorODM").selectedOptions[0].value;
        idcolor = idcolor || "Viridis";
        var dataLayout = [
            {
              z: z, //[[1, null, 30, 50, 1], [20, 1, 60, 80, 30], [30, 60, 1, -10, 20]],
              x: horas, //['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], // nodos
              y: labels, //['Morning', 'Afternoon', 'Evening'], // horas = 01:00, 02:00, 03:00
              type: 'heatmap',
              hoverongaps: false,
              colorscale: "Viridis"//colorManager.getFullColorScale(idcolor)
            }
        ];
        //if(idcolor !== "0")
          //  dataLayout[0].colorscale = idcolor;
        var layout = {
            annotations: [],
            xaxis: {
              ticks: '',
            },
            yaxis: {
              ticks: '',
              ticksuffix: ' ',
              autosize: false
            },
            margin: {
                l: 130,
                r: 0,
                b: 40,
                t: 0
            },
            font: {
                color: "#ffffff"
            },
            paper_bgcolor: '#17202a82',
            plot_bgcolor: '#17202a82'
        };
        if(setLayout)
            layout = merge(layout, setLayout);
        if(firsTime === true)
            Plotly.newPlot(div, dataLayout, layout);
        else {
            var chart = document.getElementById(div);
            var newLayout = chart.layout;
            layout = merge(layout, newLayout);
            Plotly.react(div, dataLayout, layout);
        }
    }
    
    function resizeGrafica(div, newLayout) {
        var chart = document.getElementById(div);
        var layout = chart.layout;
        layout = merge(layout, newLayout);
        Plotly.relayout(div, layout);
    }
    return {
        crearGraficaDias: crearGraficaDias,
        crearGraficaProcedencia: crearGraficaProcedencia,
        crearGraficaODM: crearGraficaODM,
        crearTimeLine: crearTimeLine,
        crearGraficaTipo: crearGraficaTipo,
        resizeGraficaODM: resizeGraficaODM,
        resizeGrafica: resizeGrafica,
        crearHeatMap: crearHeatMap
    };
});

