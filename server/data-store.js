export const createDataStore = (pool) => {
    return {
        getBroadcastURL: (broadcastQuery) => {
            return new Promise((resolve, reject) => {
                pool.getConnection((error, connection) => {
                    if (error) {
                        reject(error);
                    } else {
                        connection.query(broadcastQuery, function (error, results, fields) {
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
            // Might wrap all in promise if getConnection returns no promise, Resolve with nothing
            pool.getConnection((error, connection) => {
                if (error) {
                    console.log("Error when saving broadcast URL: ", error);
                } else {
                    let broadcastUrlEntry = {id: 2, url: broadcastURL};
                    connection.query('INSERT INTO broadcaster SET ?', broadcastUrlEntry, function(error, results, fields){
                        if(error) throw error;
                    });
                }
            });
        }
    };
};