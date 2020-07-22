/*
 * Nuevo archivo por Pablo
 */

define([], function () {
    var bgColor = "";
    var leftP = $("#panelIzquierdo");
    var timePanel = $("#timeMapPanel");
    var generalLayout = {
        autosize: false,
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
        paper_bgcolor: '#17202a',
        plot_bgcolor: '#17202a'
    };
    
    function merge(obj1, obj2) {
        var newObj = {}, key;
        for(key in obj1) newObj[key] = obj1[key];
        for(key in obj2) newObj[key] = obj2[key];
        return newObj;
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
    function crearGraficaProcedencia(div, data, origen) {
        //var origen = document.getElementById("selectOrigen");
        layout = merge(generalLayout, layout);
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
        var labels =[], parents=[], values=[];
        var es = [], index={}, i=0;
        //data = data[origen];
        if(origen) {
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
        es.sort(function (a, b) {
            if (a.value > b.value) {
              return -1;
            }
            if (a.value < b.value) {
              return 1;
            }
            // a must be equal to b
            return 0;
        });
        o = 0;
        for(o in z) {
            labels[labels.length] = z[o];
            parents[parents.length] = "";
            values[values.length] = 0;
        }
        
        for(e in es) {
            var name = normalized(es[e].name);
            for(o in zonas.estado) {
                if(name === normalized(zonas.estado[o])) {
                    labels[labels.length] = es[e].name;
                    parents[parents.length] = zonas.zona[o];
                    values[values.length] = es[e].value;
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
        parents[parents.length] = "Procedencia";*/
        console.log(labels);
        console.log(parents);
        console.log(values);
        var dataLayout = [{
            type: "sunburst",
            labels: labels, //["Eve", "Cain", "Seth", "Enos", "Noam", "Abel", "Awan", "Enoch", "Azura"],
            parents: parents, //["", "Eve", "Eve", "Seth", "Seth", "Eve", "Eve", "Awan", "Eve" ],
            values:  values, //[0, 14, 12, 10, 2, 6, 6, 4, 4],
            outsidetextfont: {size: 10, color: "#377eb8"},
            leaf: {opacity: 0.4},
            marker: {line: {width: 2}}
        }];
        var layout = merge(generalLayout, {
            height: 200
        });
        
        Plotly.newPlot(div, dataLayout, layout);
    }
    /* 
    * ==============================================================================================
    *                                   dGrafica de Tipo
    * ============================================================================================== 
    */
   function crearGraficaTipo(div, data, origen) {
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
        if(origen) {
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
                gridcolor: '#6a6868'
            },
            paper_bgcolor: '#17202a',
            plot_bgcolor: '#17202a'
        };
        Plotly.newPlot(div, dataLayout, layout);
   }
    /* 
    * ==============================================================================================
    *                                   Grafica de ODM
    * ============================================================================================== 
    */
    function crearGraficaODM(div, data, origenS) {
        var labels=[], index={}, i=0, x=[];
        for(var o in data) {
            if(o !== "horas" && o !== "tipo") {
                labels[i] = o;
                x[i] = 0;
                index[o] = i;
                i++;
            }
        }
        //labels[labels.lencght] = "Otros";
        var origen =[], destino=[];
        i=0;
        var datos =[], source=[], target=[];
        if(origenS) {
            o=origenS;
            origen[origen.length] = {name:o, value:data[o].length};
                for(var d in data[o]) {
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
        } else {
        for(o in data) {
            if(o !== "horas" && o !== "tipo") {
                origen[origen.length] = {name:o, value:data[o].length};
                for(var d in data[o]) {
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
        }
    }
        var n=i, no=[], nx=[], nd=[], t=0;
        for(i=0; i<n-1; i++) {
            if(x[i] < x[i+1]) {
                f = x[i];
                x[i] = x[i+1];
                x[i+1] = f;
                o = source[i];
                source[i] = source[i+1];
                source[i+1] = o;
                d = target[i];
                target[i] = target[i+1];
                target[i+1] = d;
                
                /*nx[i] = x[i];
                no[i] = source[i];
                nd[i] = target[i];*/
                i-=3;
            }
        }
        var nodeN = document.getElementById("nNodosODM").value;
        n = nodeN || 10;
        for(i=0; i<n; i++) {
                nd[i] = target[i];
                no[i] = source[i];
                nx[i] = x[i];
        }
        console.log(labels);
        console.log(nd);
        console.log(no);
        console.log(nx);
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
              label: labels,
             //label: ["A1", "A2", "B1", "B2", "C1", "C2"],
             //color: ["blue", "blue", "blue", "blue", "blue", "blue"]
                },

            link: {
                source: no,
                target: nd,
                value: nx
              //source: [0,1,0,2,3,3],
              //target: [2,3,3,4,4,5],
              //value:  [8,4,2,8,4,2]
            }
        };
        dataLayout = [dataLayout];
        var layout = {
            height: 400,
            width: 700,
            font: {
              size: 8
            }
        };
        layout = merge(generalLayout, layout);
        Plotly.newPlot(div, dataLayout, layout);
    }
    /* 
    * ==============================================================================================
    *                                   Grafica de Linea de tiempo
    * ============================================================================================== 
    */
   function crearTimeLine(div, data, inicio, fin, origen) {
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
       Plotly.newPlot(div, data, layout, {responsive: true});
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
        if(origen) {
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
    
    return {
        crearGraficaDias: crearGraficaDias,
        crearGraficaProcedencia: crearGraficaProcedencia,
        crearGraficaODM: crearGraficaODM,
        crearTimeLine: crearTimeLine,
        crearGraficaTipo: crearGraficaTipo
    };
});

