var express = require('express');
var routerMedicion = express.Router();
var pool = require('../../mysql');


routerMedicion.post('', function(req, res){
    console.log("routerMedicion.post");
    console.log(`req.body.fecha: ${req.body.fecha}`);
    console.log(`req.body.valor: ${req.body.valor}`);
    console.log(`req.body.dispositivoId: ${req.body.dispositivoId}`);
    pool.query('INSERT INTO Mediciones (fecha, valor, dispositivoId) VALUES (?, ?, ?)', [req.body.fecha, req.body.valor, req.body.dispositivoId], function(err, result, fields){
        if (err){
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});


routerMedicion.get('/:id', function(req, res) {
    pool.query('SELECT * from Mediciones WHERE dispositivoId=?', [req.params.id], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

routerMedicion.get('', function(req, res) {
    pool.query('SELECT * from Mediciones', function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});


module.exports = routerMedicion;