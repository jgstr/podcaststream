const mysql = require('mysql');

export const createPool = () => {
    return mysql.createPool({
        host: process.env.DATABASE_HOST || 'broadcaststream_db_1',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'broadcast'
    });
};