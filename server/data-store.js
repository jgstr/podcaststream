import mysql from 'mysql';

export const createDataStore = (pool) => {
    return {
        getBroadcastURL: (broadcastQuery) => {
            let query = mysql.format("SELECT * FROM broadcaster WHERE url=?", [broadcastQuery]);
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
                                const broadcastServerUrl = results[0].url;
                                resolve(broadcastServerUrl);
                            }
                        });
                    }
                });
            });
        },
        saveBroadcastURL: (broadcastURL) => {
            return new Promise((resolve, reject) => {
                pool.getConnection((error, connection) => {
                    if (error) {
                        reject(error);
                    } else {
                        let broadcastUrlEntry = {id: 2, url: broadcastURL};
                        connection.query('INSERT INTO broadcaster SET ?', broadcastUrlEntry, function (error) {
                            if (error) throw error;
                        });
                        resolve();
                    }
                });

            });
        }
    };
};