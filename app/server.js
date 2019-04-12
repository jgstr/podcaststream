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


function getBroadcasterUrl(getStatus) {

    connection.connect();

    // Get from the database the first mock broadcast URL
    connection.query('SELECT * FROM broadcaster WHERE id=1 LIMIT 1', function (error, results, fields) {

        if (error) {
            throw error;
        }

        const broadcastServerUrl = results[0].url;

        console.log('The broadcast URL is: ', broadcastServerUrl);
        getStatus(broadcastServerUrl);

    });

    connection.end();

}

function getBroadcastServerStatus(sendResponse) {

    return function (broadCastServerUrl) {

        request(broadCastServerUrl, function (error, response, html) {

            if(!error && response.statusCode === 200) {
                sendResponse(JSON.parse(html).status);
            } else {
                throw error;
            }

        });
    }

}



// App
const app = express();

app.get('/server-status', (req, res) => {

    console.log("GET happened...");

    getBroadcasterUrl(getBroadcastServerStatus((status) => {
        res.send(`<div id=go-status>The broadcast response status code is: ${status}</div>`);
    }));

});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

