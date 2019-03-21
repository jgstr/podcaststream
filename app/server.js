'use strict';

const express = require('express');

// Constants
const PORT = 9000;
const HOST = '0.0.0.0';

// Connect to MySQL Database
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host: process.env.DATABASE_HOST || '127.0.0.1',
    port     : 3306,
    user     : 'root',
    password : 'root',
    database : 'broadcast'
});

let result;


/*

TODO: ADDRESS SERVER CALL TO DELAYED DATABASE INITIALIZED FROM DOCKER-COMPOSE

When using docker-compose: app/server.js starts too soon and calls the MYSQL database before it initializes.
That's why the setTimeout timer is used below. Without that, node returns an ECONNREFUSED error.

For some reason, docker-compose does not check if MySQL has completely initialized before before starting the node
server. So I will need to find a way to make docker-compose wait until MySQL is ready before running the node server.

 */


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

setTimeout(connectToDatabase, 15000);

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