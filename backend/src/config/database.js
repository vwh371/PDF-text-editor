const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'pdflow_user',
    password: process.env.DB_PASSWORD || 'Pdflow@2024Secure!',
    database: process.env.DB_NAME || 'pdflow_edit',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

const promisePool = pool.promise();

// Test database connection
const testConnection = async () => {
    try {
        const connection = await promisePool.getConnection();
        console.log('✅ MySQL database connected successfully');
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        return false;
    }
};

module.exports = { pool, promisePool, testConnection };