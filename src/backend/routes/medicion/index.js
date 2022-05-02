var express = require('express');
var routerMedicion = express.Router();
var pool = require('../../mysql');


routerMedicion.get('/:id/mediciones', function(req, res) {
    pool.query('SELECT * from Mediciones WHERE dispositivoId=?', [req.params.id], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});


module.exports = routerMedicion;