let resolvers = require('../data/resolvers');
const TodoService = require('../services/TodoService');
require("../bin/start");
const {postgres} = require("../config");
const todoService = new TodoService(postgres.client);
resolvers = resolvers(todoService);
let mockTransaction;
let mockWork;
beforeEach(() => {
  // Mock TodoService instance
  // mockTodoService = new TodoService();
  // // Replace inTransaction method with a jest.fn()
  // mockTodoService.inTransaction = jest.fn();
});
describe('Resolvers', () => {
  it('getTodos resolver should return todos', async () => {
    // Mock TodoService.getTodosForUser to return some todos
    const mockTodos = [{ id: 1, description: 'Todo 1' }, { id: 2, description: 'Todo 2' }];
    // mockGetTodosForUser.mockResolvedValueOnce(mockTodos);
    jest.spyOn(TodoService.prototype, 'getTodosForUser')
      .mockResolvedValueOnce(mockTodos);
    // Mock the arguments (parent, args, context)
    const args = { req: { user: { id: 123 } } };
    const result = await resolvers.getTodos(null, args, {});
    expect(result).toEqual(mockTodos);
  });

  it('getTodos resolver should return todos', async () => {
    // Mock TodoService.getTodosForUser to return some todos
    const mockTodos = [{ id: 1, description: 'Todo 1' }, { id: 2, description: 'Todo 2' }];
    // mockGetTodosForUser.mockResolvedValueOnce(mockTodos);
    jest.spyOn(TodoService.prototype, 'getTodosForUser')
      .mockRejectedValue(mockTodos);
    // Mock the arguments (parent, args, context)
    const args = { req: { user: { id: 123 } } };
    await expect(resolvers.getTodos(null, args, {})).rejects.toThrow("Failed to fetch todos");
  });

  it('getTodos resolver should return todos', async () => {
    // Mock TodoService.getTodosForUser to return some todos
    const mockTodos = [{ id: 1, description: 'Todo 1' }, { id: 2, description: 'Todo 2' }];
    // mockGetTodosForUser.mockResolvedValueOnce(mockTodos);
    jest.spyOn(TodoService.prototype, 'create')
      .mockResolvedValueOnce(mockTodos);
    jest.spyOn(TodoService.prototype, 'inTransaction')
      .mockResolvedValueOnce(mockTodos);
    // Mock the arguments (parent, args, context)
    const args = { req: { user: { id: 123 } } };
    const result = await resolvers.createTodo({input: {username: 'test', description: 'test'}}, null, null);
    expect(result).toEqual(undefined);
  });

  it('getTodos resolver should return todos', async () => {
    // Mock TodoService.getTodosForUser to return some todos
    const mockTodos = [{ id: 1, description: 'Todo 1' }, { id: 2, description: 'Todo 2' }];
    // mockGetTodosForUser.mockResolvedValueOnce(mockTodos);
    jest.spyOn(TodoService.prototype, 'create')
      .mockResolvedValueOnce(mockTodos);
    // Mock the arguments (parent, args, context)
    const args = { req: { user: { id: 123 } } };

    const result = await resolvers.createTodo({input: {username: 'test', description: 'test'}}, null, null);
    expect(result).toEqual(mockTodos);
  });

  it('getTodos resolver should return todos', async () => {
    // Mock TodoService.getTodosForUser to return some todos
    const mockTodos = [{ id: 1, description: 'Todo 1' }, { id: 2, description: 'Todo 2' }];
    // mockGetTodosForUser.mockResolvedValueOnce(mockTodos);
    jest.spyOn(TodoService.prototype, 'get')
      .mockResolvedValueOnce(mockTodos);
    // Mock the arguments (parent, args, context)
    const args = { req: { user: { id: 123 } } };
    const result = await resolvers.getTodo({id: 1}, args, {});
    expect(result).toEqual(mockTodos);
  });

  it('getTodos resolver should return todos', async () => {
    // Mock TodoService.getTodosForUser to return some todos
    const mockTodos = [{ id: 1, description: 'Todo 1' }, { id: 2, description: 'Todo 2' }];
    // mockGetTodosForUser.mockResolvedValueOnce(mockTodos);
    jest.spyOn(TodoService.prototype, 'get')
      .mockRejectedValue(mockTodos);
    // Mock the arguments (parent, args, context)
    const args = { req: { user: { id: 123 } } };
    await expect(resolvers.getTodo({id: 1}, args, {})).rejects.toThrow("Failed to fetch todo");
  });


  it('getTodos resolver should return todos', async () => {
    // Mock TodoService.getTodosForUser to return some todos
    const mockTodos = [{ id: 1, description: 'Todo 1' }, { id: 2, description: 'Todo 2' }];
    // mockGetTodosForUser.mockResolvedValueOnce(mockTodos);
    jest.spyOn(TodoService.prototype, 'create')
      .mockResolvedValueOnce(mockTodos);
    // jest.spyOn(TodoService.prototype, 'inTransaction')
    //   .mockResolvedValueOnce(mockTodos);
    // Mock the arguments (parent, args, context)
    const args = { req: { user: { id: 123 } } };
    const result = await resolvers.updateTodo({input: {username: 'test', description: 'test'}}, null, null);
    expect(result).toEqual(undefined);
  });

  it('getTodos resolver should return todos', async () => {
    // Mock TodoService.getTodosForUser to return some todos
    const mockTodos = [{ id: 1, description: 'Todo 1' }, { id: 2, description: 'Todo 2' }];
    // mockGetTodosForUser.mockResolvedValueOnce(mockTodos);
    // jest.spyOn(TodoService.prototype, 'create')
    //   .mockResolvedValueOnce(mockTodos);
    // jest.spyOn(TodoService.prototype, 'inTransaction')
    //   .mockResolvedValueOnce(mockTodos);
    // Mock the arguments (parent, args, context)
    const args = { req: { user: { id: 123 } } };
    const result = await resolvers.deleteTodo({input: {username: 'test', description: 'test'}}, null, null);
    expect(result).toEqual(undefined);
  });

});
