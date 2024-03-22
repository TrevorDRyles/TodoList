require("../../bin/start");
const UserService = require('../../services/UserService');
const request = require("supertest");
const app = require("../../index");
const {postgres} = require("../../config");
const TodoService = require("../../services/TodoService");
const userService = new UserService(postgres.client);
test('GET /todo/:id with id not found should return 404 not found', async () => {
  const user = await userService.getByUsername("Triple");
  expect(user).not.toBeNull();
});

test('GET /todo/:id with id not found should return 404 not found', async () => {
  let resultOfCreate = null;
  await userService.inTransaction(async (t) => {
    resultOfCreate = await userService.create('abc', 'abc', t);
  });
  expect(resultOfCreate).not.toBeNull();
});

test('POST /todos with an error in inTransaction should return error code 500 server error', async () => {
  let resultOfCreate = null; // todos
  let desc = 'Server error';
  await userService.inTransaction(async (t) => {
    throw new Error(desc)
  });
  expect(resultOfCreate).toBeNull();
});
