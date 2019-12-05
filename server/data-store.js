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
                            if (error) reject(error);
                        });
                        resolve();
                    }
                });
            });
        },
        saveStream: (stream) => {
            let query = mysql.format('INSERT INTO stream VALUES(?,?)', [1, stream]);

            return new Promise((resolve, reject) => {
                pool.getConnection((error, connection) => {
                    if (error) {
                        reject(error);
                    } else {
                        connection.query(query, function (error) {
                            if (error) reject(error);
                        });
                        resolve();
                    }
                });
            });
        },
        getAllStreams: () => {
            return new Promise((resolve, reject) => {
                resolve([{ name: 'name1' }, { name: 'name2' }]);
            })
        }
    };
};