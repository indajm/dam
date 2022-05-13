var express = require('express');
var routerEV = express.Router();
var pool = require('../../mysql');


routerEV.get('/log/:id', function(req, res) {
    console.log("router electrovalvula");
    pool.query('SELECT * From Log_Riegos WHERE electrovalvulaId = ?', [req.params.id], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            console.log(err);
            return;
        }
        res.send(result);
    });
});

routerEV.get('/log', function(req, res) {
    console.log("Get everything from Log_Riegos");
    pool.query('SELECT * From Log_Riegos', function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            console.log(err);
            return;
        }
        res.send(result);
    });
});

// The difference between abrir (open) and cerrar (close) is that, when we want to open the EV, then apertura=True. When we want to close the EV, then apertura=False
routerEV.put("/abrir/:id", function(req, res){
    console.log("router/electrovalvula/index.js: abrir electrovalvula");
    pool.query('INSERT INTO Log_Riegos (fecha, apertura, electrovalvulaId) VALUES (?, ?, ?)', [new Date(), true, req.params.id], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            console.log(err);
            return;
        }
        res.send(result);
    });
});


routerEV.put("/cerrar/:id", function(req, res){
    console.log("router/electrovalvula/index.js: cerrar electrovalvula");
    pool.query('INSERT INTO Log_Riegos (fecha, apertura, electrovalvulaId) VALUES (?, ?, ?)', [new Date(), false, req.params.id], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            console.log(err);
            return;
        }
        res.send(result);
    });
});

module.exports = routerEV;