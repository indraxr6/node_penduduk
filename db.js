'use strict'
const mysql = require("mysql");

//connection to database
const db = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "",
          database: "penduduk"
});
module.exports = db;
