// Integration Test:
const path = require('path');
const compose = require('docker-compose/index');
const mysql = require('mysql');
import {expect} from 'chai';

describe("Data Store", function () {

    before(function () {

        // Debugging
        console.log("From Data-store-it: " + path.join(__dirname, "..", "/app/test-database/"));

        compose.upAll({cwd: path.join(__dirname, "..", "/app/test-database/"), log: true})
            .then(
                () => {

                    // Wrap this in a timeout() at first, then attempt with retry().
                    const pool = mysql.createPool({
                        host: process.env.DATABASE_HOST || 'broadcaststream_db_1',
                        port: 3306,
                        user: 'root',
                        password: 'root',
                        database: 'broadcast'
                    });

                    return console.log("Docker-compose ran.");
                },
                err => {
                    console.log("Problems with Docker-compose: ", err.message)
                }
            );
    });

    // TODO - Challenge: get the adapter result from above Promise into the it() test below.
    // Note:
    // - No functions exist yet.
    // - Every READ needs to have a corresponding WRITE
    // - Write something using ADAPTER then read something using ADAPTER.

    it("should return a broadcast URL from the database", function () {
        const broadcastUrl = "";
        return expect(broadcastUrl).to.equal('http://broadcast-server:9001/broadcast-server-status');
    });

    after(function () {
        compose
            .down("rmi-all")
            .then(
                () => {
                    console.log("Docker down ran successfully");
                },
                err => {
                    console.log("Docker down error: ", err.message);
                }
            )
    });


});
