/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define([
    
], function () {
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
        var _etiquetaDatos3 = '<tr bgcolor="$COLOR">' +
                '<td align="center">' +
                '<b>$Propertie</b>' +
                '</td >' +
                '<td align="center">' +
                '<b>$Count</b>' +
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
                    case "datos": 
                        etiquetaDatos += '</table><hr align="left" noshade="noshade" size="2" width="95%" style="color: #bcdb28;"/><table>';
                        var totales = properties[key];
                        etiquetaDatos+= _etiquetaDatos3.replace("$Propertie", "Horas").replace("$Count", "Vehículos ").replace("$COLOR", color);
                        color = color === ""? "#19232c": "";
                        for(var j in totales) {
                            var hora = Date.parse(totales[j].hora);
                            if(hora>= inicio && hora<fin) {
                                etiquetaDatos+= _etiquetaDatos3.replace("$Propertie", totales[j].hora).replace("$Count",  totales[j].total).replace("$COLOR", color);
                                color = color === ""? "#19232c": "";
                            }
                        }
                        etiquetaDatos += '</table><table>';
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


