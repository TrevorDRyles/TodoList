const Sequelize = require("sequelize");
const config = require('../config');
function connectToMyPostgres(sequelize = new Sequelize(config.postgres.options)) {
    sequelize
        .authenticate()
        .then(() => {
            // console.info("Successfully connected to Postgres");
        })
        .catch((error) => {
            console.error(error);
            process.exit(1);
        });
    return sequelize;
}

const postgres = connectToMyPostgres();

// load once at the beginning:

// postgres client is the instance of Sequelize that is connected to Postgres
config.postgres.client = postgres;

// sequelize models
const models = require('../models/sequelize');
config.postgres.models = models;

module.exports = { sequelize: postgres, models: models };