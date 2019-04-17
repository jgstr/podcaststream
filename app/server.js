'use strict';
const express = require('express');
const request = require('request');

// Constants
const PORT = 9000;
const HOST = '0.0.0.0';

// Connect to MySQL Database
const mysql = require('mysql');
const pool = mysql.createPool({
    host: process.env.DATABASE_HOST || 'broadcaststream_db_1',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'broadcast'
});

function getBroadcasterUrl(getStatus, handleError) {

    const connection = pool.getConnection((error, connection) => {

        if (error) {
            handleError(error);

        } else {

            // Get from the database the first mock broadcast URL
            connection.query('SELECT * FROM broadcaster WHERE id=1 LIMIT 1', function (error, results, fields) {

                connection.release();

                if (error) {
                    handleError(error);

                } else {

                    const broadcastServerUrl = results[0].url;

                    console.log('The broadcast URL is: ', broadcastServerUrl);

                    getStatus(broadcastServerUrl);


                }

            });
        }

    });


}

function getBroadcastServerStatus(sendResponse) {

    return function (broadCastServerUrl) {

        request(broadCastServerUrl, function (error, response, html) {

            if (!error && response.statusCode === 200) {
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
    }), (error) => {
        res.status(500);
        res.send(`Something went wrong with server: ${error}`);
    });


});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

