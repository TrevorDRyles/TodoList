const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../../config/config.json'); // Your Sequelize configuration file
const { database, username, password, host, dialect, port } = config.development; // or use process.env.NODE_ENV to dynamically select the environment

const sequelize = new Sequelize(database, username, password, {
    host,
    dialect,
    port,
    operatorsAliases: false,
    logging: true
});

const models = {};

// Read all model files in the current directory
fs.readdirSync(__dirname)
    .filter((file) => file !== 'index.js' && file.endsWith('.js'))
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        models[model.name] = model;
    });

// Define associations
Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models// Load Sequelize models