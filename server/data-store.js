export const createDataStore = (pool) => {
    return {
        getBroadcastURL: () => {
            return new Promise((resolve, reject) => {
                pool.getConnection((error, connection) => {
                    if (error) {
                        reject(error);
                    } else {
                        connection.query('SELECT * FROM broadcaster WHERE id=2 LIMIT 1', function (error, results, fields) {
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