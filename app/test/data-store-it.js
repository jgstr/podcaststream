const path = require('path');
const compose = require('docker-compose/index');
const mysql = require('mysql');
const chai = require('chai');
const expect = chai.expect;

describe("Data Store", function () {

    before(function () {

        compose.upAll({cwd: path.join(__dirname, "..", "/test-database/"), log: true})
            .then( () => {

                    const pool = mysql.createPool({
                        host: process.env.DATABASE_HOST || 'broadcaststream_db_1',
                        port: 3306,
                        user: 'root',
                        password: 'root',
                        database: 'broadcast'
                    });

                    console.log("*** Pool created. ***");


                    return console.log("Docker-compose ran.");
                },

                err => {
                    return console.log("Problems with Docker-compose: ", err.message)
                }

            );
    });

    // TODO - Challenge: get the adapter result from above Promise into the it() test below.
    // Note:
    // - No functions in data-store exist yet.
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
