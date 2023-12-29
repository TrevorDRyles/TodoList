const {DataTypes} = require("sequelize");
const {postgres} = require("../../config");

const sequelize = postgres.client;
const User = sequelize.define("user", {
    userid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    username: DataTypes.STRING,
    password: DataTypes.STRING
});
User.associate = (models) => {
    User.hasOne(models.TodoList, {foreignKey: "userid"});
}
module.exports = User;

