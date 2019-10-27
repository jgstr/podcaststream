import path from 'path';
import compose from 'docker-compose/index';
import mysql from 'mysql';
import {expect} from 'chai';
import {createDataStore} from '../data-store';

describe("Data Store", function () {
    this.timeout(60000);

    let pool = null;

    before(function () {

        function testDatabase(resolve) {
            console.log(" *** Test Database Running *** ");
            pool.query("SELECT 1", (error, results, fields) => {
                if (error) {
                    console.log(" *** Scheduling Retry *** Error: ", error);
                    setTimeout(() => {
                        testDatabase(resolve);
                    }, 500);
                } else {
                    console.log(" *** Database Running *** ");
                    resolve();
                }
            });
        }

        return compose.upAll({cwd: path.join(__dirname, "..", "/test-database/"), log: true})
            .then( () => {
                pool = mysql.createPool({
                    host: 'localhost',
                    port: 9000,
                    user: 'root',
                    password: 'root',
                    database: 'broadcast'
                });
            })
            .then( () => new Promise((resolve, reject) => {
                testDatabase(resolve);
            }));
    });

    it("should return a broadcast URL from the database", function () {
        const dataStore = createDataStore(pool);
        return dataStore.getBroadcastURL().then( (broadcastUrl) => {
            return expect(broadcastUrl).to.equal('http://broadcast-server:9001/broadcast-server-status');
        });
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
