/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define([
    "recursos/js/Util"
], function (Util) {
    function getBalloon(feature) {
        var etiqueta = "", etiquetaDatos="";
        var _etiqueta = //block, flex
                '<div class="labelDatos" style="display:block !important">' +
                '<table>'+
                 '$DATOS' +
                '</table>' +
                '</div>';
        var _etiquetaDatos = '<tr bgcolor="$COLOR">' +
                '<td align="center">' +
                '<b>$Propertie</b>' +
                '</td >' +
                '<td align="center">' +
                '<b>$Value</b>' +
                '</td >' +
                '</tr>';
        var _etiquetaDatos2 = '<tr bgcolor="$COLOR">' +
                '<td align="center">' +
                '<b>$Propertie</b>' +
                '</td >' +
                '<td align="center">' +
                '<b>$Count</b>' +
                '</td >' +
                '<td align="center">' +
                '<b>$Time</b>' +
                '</td >' +
                '</tr>';
        
        var _etiquetaDatos3 = '<tr bgcolor="$COLOR">' +
                '<td align="center">' +
                '<b>$Propertie</b>' +
                '</td >' +
                '<td align="center">' +
                '<b>$Count</b>' +
                '</td >' +
                '</tr>';
        var _etiquetaDatos4 = '<tr>' +
                '<td align="center">' +
                '<b>$value</b>' +
                '</td >' +
                '</tr>';
        //var name = "Transmision en vivo";
        var properties = feature.properties;
        var i=0, color;
        if(properties) {
            var range = getRangeTime();
            var inicio = Date.parse(range.inicio) || 0;
            var fin = Date.parse(range.fin) || 0;
            for (var key in properties) {
                if(i%2 === 0 )
                    color = '#19232c';
                else
                    color = '';
                i++;
                switch(key) {
                    case "Horas": break;
                    case "Total por hora": 
                        etiquetaDatos += '</table><hr align="left" noshade="noshade" size="2" width="95%" style="color: #bcdb28;"/><table>';
                        var totales = properties[key];
                        var horas = properties.Horas;
                        etiquetaDatos+= _etiquetaDatos3.replace("$Propertie", "Horas").replace("$Count", "Vehículos ").replace("$COLOR", color);
                        color = color === ""? "#19232c": "";
                        for(var j in horas) {
                            var hora = Date.parse(horas[j]);
                            if(hora>= inicio && hora<fin) {
                                var text = Util.formatTime(horas[j]);
                                etiquetaDatos+= _etiquetaDatos3.replace("$Propertie", text).replace("$Count",  totales[j]).replace("$COLOR", color);
                                color = color === ""? "#19232c": "";
                            }
                        }
                        etiquetaDatos += '</table><table>';
                        break;
                        
                    case "Matriz":
                        etiquetaDatos += '</table><hr align="left" noshade="noshade" size="2" width="95%" style="color: #bcdb28;"/><table>';
                        var matriz = properties[key][feature.id];
                        etiquetaDatos+= _etiquetaDatos2.replace("$Propertie", "Destino").replace("$Count", "Hora").replace("$Time", "Veiculos").replace("$COLOR", color);
                        color = color === ""? "#19232c": "";
                        for(var to in matriz) {
                            var total="<table>$fila</table>";
                            var hora = "<table>$fila</table>";
                            var t="",h="";
                            for(var j in matriz[to]) {
                                var horaInt = Date.parse(matriz[to][j].hora)+(1000*60*5);
                                if(horaInt>= inicio && horaInt<fin) {
                                    var text = Util.formatTime(matriz[to][j].hora);
                                    t += _etiquetaDatos4.replace("$value", matriz[to][j].total);
                                    h += _etiquetaDatos4.replace("$value", text);
                                }
                            }
                            total = total.replace("$fila", t);
                            hora = hora.replace("$fila", h);
                           etiquetaDatos+= _etiquetaDatos2.replace("$Propertie", to).replace("$Count", hora).replace("$Time", total).replace("$COLOR", color);
                           color = color === ""? "#19232c": "";
                        }
                        //color = color === ""? "#19232c": "";
                        etiquetaDatos += '</table><hr align="left" noshade="noshade" size="2" width="95%" style="color: #bcdb28;"/><table>';
                        break;
                    default:
                        etiquetaDatos+= _etiquetaDatos.replace("$Propertie", key+":").replace("$Value", properties[key]===null? "": properties[key]).replace("$COLOR", color);
                        break;
                }
            }
        }
            
        etiqueta = _etiqueta.replace("$DATOS", etiquetaDatos);
        var balloon;
        //balloon = etiqueta.replace('$NAME', name);
        //console.log(feature.properties.name);
        return etiqueta;   
    }
    
    return  { getBalloon: getBalloon };
});


