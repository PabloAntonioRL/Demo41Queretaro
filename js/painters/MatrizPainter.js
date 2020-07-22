/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define(["luciad/view/feature/FeaturePainter",
        "luciad/shape/ShapeFactory",
        'samples/common/IconFactory',
        'luciad/util/ColorMap',
        "recursos/js/Shapes",
        "./colorManager",
        "luciad/view/style/complexstroke/PatternFactory",
        "luciad/view/style/complexstroke/ArrowType"
    ], function (FeaturePainter, ShapeFactory, IconFactory, ColorMap,  Shapes, colorManager, PatternFactory, ArrowType) {
    
    function layerPainter() {
        this.outCircle = {
            draped: false,
            width: "20px",
            height: "20px",
            image: IconFactory.circle({
                width: 20,
                height: 20,
                fill: "rgba(0, 78, 146, 0.8)",
                stroke: "rgba(0, 78, 146, 0.8)"
            }),
            zOrder: 2
        };
        this.inCircle = {
            draped: false,
            width: "50px",
            height: "50px",
            image: IconFactory.circle({
                width: 30,
                height: 30,
                fill: "rgba(255,255,255,1)",
                stroke: "rgba(255,255,255,1)"
            }),
            zOrder: 3
        };
        
        this.densityStyle = {
            stroke: { width: 4 } 
        };
        this.regularStyle = {
            zOrder: 1,
            stroke: { width: 4, color: sAzul } 
        };
       /* colorManager.loadPalettes();
        var color0 = colorManager.getGradianColor("viridis_r", 0, 1).rgb;
        var color1 = colorManager.getGradianColor("viridis_r", 25, 1).rgb;
        var color2 = colorManager.getGradianColor("viridis_r", 50, 1).rgb;
        var color3 = colorManager.getGradianColor("viridis_r", 75, 1).rgb;
        var color4 = colorManager.getGradianColor("viridis_r", 100, 1).rgb;*/
        
        this.simple = {
            zOrder: 1,
            //draped: false,
            stroke: { width: 1, color: sNaranjaClaro } 
        };
        this.azul = {
            zOrder: 1,
            draped: false,
            stroke: getStrokeArrow("#86d549", true, 5)
            //stroke: { width: 4, color: "#86d549" } 
        };
        this.verde = {
            zOrder: 2,
            draped: false,
            stroke: getStrokeArrow("#52c569", true, 8)
        };
        this.amarillo = {
            zOrder: 3,
            draped: false,
            stroke: getStrokeArrow("#1e9b8a", true, 11)
        };
        this.naranja = {
            zOrder: 4,
            draped: false,
            stroke: getStrokeArrow("#25858e", true, 13)
        };
        this.rojo = {
            zOrder: 5,
            draped: false,
            stroke: getStrokeArrow("#38588c", true, 15)
        };
        this.nostyle = {
            zOrder: 0,
            draped: false,
            stroke: getStrokeArrow("#482173", true)
        };
        this.azul2 = {
            zOrder: 1,
            draped: false,
            stroke: getStrokeArrow("#86d549", false)
            //stroke: { width: 4, color: "#86d549" } 
        };
        this.verde2 = {
            zOrder: 2,
            draped: false,
            stroke: getStrokeArrow("#52c569", false)
        };
        this.amarillo2 = {
            zOrder: 3,
            draped: false,
            stroke: getStrokeArrow("#1e9b8a", false)
        };
        this.naranja2 = {
            zOrder: 4,
            draped: false,
            stroke: getStrokeArrow("#25858e", false)
        };
        this.rojo2 = {
            zOrder: 5,
            draped: false,
            stroke: getStrokeArrow("#38588c", false)
        };
        
        
        this.mayorTotal=0;
    } 
    layerPainter.prototype = new FeaturePainter();
    layerPainter.prototype.constructor = layerPainter;
    layerPainter.prototype.getDetailLevelScales = function() {
        return [1 / 3000000, 1 / 2000000, 1 / 1000000,1 / 900000,1 / 4000000, 1/900000, 1/50000, 1/90000, 1/50000];
    };
    
    function getStrokeArrow(color, forward, width) {
        var arrow = PatternFactory.arrow({type: ArrowType.PLAIN_FILLED, size: 25, fill: {color: color}, forward: forward});
        var arrowPattern = PatternFactory.atomic(PatternFactory.compose([
            arrow,
            PatternFactory.parallelLine({
              length: 16,
              line: {color: color, width: width || 5}
            })
        ]));
        var decoration = PatternFactory.append([
              PatternFactory.combineWithFallback(PatternFactory.gap(30)),
              arrowPattern,
              PatternFactory.combineWithFallback(PatternFactory.gap(30))
            ]);
        return {
          //regular: decoration,
          decorations: [{
              location: 0.4,
                pattern: arrow
          }],
          fallback: PatternFactory.parallelLine({
              line: {color: color, width: 4}
          })
        };
    }
    
    var sBlanco = 'rgb(255, 255, 255)';
    var sGrisOscuro = 'rgb(50, 50, 50)';
    var sGrisClaro = 'rgb(200, 200, 200)', GrisClaro = 'rgba(200, 200, 200, 0.5)';
    var sRojo = 'rgb(255, 0, 0)', Rojo = 'rgba(255, 0, 0, 0.5)';
    var sAmarilloClaro = 'rgb(255, 255, 204)';
    var sGris = 'rgb(230, 230, 230)', Gris = "rgba(230,230,230, 0.5)";
    var sNaranjaClaro = 'rgba(255, 239, 204, 0.5)';
    var sNaranja = 'rgb(255, 174, 102)', Naranja = 'rgba(255, 174, 102, 0.5)';
    var Verde = "rgba(50,230,50,0.5)", sVerde = "rgb(50,230,50)";
    var sMorado ="rgb(200,0,200)", Morado = "rgba(200,0,200, 0.5)";
    var Azul = "rgba(70, 100, 230, 0.5)", sAzul = "rgb(70, 100, 230)";
    var VerdeClaro = "rgba( 134, 255, 132 , 0.5)", sVerdeClaro = "rgb( 134, 255, 132 )";
    var sAmarillo = "rgb( 252, 241, 0 )", Amarillo = "rgba( 252, 241, 0, 0.5 )";
    var mayorConteo={"0": 0, "odm": 0, "dom": 0};
    var x = 1, y = 0;
    var lastH=0, update=0;
    layerPainter.prototype.restartContador = function () {
        this.mayorTotal = 0;
    };
    
    layerPainter.prototype.paintBody = function (geoCanvas, feature, shape, layer, map, state) {
        
        
        /*var h = parseFloat($("#AlturaCurvas").val());
        if(h !== lastH) {
            update = 0;
            lastH = h;
        }
          
        if(update <100) {
            var points = shape.pointCount;
            for(var i=0; i<points; i++) {
                var point = shape.getPoint(i);
                point.z = point.z * h;
            }
        }*/
        var valor=0;
        var label = layer.label;
        //var range = getActualRange();
        var style, dir;
        var datos = feature.properties.datos;
        for(var i in datos) {
            valor += datos[i].total;
        }
        this.mayorTotal = valor>this.mayorTotal? valor: this.mayorTotal;
                //dir = document.getElementById("tipoMatriz").selectedOptions[0].value;
            //var s = document.getElementById("tipoMatriz").selectedOptions[0].value;
            //mayorConteo[dir] = valor > mayorConteo[dir]? valor: mayorConteo[dir];
            var p = (valor / this.mayorTotal) * 100;
            var h;
            //var dir = document.getElementById("tipoMatriz").selectedOptions[0].value;
            //dir = dir === "odm"? true: false;
            if(!p)
                return false;
            else {
                if(p < 30) {
                    style = this.simple;//dir? this.azul: this.azul2;
                } else {
                    if(p<40 ){
                        style = this.azul;
                    }else {
                    if(p < 55) {
                        style = this.verde;//dir? this.verde: this.verde2;
                        h=750;
                    } else {
                        if(p < 70) { 
                            style = this.amarillo;//dir? this.amarillo: this.amarillo2;
                            h = 1000;
                        } else {
                            if(p < 90) {
                                style = this.naranja;//dir? this.naranja: this.naranja2;
                                h = 1250;
                            } else {
                                style = this.rojo;//dir? this.rojo: this.rojo2;
                                h = 1500;
                            }
                        }
                    }
                }
                }
            }
            /*if(!feature["shape"+h]) {
                var point1, point2, np = shape.pointCount-1;
                point1 = shape.getPoint(0);
                point2 = shape.getPoint(np);
                var arcLevel = Shapes.create3dArcBy2Points(layer.model.reference, point1, point2, h, feature.id, feature.properties);
                feature["shape"+h] = arcLevel.shape;
            }*/
            geoCanvas.drawShape(shape, style);
        
        
        
    };
    /*
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
        var label = layer.label, valor;
        if(label === "Matriz Origen Destino")
            valor = feature.properties.Valor;
        else
            valor = feature.properties.ValorHistorial;
        
            labelName = feature.properties.Nombre;
            label  = '<div class="labelwrapper">' +
                                    '<div class="sensorLabel blueColorLabel">' +
                                    '<div class="theader">' +
                                    '<div class="leftTick blueColorTick"></div>' +
                                    '<div class="rightTick blueColorTick"></div>' +
                                    '<div class="name">'+labelName+'</div>' +
                                    '</div>' +
                                    '<div class="type">Dispositivos : '+valor +'</div>' +
                                    '</div>' +
                                    '</div>';
            //label = "<span style='color: $color' class='label'>" + labelName + "</span>";
            //var tramo = document.getElementById("selectorTramo").selectedOptions[0].innerHTML;
            //if(tramo === "Todos" || tramo === feature.id)
                labelCanvas.drawLabel(label,shape, {zOrder: 5});
        
    };
    */
    return layerPainter;
});



