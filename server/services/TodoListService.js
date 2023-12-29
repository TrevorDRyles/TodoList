const Config = require("../config");
// the service provides actions for the TodoList like CRUD
class TodoListService {
    constructor(sequelize) {
        // define client so the service can connect to the database
        this.client = sequelize;
        // access list of models from this service
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

    async create(inputDescription, t) {
        // model is singular because it is represents the attributes and actions for a single object
        const createdTodoList = await this.models.todo.create({
                description: inputDescription
            },
            {transaction: t});
        return createdTodoList;
    }

    async get(id) {
        const obtainedTodoList = await this.models.todo.findByPk(id);
        return obtainedTodoList;
    }

    async getAll() {
        const obtainedTodoLists = await this.models.todo.findAll();
        return obtainedTodoLists;
    }

    async update(todoId, inputDescription, t) {
        const updatedTodoList = await this.models.todo.update(
            {description: inputDescription},
            {
                where: {
                    todoid: todoId,
                },
                returning: true,
                transaction: t
            });
        return updatedTodoList;
    }

    async delete(todoId, t) {
        const createdTodoList = await this.models.todo.destroy({
                where: {
                    todoid: todoId,
                },
                transaction: t
            }
        );
        return createdTodoList;
    }

}

module.exports = TodoListService;