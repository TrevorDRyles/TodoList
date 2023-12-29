module.exports = (sequelize, DataTypes) => {
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
        Todo.belongsTo(models.todolist, {foreignKey: 'todolistid'});
    };
    return Todo;
}
