const pkg = require('pg');
const { Pool } = pkg;


// Create a PostgreSQL connection pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'perntodo',
    password: 'password',
    port: 5432, // Default PostgreSQL port
    idleTimeoutMillis: 30000, // Time a connection can be idle before being closed
});

module.exports = pool;