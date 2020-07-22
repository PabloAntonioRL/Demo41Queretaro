/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define(["luciad/view/feature/FeaturePainter",
        "luciad/shape/ShapeFactory",
        "luciad/view/style/PathLabelPosition",
        "luciad/view/style/PathLabelRotation",
        'luciad/util/ColorMap'
    ], function (FeaturePainter, ShapeFactory, PathLabelPosition, PathLabelRotation, ColorMap) {
    
    function layerPainter() {
        this.sensorStyle = {
                width: "40px",
                height: "40px",
                image: "data/icons/sensor4.png",
                draped: false,
                zOrder: 10
        };
        this.selectSensorStyle = {
                width: "45px",
                height: "45px",
                image: "data/icons/sensor4.png",
                zOrder: 10
        };
        this.labelVector = {
            positions: PathLabelPosition.ABOVE,
            rotation: PathLabelRotation.FIXED_LINE_ANGLE
        };
        //  Estilos para vectores
        this.vectorR = {
            stroke: {
                color: sRojo,
                width: 5},
            zOrder: 4
        };
        this.vectorV = {                
            stroke: {
                color: sVerde,
                width: 5},
            zOrder: 2
        };
        this.vectorA = {                
            stroke: {
                color: sAmarillo,
                width: 5},
            zOrder: 3
        };
        this.vectorG = {                
            stroke: {
                color: sGris,
                width: 5},
            zOrder: 1
        };
        //  Estilos para vectores con transparencia
        this.vectorRT = {
            stroke: {
                color: Rojo,
                width: 5},
            zOrder: 0
        };
        this.vectorVT = {                
            stroke: {
                color: Verde,
                width: 5},
            zOrder: 0
        };
        this.vectorAT = {                
            stroke: {
                color: Amarillo,
                width: 5},
            zOrder: 0
        };
        this.vectorGT = {                
            stroke: {
                color: Gris,
                width: 5},
            zOrder: 0
        };
        this.selectedVector = { 
            stroke: {
                color: sAzul,
                width: 9},
            zOrder: 0
        };
        this.contorno = { 
            stroke: {
                color: sGrisOscuro,
                width: 9},
            zOrder: 0
        };
        //  Estilos para los circulos de dispersion
        this.circuloV = { 
            fill: {color: Verde  },
            stroke: {
                color: sGris,
                width: 2} 
        };
        this.circuloA = { 
            fill: {color: Amarillo  },
            stroke: {
                color: sGris,
                width: 2} 
        };
        this.circuloR = { 
            fill: {color: Rojo  },
            stroke: {
                color: sGris,
                width: 2} 
        };
        
        this.mayorConteo=0;
    }
    layerPainter.prototype = new FeaturePainter();
    layerPainter.prototype.constructor = layerPainter;
    layerPainter.prototype.getDetailLevelScales = function() {
        return [1 / 3000000, 1 / 2000000, 1 / 1000000,1 / 500000,1 / 250000];
    };
    
    var sBlanco = 'rgb(255, 255, 255)';
    var sGrisOscuro = 'rgb(50, 50, 50)';
    var sGrisClaro = 'rgb(200, 200, 200)', GrisClaro = 'rgba(200, 200, 200, 0.5)';
    var sRojo = 'rgb(255, 0, 0)', Rojo = 'rgba(255, 0, 0, 0.5)';
    var sAmarilloClaro = 'rgb(255, 255, 204)';
    var sGris = 'rgb(230, 230, 230)', Gris = "rgba(230,230,230, 0.5)";
    var sNaranjaClaro = 'rgb(255, 239, 204)';
    var sNaranja = 'rgb(255, 174, 102)', Naranja = 'rgba(255, 174, 102, 0.5)';
    var Verde = "rgba(50,230,50,0.5)", sVerde = "rgb(50,230,50)";
    var sMorado ="rgb(200,0,200)", Morado = "rgba(200,0,200, 0.5)";
    var Azul = "rgba(70, 100, 230, 0.5)", sAzul = "rgb(70, 100, 230)";
    var VerdeClaro = "rgba( 134, 255, 132 , 0.5)", sVerdeClaro = "rgb( 134, 255, 132 )";
    var sAmarillo = "rgb( 252, 241, 0 )", Amarillo = "rgba( 252, 241, 0, 0.5 )";
    var maxRadio = 0, minRadio = 1;
    //var reference = ReferenceProvider.getReference("CRS:84");
    //var mayorConteo={"0": 0, "from": 0, "to": 0};
    /*
    var x =2, y=0;
    var gradient = ColorMap.createGradientColorMap([
                {level: y, color: "rgba(  0,   0,   255, 1.0)"},
                {level: y+=x, color: "rgba(  0, 125,   255, 1.0)"},
                {level: y+=x*2, color: "rgba(  0, 255,   255, 1.0)"},
                {level: y+=x*3, color: "rgba(  255, 255,   0, 1.0)"},
                {level: y+=x*4, color: "rgba(255, 0, 0, 1.0)"}
                ]);
    
    layerPainter.prototype.density = {
         colorMap: gradient
    };*/
    
    layerPainter.prototype.restartContador = function () {
        this.mayorConteo = 0;
    };
    var mayorTiempo={"0": 0, "from": 0, "to": 0};
    layerPainter.prototype.paintBody = function (geoCanvas, feature, shape, layer, map, state) {
        try {
            var cir = document.getElementById("verMapaCalor").checked;
        } catch(e) {}
        if(cir === true) {
            var id = feature.id;
            var maxRadio = parseFloat($("#RadioLectores").val());
            var matrix = feature.properties.Matriz[id];
            if(matrix !== null) {
                try {
                    var range = getRangeTime();
                    range.inicio = range.inicio || 0;
                    range.fin = range.fin || 0;
                } catch(E) {}
                var inicio = Date.parse(range.inicio);
                var fin = Date.parse(range.fin);
                var diametro, cStyle;
                var suma=0;
                for(var d in matrix) {
                    for(var f in matrix[d]) {
                        if(inicio && fin) {
                            var fecha = Date.parse(matrix[d][f].hora);
                            if(fecha>=inicio && fecha<fin) {
                                suma += matrix[d][f].total;
                            }
                        } else
                        //for(var e in matrix[d][f]) {
                            suma += matrix[d][f].total;
                               
                        //}
                    }
                }
                this.mayorConteo = suma>this.mayorConteo? suma: this.mayorConteo;
                var porcent = (suma / this.mayorConteo);
                diametro = porcent * maxRadio;
                porcent = porcent*100;
                if(!porcent)
                    cStyle = this.circuloV;
                else {
                    if(porcent < 34)
                        cStyle = this.circuloV;
                    else {
                        if(porcent < 66)
                            cStyle = this.circuloA;
                        else {
                            cStyle = this.circuloR;
                        }
                    }
                }
                if(diametro && cStyle) {
                    var circle = ShapeFactory.createCircleByCenterPoint(shape.reference, shape, diametro);
                    geoCanvas.drawShape(circle, cStyle);
                }
                /*if(id === s) {
                    var totalC = 0, mayorC=0;
                    var totalT = 0, mayorT=0;
                    for(var nodo in matrix) {
                        totalC += matrix[nodo].count || 0;
                        mayorC = matrix[nodo].count > mayorC? matrix[nodo].count: mayorC;
                        totalT += matrix[nodo].elapsed || 0;
                        mayorT = matrix[nodo].elapsed > mayorT? matrix[nodo].elapsed: mayorT;
                    }
                    //feature.properties["Total dispositivos dispersion"] = totalC;
                    //feature.properties["Total tiempo dispersion"] = totalT;
                    diametro = 500;
                    cStyle = this.circuloR;
                    layer.model.put(feature);
                } else {
                    var datos = matrix[id];
                    if(datos) {
                        var mayorC=0;
                        var mayorT=0;
                        for(var nodo in matrix) {
                            mayorC = matrix[nodo].count > mayorC? matrix[nodo].count: mayorC;
                            mayorT = matrix[nodo].elapsed > mayorT? matrix[nodo].elapsed: mayorT;
                        }
                        var count = datos.count || 0;
                        var time = datos.elapsed || 0;
                        var porcent = (count / mayorC) *100;
                        porcent = porcent<10? 10: porcent;
                        diametro = porcent*5;
                        porcent = (time / mayorT) *100;
                        if(!porcent)
                            cStyle = this.circuloV;
                        else {
                            if(porcent < 34)
                                cStyle = this.circuloV;
                            else {
                                if(porcent < 66)
                                    cStyle = this.circuloA;
                                else {
                                    cStyle = this.circuloR;
                                }
                            }
                        }
                    }
                }
                // Diametro corresponde al numero de dispositivos
                // Stilo del circulo depende del tiempo registrado
                */
               
            }
        }

        geoCanvas.drawIcon(shape, this.sensorStyle);
        
         
    };
    
    
    layerPainter.prototype.paintLabel = function (labelCanvas, feature, shape, layer, map, state) {
        var label, labelName = "", i=0, properties = feature.properties;
        
        if(properties) {
            if(properties.Nombre) {
                labelName = properties.Nombre;
            }
            else {
            for(var key in properties) {
                if(i===0)
                    labelName = properties[key];
                i++;
            } 
            }
        } else {
            labelName = feature.id;
        }
        
            var  id = feature.id;
            var count = feature.properties[id+"-"+id] || 0;
            var properties = feature.properties;
            var totalM = feature.properties["Total en rango de tiempo"];
            var totalD = feature.properties["Total diario (DTM)"];
            
            label  = '<div class="labelwrapper">' +
                                    '<div class="sensorLabel blueColorLabel">' +
                                    '<div class="theader">' +
                                    '<div class="leftTick blueColorTick"></div>' +
                                    '<div class="rightTick blueColorTick"></div>' +
                                    '<div class="name">'+labelName+'</div>' +
                                    '</div>' +
                                    '<div class="type">ID : '+id +'</div>' +
                                    '<div class="type">Matriz : '+totalM +'</div>' +
                                    '</div>' +
                                    '</div>';
            if(state.level > 3) {     
                if(state.selected)
                    labelCanvas.drawLabel(label.replace("$color", sRojo),shape, {});
                else
                    labelCanvas.drawLabel(label.replace("$color", sBlanco),shape, {});
            }
        
    };
 
    return layerPainter;
});

