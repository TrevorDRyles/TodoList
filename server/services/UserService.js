const Config = require("../config");

class UserService {
    constructor(sequelize) {
        // define client so the service can connect to the database
        this.client = sequelize;
        // access list of models from this service
        // TODO select only relevant ones
        this.models = Config.postgres.models;
    }

    async inTransaction(work) {
        // create a transaction to work in
        const t = await this.client.transaction();
        try {
            // perform work
            await work(t);
            // commit work
            return t.commit();
        } catch (error) {
            // rollback work
            await t.rollback();
        }
    }

    async create(username, password, passwordConfirm, t) {
        // model is singular because it is represents the attributes and actions for a single object
        // service class uses models to perform CRUD
        const createdUser = await this.models.user.create(
            {
                username: username,
                password: password
            },
            {transaction: t});

        const createdTodoList = await this.models.todolist.create(
            {
                userid: createdUser.userid,
                username: username
            }
        )
        return createdUser;
    }

    async getByUsername(username) {
        const obtainedUser = await this.models.user.findOne({
            where: {
                username: username
            }
        });
        return obtainedUser;
    }


}

module.exports = UserService;