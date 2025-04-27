require('dotenv').config();

module.exports = {
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_NAME || 'letter_management',
        ssl: process.env.DB_SSL ? { rejectUnauthorized: false } : false
    },
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'development'
};