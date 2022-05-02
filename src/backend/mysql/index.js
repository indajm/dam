// Import the library, package mysql and save it in a variable
var mysql = require('mysql');

// Let's create the connection
var configMysql = {
    connectionLimit: 10,
    host: 'mysql-server',
    port: 3306,
    user: 'root',
    password: 'userpass',
    database: 'DAM'
}
var pool = mysql.createPool(configMysql);
pool.getConnection((err, connection) => {
    if (err) {
        switch (err.code) {
            case 'PROTOCOL_CONNECTION_LOST':
                console.error('La conexion a la DB se cerró.');
                break;
            case 'ER_CON_COUNT_ERROR':
                console.error('La base de datos tiene muchas conexiones');
                break;
            case 'ECONNREFUSED':
                console.error('La conexion fue rechazada');
        }
        if (connection) {
            console.log('OK');
            connection.release();
        }
        return;
    }
});
module.exports = pool;

