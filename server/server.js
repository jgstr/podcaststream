'use strict';
const express = require('express');
const request = require('request');
import {createDataStore} from "./data-store";

const PORT = 9000;
const HOST = '0.0.0.0';

const mysql = require('mysql');
const pool = mysql.createPool({
    host: process.env.DATABASE_HOST || 'broadcaststream_db_1',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'broadcast'
});

function getBroadcastServerStatus(broadcastUrl) {
    return new Promise((resolve, reject) => {
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

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/get-all', (req, res) => {
    const dataStore = createDataStore(pool);

    dataStore.getBroadcastURL()
        .then((broadcastUrl) => {
            return getBroadcastServerStatus(broadcastUrl);
        })
        .then((status) => {
            res.send({
                status,
                streams: [{
                    name: 'name1'
                }, {
                    name: 'name2'
                }],
                playerStream: {
                    name: 'Name 1',
                    length: '2200'
                }
            });
        })
        .catch((error) => {
            res.status(500);
            res.send(`Something went wrong with the server: ${error}`);
        });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
