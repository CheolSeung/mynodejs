const mysql = require("mysql");

let conn = mysql.createConnection({
    host : "127.0.0.1",
    user : "root",
    password : "zkddl9197@",
    port : "3306",
    database : "nodejs_DB"
});

module.exports = conn;