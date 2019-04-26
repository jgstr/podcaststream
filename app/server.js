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


/* To be refactored to Promises */

const getBroadcasterUrl = () => {

    // Will either resolve the promise with Url
    // or reject with err.

    return new Promise( (resolve, reject) => {

    const connection = pool.getConnection((error, connection) => {

        // Error? Promise Obj is returned with `error` as the accessible value for .catch().
        if (error) {
            reject(error);

        } else {

            // Get from the database the first mock broadcast URL
            connection.query('SELECT * FROM broadcaster WHERE id=1 LIMIT 1', function (error, results, fields) {

                connection.release();

                // Error? Same return as above.
                if (error) {
                    reject(error);

                } else {

                    // No error? Promise Obj is returned with broadcastServerUrl as the value for .then().
                    const broadcastServerUrl = results[0].url;

                    console.log('The broadcast URL is: ', broadcastServerUrl);

                    resolve(broadcastServerUrl);


                }

            });
        }

    });

});

};


function getBroadcastServerStatus(broadcastUrl) {
    // No longer gets sendResponse
    // No longer needs inner function
    // Simple function that gets a Url and returns a Promise

    return new Promise ((resolve, reject) => {

        request(broadcastUrl, function (error, response, html) {

            if (!error && response.statusCode === 200) {
                resolve(JSON.parse(html).status);  // resolve (pass this value) "status"
            } else {
                reject(error);                     // reject with err
            }

        });

    });

}


const app = express();

app.get('/server-status', (req, res) => {


    console.log("GET happened...");

    // chain .then here.
    // don't forget .catch with status 500

    getBroadcasterUrl()
        .then( (broadcastUrl) => {
            // This returns a new Promise object AND the status value
            return getBroadcastServerStatus(broadcastUrl);
        })
        .then( (status) => {
            res.send(`<div id=go-status>The broadcast response status code is: ${status}</div>`);
        })
        .catch( (error) => {
            res.status(500);
            res.send(`Something went wrong with the server: ${error}`);
        });

});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
