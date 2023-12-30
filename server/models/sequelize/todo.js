module.exports = (sequelize, DataTypes) => {
    // define model
    const Todo = sequelize.define("todo", {
        todoid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        description: DataTypes.STRING,
        // todo has a foreign key because it is owned by todolist
        todolistid: DataTypes.INTEGER
    });
    // define association on both ends
    // this model doesn't have a foreign key because it is the owner of the todolist resource
    Todo.associate = (models) => {
        Todo.belongsTo(models.todolist, {foreignKey: 'todolistid'});
    };
    return Todo;
}
