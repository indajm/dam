var express = require('express');
var routerEV = express.Router();
var pool = require('../../mysql');

console.log("999");
routerEV.get('/:id/log', function(req, res) {
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


module.exports = routerEV;