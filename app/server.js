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


// TODO: MySQL takes too long to load from docker-compose. Need check/handle health via the application logic.
function connectToDatabase() {

    connection.connect();

    // This should get the URL inserted from broadcast-server.js
    connection.query('SELECT * FROM broadcaster WHERE id=1 LIMIT 1', function (error, results, fields) {

        if (error) {
            throw error;
        }

        result = results[0].url;

        console.log('The status is: ', results[0].url);

    });


    connection.end();


// Get the response status of the Broadcaster URL
    // TODO: I don't know how to make a request from the server container to the database container. Need to find that.
    request("http://broadcast-server:9001/broadcast-server-status", function (error, response, html) {

        if(!error && response.statusCode == 200) {
            broadcastResponseStatusCode = response.statusCode;
        } else {

            throw error;
        }

    });

}

// TODO: I need to understand this setTimeout / async feature of node. It's causing a lot of problems.
setTimeout(connectToDatabase, 20000);

// if(!result) {
//     result = "No result.";
// }
//
// // Get the response status of the Broadcaster URL
// let broadcastResponseStatusCode;
//
// request(result, function (error, response, html) {
//
//     if(!error && response.statusCode == 200) {
//         broadcastResponseStatusCode = response.statusCode();
//     } else {
//         throw error;
//     }
//
// });

// For debugging only. DELETE THIS:
if (broadcastResponseStatusCode === null) {
    broadcastResponseStatusCode = 400;
}

// App
const app = express();

app.get('/server-status', (req, res) => {

    res.send(`<div id=go-status>The broadcast response status code is: ${broadcastResponseStatusCode}</div>`);

});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);