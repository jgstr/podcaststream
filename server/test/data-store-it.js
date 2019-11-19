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
            pool.query("SELECT 1", (error) => {
                if (error) {
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
            .then( () => new Promise((resolve) => {
                console.log("*** Waiting for database availability ***");
                testDatabase(resolve);
            }));
    });

    it("should return a broadcast URL from the database", function () {
        const dataStore = createDataStore(pool);
        const expectedValue = 'http://broadcast-server:9001/broadcast-server-status-2';

        dataStore.saveBroadcastURL(expectedValue)
            .then(() => dataStore.getBroadcastURL())
            .then( broadcastURL => expect(broadcastURL).to.equal(expectedValue) )
            .catch( error => console.log("Error: ", error));
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