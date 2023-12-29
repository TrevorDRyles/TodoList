module.exports = (sequelize, DataTypes) => {

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
        User.hasOne(models.todolist, {foreignKey: "userid"});
    }
    return User;
}
