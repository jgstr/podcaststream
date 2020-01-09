import mysql from 'mysql';

export const createDataStore = (pool) => {
    return {
        getBroadcastURL: () => {
            let query = mysql.format('SELECT * FROM settings WHERE broadcast_key=?', ['broadcastURL']);

            return new Promise((resolve, reject) => {
                pool.getConnection((error, connection) => {
                    if (error) {
                        reject(error);
                    } else {
                        connection.query(query, function (error, results, fields) {
                            connection.release();
                            if (error) {
                                reject(error);
                            } else {
                                const broadcastServerUrl = results[0].value;
                                resolve(broadcastServerUrl);
                            }
                        });
                    }
                });
            });
        },
        saveBroadcastURL: (broadcastURL) => {
            let query = mysql.format('INSERT INTO settings VALUES(?,?)', ['broadcastURL', broadcastURL]);

            return new Promise((resolve, reject) => {
                pool.getConnection((error, connection) => {
                    if (error) {
                        reject(error);
                    } else {
                        connection.query(query, function (error) {
                            connection.release();
                            if (error) reject(error);
                        });
                        resolve();
                    }
                });
            });
        },
        saveStream: (stream) => {
            return new Promise((resolve, reject) => {
                pool.getConnection((error, connection) => {
                    if (error) {
                        reject(error);
                    } else {
                        // TODO: This saves. Now get the dynamic data to save instead.
                        connection.query('INSERT INTO streams (id, value) VALUES(1, "test")', `{value: ${stream}}`, function (error) {
                            connection.release();
                            console.log("*** SaveStream Attempt ***");
                            if (error) reject(error);
                        });
                        resolve();
                    }
                });
            });
        },
        getAllStreams: () => {
            let query = mysql.format("SELECT * FROM 'streams'");

            return new Promise((resolve, reject) => {
                pool.getConnection((error, connection) => {
                    if (error) {
                        reject(error);
                    } else {
                        connection.query(query, function (error, results, fields) {
                            console.log("*** GetAllStreams Attempt ***");
                            connection.release();
                            if (error) {
                                reject(error);
                            } else {
                                const allStreams = results;
                                resolve(allStreams);
                            }
                        });
                    }
                });
            });
        }
    };
};