const Config = require("../config");

class TodoListService {
    constructor(sequelize) {
        // define client so the service can connect to the database
        this.client = sequelize;
        // access list of models from this service
        this.models = Config.postgres.models;
    }

}

module.exports = TodoListService;