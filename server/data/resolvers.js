const TodoService = require("../services/TodoService");
const {postgres} = require("../config");

const resolvers = (todoService) => ({
  // to-do resolvers
  getTodos: async (parent, args, context) => {
    try {
      const todos = await todoService.getTodosForUser(args.req.user.id);
      return todos;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to fetch todos');
    }
  },

  createTodo: async (parent, args, context) => {
    let result;
    await todoService.inTransaction(async (t) => {
      result = await todoService.create(parent.input.username, parent.input.description, t);
    }, parent.input.username, parent.input.description);
    return result;
  },

  getTodo: async (parent, args, context) => {
    try {
      const todo = await todoService.get(parent.id);
      return todo;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to fetch todo');
    }
  },

  updateTodo: async (parent, args, context) => {
    let result;
    await todoService.inTransaction(async (t) => {
      result = await todoService.update(parent.input.id, parent.input.description, t);
    }, parent.input.id, parent.input.description);
    return result;
  },

  deleteTodo: async (parent, args, context) => {
    let result;
    await todoService.inTransaction(async (t) => {
      result = await todoService.delete(parent.id, t);
    }, parent.id);
    return result;
  },
});

module.exports = resolvers;
