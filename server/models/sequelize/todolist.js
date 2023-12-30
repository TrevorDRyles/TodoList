module.exports = (sequelize, DataTypes) => {
    const TodoList = sequelize.define("todolist", {
        todolistid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // todolist has the foreign key because it belongs to use
        userid: DataTypes.INTEGER
    });
    TodoList.associate = (models) => {
        TodoList.hasMany(models.todo, {foreignKey: "todoid"});
        TodoList.belongsTo(models.user, {foreignKey: 'userid'});
    };
    return TodoList;
}
