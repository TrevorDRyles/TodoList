const Config = require("../config");

// the service provides actions for the Todo like CRUD
class TodoService {
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

    async create(username, inputDescription, t) {
        // model is singular because it is represents the attributes and actions for a single object
        // service class uses models to perform CRUD
        const createdTodo = await this.models.todo.create({
                description: inputDescription,
                username: username
            },
            {transaction: t});
        return createdTodo;
    }

    async get(id) {
        const obtainedTodo = await this.models.todo.findByPk(id);
        return obtainedTodo;
    }

    async getAll() {
        const obtainedTodos = await this.models.todo.findAll();
        return obtainedTodos;
    }

    async getTodoListById(id) {
        const obtainedTodoList = await this.models.todolist.findOne({
            where: {
                userid: id
            }
        });
        return obtainedTodoList;
    }

    async update(todoId, inputDescription, t) {
        const updatedTodo = await this.models.todo.update(
            {description: inputDescription},
            {
                where: {
                    todoid: todoId,
                },
                returning: true,
                transaction: t
            });
        return updatedTodo;
    }

    async delete(todoId, t) {
        const createdTodo = await this.models.todo.destroy({
                where: {
                    todoid: todoId,
                },
                transaction: t
            }
        );
        return createdTodo;
    }

}

module.exports = TodoService;