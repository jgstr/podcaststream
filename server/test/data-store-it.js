import path from 'path';
import compose from 'docker-compose/index';
import mysql from 'mysql';
import {expect} from 'chai';
import {createDataStore} from '../data-store';

describe("Data Store", function () {
    this.timeout(300000);

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
            .then(() => {
                pool = mysql.createPool({
                    host: 'localhost',
                    port: 9000,
                    user: 'root',
                    password: 'root',
                    database: 'broadcast'
                });
            })
            .then(() => new Promise((resolve) => {
                console.log("*** Waiting for database availability ***");
                testDatabase(resolve);
            }));
    });

    it("should return a broadcast URL from the database", function () {
        const dataStore = createDataStore(pool);
        const expectedValue = 'http://broadcast-server:9001/broadcast-server-status-2';

        return dataStore.saveBroadcastURL(expectedValue)
            .then(() => dataStore.getBroadcastURL())
            .then(broadcastURL => expect(broadcastURL).to.equal(expectedValue));
    });

    it("should return a list of all streams", function () {
        const dataStore = createDataStore(pool);
        const expectedValue = [{title: 'title1'}, {title: 'title2'}, {title: 'title3'}];
        return dataStore.saveStream(expectedValue[0])
            .then(() => dataStore.saveStream(expectedValue[1]))
            .then(() => dataStore.saveStream(expectedValue[2]))
            .then(() => dataStore.getAllStreams())
            .then(allStreams => {
                let allStreamsTitlesOnly = [];
                allStreams.forEach(row => allStreamsTitlesOnly.push({"title": row["title"]}));
                expect(allStreamsTitlesOnly).to.deep.equal(expectedValue);
            });
    });

    after(function (done) {
        if (pool) {
            pool.end((err) => {
                compose
                    .down("rmi-all")
                    .then(
                        () => {
                            console.log("Docker down ran successfully");
                        },
                        err => {
                            console.log("Docker down error: ", err.message);
                        }
                    ).then(() => done());
            });
        } else {
            compose
                .down("rmi-all")
                .then(
                    () => {
                        console.log("Docker down ran successfully");
                    },
                    err => {
                        console.log("Docker down error: ", err.message);
                    }
                ).then(() => done());
        }
    });
});
