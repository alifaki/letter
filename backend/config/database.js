const knex = require('knex');
const config = require('./index');

const db = knex({
    client: 'pg',
    connection: config.db,
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: './migrations'
    }
});

module.exports = db;