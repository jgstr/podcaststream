import path from 'path';
import compose from 'docker-compose/index';
import mysql from 'mysql';
import {expect} from 'chai';
import {createDataStore} from '../data-store';

describe("Data Store", function () {

    this.timeout(20000);

    let pool = null;

    before(function () {

        pool = compose.upAll({cwd: path.join(__dirname, "..", "/test-database/"), log: true})
            .then( () => {

                    const pool = mysql.createPool({
                        host: process.env.DATABASE_HOST || 'broadcaststream_db_1',
                        port: 3306,
                        user: 'root',
                        password: 'root',
                        database: 'broadcast'
                    });

                    console.log("*** Pool created. ***");


                    return pool;

                }

            );
        return pool;
    });

    // TODO - Challenge: get the adapter result from above Promise into the it() test below.
    // Note:
    // - No functions in data-store exist yet.
    // - Every READ needs to have a corresponding WRITE
    // - Write something using ADAPTER then read something using ADAPTER.

    it("should return a broadcast URL from the database", function () {

        return pool.then( (connectionPool) => {

            const dataStore = createDataStore(connectionPool);
            return dataStore.getBroadcastURL();

        }).then( (broadcastUrl) => {

            return expect(broadcastUrl).to.equal('http://broadcast-server:9001/broadcast-server-status');

        } );

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
