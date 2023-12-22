module.exports = {
    postgres: {
        options: {
            user: 'postgres',
            username: 'postgres',
            host: 'localhost',
            dialect: 'postgres',
            database: 'perntodo',
            password: 'password',
            port: 5432, // Default PostgreSQL port
            idleTimeoutMillis: 30000, // Time a connection can be idle before being closed
        },
        client: null
    }
}