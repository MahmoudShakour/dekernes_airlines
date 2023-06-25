require('dotenv').config();

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'dekernes_airlines',
    server: 'localhost'
};

module.exports=sqlConfig;