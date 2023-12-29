const {DataTypes} = require("sequelize");
// const TodoList = require("./todolist");
const {postgres} = require("../../config");

const sequelize = postgres.client;
const Todo = sequelize.define("todo", {
    todoid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: DataTypes.STRING,
    todolistid: DataTypes.INTEGER
});
Todo.associate = (models) => {
    Todo.belongsTo(models.TodoList, {foreignKey: 'todolistid'});
};

module.exports = Todo;
