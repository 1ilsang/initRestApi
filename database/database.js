var mysql = require('mysql');

var config = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password:'456852',
    database : 'firstHomeWork'
});

module.exports = config;