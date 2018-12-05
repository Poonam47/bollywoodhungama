'use strict';
const mysql = require('mysql');

const nysqlConfig = JSON.parse(process.env.mysql);

var db = mysql.createConnection(nysqlConfig);

var executeQuery = (queryStr, resultHandler) => {
    if (db) { 
        console.log("already Connected!");
        db.query(queryStr, resultHandler);
    }
    else {
        db.connect((connectionError) => {
            if (connectionError) throw connectionError;
            console.log("MYSQL Connected!");
            db.query(queryStr, resultHandler);
        })
    }
};

module.exports = {
    executeQuery
};