export const createDataStore = (pool) => {
    return {
        getBroadcastURL: () => {
            return new Promise((resolve, reject) => {
                pool.getConnection((error, connection) => {
                    if (error) {
                        reject(error);
                    } else {
                        connection.query('SELECT * FROM broadcaster WHERE id=1 LIMIT 1', function (error, results, fields) {
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
        }
    };
};