/*
 * Nuevo archivo por Pablo
 */

define([
    "luciad/reference/ReferenceProvider",
    "recursos/js/Shapes",
    "luciad/geodesy/GeodesyFactory",
    "luciad/shape/ShapeFactory",
    "luciad/model/feature/Feature"
], function (ReferenceProvider, Shapes, GeodesyFactory, ShapeFactory, Feature) {
    var reference = ReferenceProvider.getReference("CRS:84");
    function crearConexion(layer, origen, destino, properties) {
        var id = origen.id+"-"+destino.id;
        var fecha, total, f, line;
        /*for(var i in properties) {
            total = properties[i].total;
            fecha = properties[i].hora;
            f = Date.parse(fecha);
            var p = {
                hora: fecha,
                horaInt: f,
                id: id
            };*/
            var p={
                id: id,
                origen: origen.id,
                destino: destino.id,
                datos: properties
            };
            var x=[origen.shape.x, destino.shape.x];
            var y = [origen.shape.y, destino.shape.y];
            line = Shapes.createPolyline(reference, x, y, 0, id, p);
            layer.model.put(line);
        //}
    }
    
    function destruirMatriz(layer) {
        var featuresL = layer.model.query().array;
        var features = [];
        for(var i in featuresL) {
            features[i] = featuresL[i];
        }
        //while(features.hasNext()) {
        features.forEach(function (feature) {
            try {
                //var feature = features.next();
                layer.model.remove(feature.id);
            } catch(e) {
                console.error(e);
            }
        });
    }
    
    function crearDensidad3D(layer, origen, destino, properties, mayor) {
        var id = origen.id+"-"+destino.id;
        var fecha, total, f, arc, maxArcs=20;
        for(var i in properties) {
            total = properties[i].total;
            fecha = properties[i].hora;
            f = Date.parse(fecha);
            if(mayor) {
                total = (total / mayor);
                total = parseInt(total * maxArcs)+1;
            }
            for(var j=0; j<total; j++) {
                var p = {
                    hora: fecha,
                    horaInt: f,
                    id: id+"-"+j,
                    origen: origen.id,
                    destino: destino.id,
                    total: properties[i].total
                };
                arc = Shapes.create3dArcBy2Points(reference, origen.shape, destino.shape, [1850, 2800], id+"-"+f+"-"+j, p, 20);
                layer.model.put(arc);
            }
        }
    }
    
    function crearDensidad(layer, origen, destino, properties, mayor) {
        var id = origen.id+"-"+destino.id;
        var fecha, total, f, line, maxArcs=20;
        for(var i in properties) {
            total = properties[i].total;
            fecha = properties[i].hora;
            f = Date.parse(fecha);
            if(mayor) {
                total = (total / mayor);
                total = parseInt(total * maxArcs)+1;
            }
            for(var j=0; j<total; j++) {
                var p = {
                    hora: fecha,
                    horaInt: f,
                    id: id+"-"+j,
                    origen: origen.id,
                    destino: destino.id,
                    total: properties[i].total
                };
                var x=[origen.shape.x, destino.shape.x];
                var y = [origen.shape.y, destino.shape.y];
                line = Shapes.createPolyline(reference, x, y, 0, id+"-"+f+"-"+j, p);
                layer.model.put(line);
            }
        }
        
    }
    /*
     * =========================================================================
     * 
     * =========================================================================
     */
    return {
        crearDensidad3D: crearDensidad3D,
        destruirMatriz: destruirMatriz,
        crearDensidad: crearDensidad,
        crearConexion: crearConexion
    };
});

