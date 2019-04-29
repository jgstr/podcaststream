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


const getBroadcasterUrl = () => {

    return new Promise( (resolve, reject) => {

    const connection = pool.getConnection((error, connection) => {

        if (error) {
            reject(error);

        } else {

            connection.query('SELECT * FROM broadcaster WHERE id=1 LIMIT 1', function (error, results, fields) {

                connection.release();

                if (error) {
                    reject(error);

                } else {

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

    return new Promise ((resolve, reject) => {

        request(broadcastUrl, function (error, response, html) {

            if (!error && response.statusCode === 200) {
                resolve(JSON.parse(html).status);
            } else {
                reject(error);
            }

        });

    });

}


const app = express();

app.use(express.static('web-app/build'));

app.get('/server-status', (req, res) => {

    getBroadcasterUrl()
        .then( (broadcastUrl) => {
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
