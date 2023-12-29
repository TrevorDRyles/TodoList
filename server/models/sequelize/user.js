const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("user", {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: DataTypes.STRING,
        password: DataTypes.STRING
    });
    sequelize.sync();
}