var express = require('express');
var routerDispositivo = express.Router();
var pool = require('../../mysql');


//Devuelve un array de dispositivos
routerDispositivo.get('/', function(req, res) {
    console.log("ROUTER DISPOSITIVO");
    pool.query('SELECT * from Dispositivos', function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

// Devuelve la info de un dispositivo
routerDispositivo.get("/:id", function(req, res){
    console.log("ROUTER DISPOSITIVO - ID");
    pool.query('SELECT * FROM Dispositivos WHERE Dispositivos.dispositivoId = ?', [req.params.id], function(err, result, fields){
        if (err){
            console.log("Error dispositivo id");
            res.send(err).status(400);
            return;
        }
        res.send(result);
    })

})


//Espera recibir por parámetro un id de dispositivo y devuelve su última medición
routerDispositivo.get('/:idDispositivo/ultima-medicion', function(req, res) {
    console.log("ULTIMA MEDICION");
    pool.query('SELECT * from Mediciones WHERE Mediciones.dispositivoId=? ORDER BY Mediciones.fecha DESC LIMIT 1', [req.params.idDispositivo], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        console.log("Resultado ultima medicion: "+ result);
        res.send(result);
    });
});



module.exports = routerDispositivo;