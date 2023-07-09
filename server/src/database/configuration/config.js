require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'dekernes_airlines',
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0
});

module.exports=pool;