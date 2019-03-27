'use strict';
const express = require('express');
const request = require('request');

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
let broadcastResponseStatusCode;


// TODO: Perhaps replace this and the setTimeout function below with appropriate application logic/healthcheck.
function connectToDatabase(getUrlStatus) {

    connection.connect();

    // Get from the database the first mock broadcast URL
    connection.query('SELECT * FROM broadcaster WHERE id=1 LIMIT 1', function (error, results, fields) {

        if (error) {
            throw error;
        }

        result = results[0].url;

        console.log('The broadcast URL is: ', results[0].url);

    });

    connection.end();

    setTimeout(getUrlStatus, 7000);
}

function getBroadcastUrlStatus() {

    request(result, function (error, response, html) {

        if(!error && response.statusCode == 200) {
            broadcastResponseStatusCode = response.statusCode;
            console.log(`The broadcast response status code is: ${broadcastResponseStatusCode}`);
        } else {
            throw error;
        }

    });
}

// Wait for database to initialize and populate
setTimeout(() => {connectToDatabase(getBroadcastUrlStatus)}, 20000);


// App
const app = express();

app.get('/server-status', (req, res) => {

    res.send(`<div id=go-status>The broadcast response status code is: ${broadcastResponseStatusCode}</div>`);

});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);