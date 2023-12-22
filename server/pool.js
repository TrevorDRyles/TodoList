const pkg = require('pg');
const { Pool } = pkg;
const config = require('./config')

// Create a PostgreSQL connection pool
const pool = new Pool(config.postgres.options);

module.exports = pool;