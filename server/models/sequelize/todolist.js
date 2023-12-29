const {DataTypes} = require("sequelize");
const Todo = require("./todo");
const {postgres} = require("../../config");
const sequelize = postgres.client;

const TodoList = sequelize.define("todolist", {
    todolistid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // todoid: {
    //     type: DataTypes.INTEGER
    // },
    userid: DataTypes.INTEGER
});
TodoList.hasMany(Todo, {foreignKey: "todoid"});
TodoList.associate = (models) => {
    TodoList.belongsTo(models.User, {foreignKey: 'userid'});
};

module.exports = TodoList;

