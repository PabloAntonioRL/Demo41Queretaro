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
        "./colorManager"
    ], function (FeaturePainter, ShapeFactory, IconFactory, ColorMap,  Shapes, colorManager) {
    
    //colorManager.loadPalettes();
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
        
        this.color0 = colorManager.getGradianColor("viridis_r", 0, 1).rgb;
        this.color1 = colorManager.getGradianColor("viridis_r", 25, 1).rgb;
        this.color2 = colorManager.getGradianColor("viridis_r", 50, 1).rgb;
        this.color3 = colorManager.getGradianColor("viridis_r", 75, 1).rgb;
        this.color4 = colorManager.getGradianColor("viridis_r", 100, 1).rgb;
        
        this.gradient = ColorMap.createGradientColorMap([
                {level: y, color: "rgba(  0,   0,   255, 1.0)"},
                {level: y+=x, color: "rgba(  0, 125,   255, 1.0)"},
                {level: y+=x*2, color: "rgba(  0, 255,   255, 1.0)"},
                {level: y+=x*3, color: "rgba(  255, 255,   0, 1.0)"},
                {level: y+=x*4, color: "rgba(255, 0, 0, 1.0)"}
                ]);
    } 
    layerPainter.prototype = new FeaturePainter();
    layerPainter.prototype.constructor = layerPainter;
    layerPainter.prototype.getDetailLevelScales = function() {
        return [1 / 3000000, 1 / 2000000, 1 / 1000000,1 / 900000,1 / 4000000, 1/900000, 1/50000, 1/90000, 1/50000];
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
    var mayorConteo={"0": 0, "odm": 0, "dom": 0};
    var x = 1, y = 0;
    var lastH=0, update=0;
    x = parseInt($("#Densidad").val()) || 2;
    var gradient = ColorMap.createGradientColorMap([
                {level: y, color: "rgba(  0,   0,   255, 1.0)"},
                {level: y+=x, color: "rgba(  0, 125,   255, 1.0)"},
                {level: y+=x*2, color: "rgba(  0, 255,   255, 1.0)"},
                {level: y+=x*3, color: "rgba(  255, 255,   0, 1.0)"},
                {level: y+=x*4, color: "rgba(255, 0, 0, 1.0)"}
                ]);
    /*var gradient = ColorMap.createGradientColorMap([
                {level: y, color: colorManager.getGradianColor("viridis_r", 0, 1).rgb},
                {level: y+=x, color: colorManager.getGradianColor("viridis_r", 25, 1).rgb},
                {level: y+=x*2, color: colorManager.getGradianColor("viridis_r", 50, 1).rgb},
                {level: y+=x*3, color: colorManager.getGradianColor("viridis_r", 75, 1).rgb},
                {level: y+=x*4, color: colorManager.getGradianColor("viridis_r", 100, 1).rgb}
                ]);*/
    if(x <10) {
        layerPainter.prototype.density = {
             colorMap: gradient
        };
    }
    layerPainter.prototype.updateDensity = function (layer, x) {
        y=0;
        try {
            var color = document.getElementById("selectColorODM").selectedOptions[0].value;
        } catch(e) {}
        color = color || "viridis_r";
        layer.painter.density = {
                colorMap: ColorMap.createGradientColorMap([
                {level: y, color: colorManager.getGradianColor(color, 0, 1).rgb},
                {level: y+=x, color: colorManager.getGradianColor(color, 25, 1).rgb},
                {level: y+=x*2, color: colorManager.getGradianColor(color, 50, 1).rgb},
                {level: y+=x*3, color: colorManager.getGradianColor(color, 75, 1).rgb},
                {level: y+=x*4, color: colorManager.getGradianColor(color, 100, 1).rgb}
                ])
            };
    };
    
    layerPainter.prototype.paintBody = function (geoCanvas, feature, shape, layer, map, state) {
        
            var style = this.densityStyle;
            
            //style.stroke = this.complexStrokedLineStyle;
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



