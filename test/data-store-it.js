// Integration Test:
const path = require('path');
const compose = require('docker-compose/index');
const mysql = require('mysql');
import {expect} from 'chai';

describe("Data Store", function () {

    // 1. Get MYSQL server running. Can use Docker image (directly).
    before(function () {

        console.log("From Data-store-it: " + path.join(__dirname, "..", "/app/test-database/"));

        compose.upAll({cwd: path.join(__dirname, "..", "/app/test-database/"),log: true})
            .then(
                () => { return console.log("Docker-compose ran."); },
                err => { console.log("Problems with Docker-compose: ", err.message) }
            );
    });

    // 2. Make sure that the server is actually running. (accepting connections).
    //    Try connecting to it every so often until connected.

    // This might need to be wrapped in something like fetchPage() in the e2e test.
    const pool = mysql.createPool({
        host: process.env.DATABASE_HOST || 'broadcaststream_db_1',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'broadcast'
    });

    // 3. Create data-store with some configuration that tells data-store where
    //    MySQL is (ie, the host/port/username/pass etc.)

    // 4. Use the data-store function and getting correct results.

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
                () => { console.log("Docker down ran successfully"); },
                err => { console.log("Docker down error: ", err.message); }
            )
    });


});
