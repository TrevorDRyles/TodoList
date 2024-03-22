module.exports = (sequelize, DataTypes) => {
  const TodoList = sequelize.define("todolist", {
    todolistid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // todolist has the foreign key because it belongs to use
    userid: DataTypes.INTEGER,
    username: DataTypes.STRING
  });
  TodoList.associate = (models) => {
    TodoList.hasMany(models.todo, {foreignKey: "todolistid"});
    TodoList.belongsTo(models.user, {foreignKey: 'userid'});
  };
  return TodoList;
}
