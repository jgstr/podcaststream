'use strict';

const express = require('express');

// Constants
const PORT = 9000;
const HOST = '0.0.0.0';

// Connect to MySQL Database
const mysql    = require('mysql');
var connection = mysql.createConnection({
    host: process.env.DATABASE_HOST || '127.0.0.1',
    port     : 3306,
    user     : 'root',
    password : 'root',
    database : 'broadcast'
});

let result;


// TODO: MySQL takes too long to load from docker-compose. Need check/handle health via the application logic.

function connectToDatabase() {

    connection.connect();

    connection.query('SELECT status FROM broadcaster WHERE id=1 LIMIT 1', function (error, results, fields) {

        if (error) {
            throw error;
        }

        result = results[0].status;
        console.log('The status is: ', results[0].status);

    });


    connection.end();

}

setTimeout(connectToDatabase, 20000);

if(!result) {
    result = "nothing was added in result";
}


// App
const app = express();
app.get('/server-status', (req, res) => {

    // Now the database needs to deliver this message to "trigger"  #go-status
    res.send(`<div id=go-status>${result}</div>\n`);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);