const Sequelize = require("sequelize");
const config = require('../config');
function connectToMyPostgres() {
    const sequelize = new Sequelize(config.postgres.options);
    sequelize
        .authenticate()
        .then(() => {
            console.info("Successfully connected to Postgres");
        })
        .catch((error) => {
            console.error(error);
            process.exit(1);
        });
    return sequelize;
}

const postgres = connectToMyPostgres();

// postgres client is the instance of Sequelize that is connected to Postgres
config.postgres.client = postgres;