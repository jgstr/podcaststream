// A mock dependency. Emulates the broadcaster service to be created/used.

'use strict';

// Connect to MySQL Database
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host: process.env.DATABASE_HOST || '127.0.0.1',
    port     : 3306,
    user     : 'root',
    password : 'root',
    database : 'broadcast'
});


// TODO: MySQL takes too long to load from docker-compose. Need check/handle health via the application logic.
// For now, this should run before the node.js server runs/checks the database for the broadcast URL.

function connectToDatabase() {

    connection.connect();

    // Insert broadcast URL into database.
    connection.query('', function (error, results, fields) {

        if (error) {
            throw error;
        }

        console.log('The status of the inserted data is: ', results[0].status);

    });


    connection.end();

}

setTimeout(connectToDatabase, 1200);

