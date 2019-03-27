'use strict';

const express = require('express');

// Constants
const PORT = 9001;
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
function insertUrlToDatabase() {

    connection.connect();
    console.log("Connected to the database.");

    // Insert broadcast URL into database. Note: this URL is also added via the insert-data.sql used by the
    // database/Dockerfile.
    connection.query('INSERT INTO broadcaster (url) VALUES (\'http://localhost:9001/broadcast-server-status\')',
                   function(error, results, fields) {
        if(error) throw error;
        console.log("URL added to database.");
    });

    connection.end();

}

// TODO: 'timeout' here must occur BEFORE 'timeout' in app/server.js. Server.js pulls data from this script.
setTimeout(insertUrlToDatabase, 13000);


// App
const app = express();
app.get('/broadcast-server-status', (req, res) => {

    // Now the database needs to deliver this message to "trigger"  #go-status
    res.send("<div id=go-status>Broadcaster is running</div>\n");
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);