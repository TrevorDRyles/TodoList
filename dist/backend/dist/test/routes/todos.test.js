const request = require('supertest');
require("../../bin/start");
const TodoService = require("../../services/TodoService");
const app = require('../../index');
const jwt = require("jsonwebtoken");
const UserService = require("../../services/UserService");
require('dotenv').config();

// DONT USE THESE HERE! these are for service classes ONLY
// global.models = models;
// global.User = models.user;
// global.TodoList = models.todolist;
// const todo = await User.findByPk(999, {include: 'todolist'});
// const todolist = todo.todolist;
// const todo1 = await Todo.findByPk(999, {include: 'todos'});
let tokenn = null;
let userServiceObj = new UserService();
describe('test the todos API', () => {
  beforeEach(async () => {
    const createdUser = await userServiceObj.create('newUserNamee', 'password');
    tokenn = await new Promise((resolve) => {
      jwt.sign(
        {
          id: createdUser.userid,
          username: createdUser.username
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '2d'
        },
        (err, token) => {
          // jwt could not be created
          if (err) {
            resolve(null);
          }
          resolve(token);
        }
      );
    });
    jwt.verify(tokenn, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error('JWT verification error:', err);
      } else {
        console.log('JWT decoded:', decoded);
      }
    });
  });
  describe('Get', () => {
    test('GET /todos should get all todos from the todo list and return 200', async () => {
      const res = await request(app).get('/todos').set('authorization', `Bearer ${tokenn}`).send();
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThanOrEqual(0);
    });

    test('GET /todos with an error should return error code 500', async () => {
      jest.spyOn(TodoService.prototype, 'getTodosForUser')
        .mockRejectedValueOnce(() => {
          throw new Error("Server error");
        });
      const res = await request(app).get('/todos').set('authorization', `Bearer ${tokenn}`).send();
      expect(res.statusCode).toEqual(500);
      expect(res.body.error).toEqual("Server error");
    })

  })

  describe('Get All', () => {

    test('GET /todo/:id should get a todo from the todo list and return 200', async () => {
      // create todo_item first
      const res1 = await request(app).post('/todos').set('authorization', `Bearer ${tokenn}`).send();
      let desc = res1.body.description;
      let id = res1.body.todoid;

      const res = await request(app).get(`/todo/${id}`).set('authorization', `Bearer ${tokenn}`).send();
      expect(res.statusCode).toEqual(200);
      expect(res.body.description).toEqual(desc);

      // delete todo_ item
      await request(app).delete(`/todo/${id}`).set('authorization', `Bearer ${tokenn}`).send();
    });

    test('GET /todo/:id with id not found should return 404 not found', async () => {
      const res = await request(app).get(`/todo/649107`).set('authorization', `Bearer ${tokenn}`).send();
      expect(res.statusCode).toEqual(404);
      expect(res.body.error).toEqual("Not Found");
    });

    test('GET /todo/:id with an error in transaction should return 500 server error', async () => {
      jest.spyOn(TodoService.prototype, 'get')
        .mockRejectedValueOnce(() => {
          throw new Error("Server error")
        });
      const res = await request(app).get(`/todo/649107`).set('authorization', `Bearer ${tokenn}`).send();
      expect(res.statusCode).toEqual(500);
      expect(res.body.error).toEqual("Server error");
    });
  });

  describe('Create', () => {

    test('POST /todos should add a new todo list and return 201 created', async () => {
      // get todo_ item
      const res = await request(app).post(`/todos`).set('authorization', `Bearer ${tokenn}`).send({description: 'desc'});
      expect(res.statusCode).toEqual(201);
      expect(res.body.description).toEqual("desc");

      // delete todo_ item
      await request(app).delete(`/todo/${res.body.todoid}`).set('authorization', `Bearer ${tokenn}`).send();
    });

    test('POST /todos with an error in create should return error code 500 server error', async () => {
      let desc = 'Server error';
      jest.spyOn(TodoService.prototype, 'create')
        .mockRejectedValueOnce(() => {
          throw new Error(desc)
        });
      const res = await request(app).post('/todos').set('authorization', `Bearer ${tokenn}`).send({description: 'desc'});
      expect(res.statusCode).toEqual(500);
      expect(res.body.error).toEqual("Server error -- couldn't create transaction");
    });

    test('POST /todos with an error in inTransaction should return error code 500 server error', async () => {
      let desc = 'Server error';
      jest.spyOn(TodoService.prototype, 'inTransaction')
        .mockRejectedValueOnce(() => {
          throw new Error(desc)
        });
      const res = await request(app).post('/todos').set('authorization', `Bearer ${tokenn}`).send({description: 'desc'});
      expect(res.statusCode).toEqual(500);
      expect(res.body.error).toEqual(desc);
    });
  });

  describe('Destroy', () => {


    test('DELETE /todo/:id should return a 204 no content', async () => {
      // create todo_item first
      const res1 = await request(app).post('/todos').set('authorization', `Bearer ${tokenn}`).send({description: "temp"});
      let id = res1.body.todoid;

      // delete todo_ item
      const res2 = await request(app).delete(`/todo/${id}`).set('authorization', `Bearer ${tokenn}`).send();
      expect(res2.statusCode).toEqual(204);
      expect(res2.body).toEqual({});
    });

    test('DELETE /todo/:id with invalid ID should return 404 not found', async () => {
      // delete todo_ item
      const res2 = await request(app).delete(`/todo/0982`).set('authorization', `Bearer ${tokenn}`).send();
      expect(res2.statusCode).toEqual(404);
      expect(res2.body.error).toEqual('Could not delete resource -- not found');
    });

    test('DELETE /todo/:id with server error should return 500 server error', async () => {
      jest.spyOn(TodoService.prototype, 'inTransaction')
        .mockRejectedValueOnce(() => {
          throw new Error("Server error");
        });

      const res = await request(app).delete(`/todo/5987`).set('authorization', `Bearer ${tokenn}`).send();
      expect(res.statusCode).toEqual(500);
      expect(res.body.error).toEqual('Server error');
    });

    test('DELETE /todo/:id with transaction error should return 500 server error', async () => {
      jest.spyOn(TodoService.prototype, 'delete')
        .mockRejectedValueOnce(() => {
          throw new Error("Error in transaction");
        });

      const res = await request(app).delete(`/todo/5987`).set('authorization', `Bearer ${tokenn}`).send();
      expect(res.statusCode).toEqual(500);
      expect(res.body.error).toEqual('Error in transaction');
    });

  });

  describe('Update', () => {

    // update
    test('PUT /todo/:id should update a todo list and return 200 ok', async () => {
      // create todo_item first
      const res1 = await request(app).post('/todos').set('authorization', `Bearer ${tokenn}`).send({description: "temp"});
      let id = res1.body.todoid;

      // get todo_ item
      const res = await request(app).put(`/todo/${id}`).set('authorization', `Bearer ${tokenn}`).send({description: "something new"});
      expect(res.statusCode).toEqual(200);
      expect(res.body.description).toEqual("something new");

      // delete todo_ item
      await request(app).delete(`/todo/${id}`).set('authorization', `Bearer ${tokenn}`).send();
    });

    test('PUT /todo/:id with id not found should return 404 not found', async () => {
      // get todo_ item
      const res = await request(app).put(`/todo/237948`).set('authorization', `Bearer ${tokenn}`).send({description: "something new"});
      expect(res.statusCode).toEqual(404);
      expect(res.body.error).toEqual("Not Found");
    });

    test('PUT /todo/:id with id transaction not complete should return 500 server error', async () => {
      jest.spyOn(TodoService.prototype, 'update')
        .mockRejectedValueOnce(() => {
          throw new Error("Server error -- transaction not completed");
        });

      const res = await request(app).put(`/todo/5987`).set('authorization', `Bearer ${tokenn}`).send();
      expect(res.statusCode).toEqual(500);
      expect(res.body.error).toEqual('Server error -- transaction not completed');
    });

    test('PUT /todo/:id with id transaction not complete should return 500 server error', async () => {
      jest.spyOn(TodoService.prototype, 'inTransaction')
        .mockRejectedValueOnce(() => {
          throw new Error("Server error -- transaction not completed");
        });

      const res = await request(app).put(`/todo/5987`).set('authorization', `Bearer ${tokenn}`).send();
      expect(res.statusCode).toEqual(500);
      expect(res.body.error).toEqual('Server error');
    });

    test('GET /todo/:id without authorization headers should return error', async () => {
      // get todo_ item
      const res = await request(app).put(`/todo/237948`).send({description: "something new"});
      expect(res.statusCode).toEqual(401);
      expect(res.body.error).toEqual('No authorization header sent');
    });

    test('GET /todo/:id with invalid authorization token should return error', async () => {
      // get todo_ item
      const res = await request(app).put(`/todo/237948`).set('authorization', `Bearer abc`).send({description: "something new"});
      expect(res.statusCode).toEqual(401);
      expect(res.body.error).toEqual('Unable to verify token');
    });
  });

});
