const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("todo", {
        todo_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: DataTypes.STRING
    });
    sequelize.sync();
}

