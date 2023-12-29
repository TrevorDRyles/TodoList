const request = require('supertest');
require("../bin/start");
const TodoListService = require("../services/TodoListService");
const app = require('../index');

describe('test the todo list API', () => {

    describe('Get', () => {

        test('GET /todos should get all todos from the todo list and return 200', async () => {
            const res = await request(app).get('/todos').send();
            expect(res.statusCode).toEqual(200);
            expect(res.body.length).toBeGreaterThanOrEqual(0);
        });

        test('GET /todos with an error should return error code 500', async () => {
            jest.spyOn(TodoListService.prototype, 'getAll')
                .mockRejectedValueOnce(() => {
                    throw new Error("Server error");
                });
            const res = await request(app).get('/todos').send();
            expect(res.statusCode).toEqual(500);
            expect(res.body.error).toEqual("Server error");
        })

    })

    describe('Get All', () => {

        test('GET /todo/:id should get a todo from the todo list and return 200', async () => {
            // create todo_item first
            const res1 = await request(app).post('/todos').send({description: "temp"});
            let desc = res1.body.description;
            let id = res1.body.todoid;

            const res = await request(app).get(`/todo/${id}`).send();
            expect(res.statusCode).toEqual(200);
            expect(res.body.description).toEqual(desc);

            // delete todo_ item
            await request(app).delete(`/todo/${id}`).send();
        });

        test('GET /todo/:id with id not found should return 404 not found', async () => {
            const res = await request(app).get(`/todo/649107`).send();
            expect(res.statusCode).toEqual(404);
            expect(res.body.error).toEqual("Not Found");
        });

        test('GET /todo/:id with an error in transaction should return 500 server error', async () => {
            jest.spyOn(TodoListService.prototype, 'get')
                .mockRejectedValueOnce(() => {
                    throw new Error("Server error")
                });
            const res = await request(app).get(`/todo/649107`).send();
            expect(res.statusCode).toEqual(500);
            expect(res.body.error).toEqual("Server error");
        });
    });

    describe('Create', () => {

        test('POST /todos should add a new todo list and return 201 created', async () => {
            // get todo_ item
            const res = await request(app).post(`/todos`).send({description: 'desc'});
            expect(res.statusCode).toEqual(201);
            expect(res.body.description).toEqual("desc");

            // delete todo_ item
            await request(app).delete(`/todo/${res.body.todoid}`).send();
        });

        test('POST /todos with an error in create should return error code 500 server error', async () => {
            let desc = 'Server error';
            jest.spyOn(TodoListService.prototype, 'create')
                .mockRejectedValueOnce(() => {
                    throw new Error(desc)
                });
            const res = await request(app).post('/todos').send({description: 'desc'});
            expect(res.statusCode).toEqual(500);
            expect(res.body.error).toEqual("Server error -- couldn't create transaction");
        });

        test('POST /todos with an error in inTransaction should return error code 500 server error', async () => {
            let desc = 'Server error';
            jest.spyOn(TodoListService.prototype, 'inTransaction')
                .mockRejectedValueOnce(() => {
                    throw new Error(desc)
                });
            const res = await request(app).post('/todos').send({description: 'desc'});
            expect(res.statusCode).toEqual(500);
            expect(res.body.error).toEqual(desc);
        });
    });

    describe('Destroy', () => {


        test('DELETE /todo/:id should return a 204 no content', async () => {
            // create todo_item first
            const res1 = await request(app).post('/todos').send({description: "temp"});
            let id = res1.body.todoid;

            // delete todo_ item
            const res2 = await request(app).delete(`/todo/${id}`).send();
            expect(res2.statusCode).toEqual(204);
            expect(res2.body).toEqual({});
        });

        test('DELETE /todo/:id with invalid ID should return 404 not found', async () => {
            // delete todo_ item
            const res2 = await request(app).delete(`/todo/0982`).send();
            expect(res2.statusCode).toEqual(404);
            expect(res2.body.error).toEqual('Could not delete resource -- not found');
        });

        test('DELETE /todo/:id with server error should return 500 server error', async () => {
            jest.spyOn(TodoListService.prototype, 'inTransaction')
                .mockRejectedValueOnce(() => {
                    throw new Error("Server error");
                });

            const res = await request(app).delete(`/todo/5987`).send();
            expect(res.statusCode).toEqual(500);
            expect(res.body.error).toEqual('Server error');
        });

        test('DELETE /todo/:id with transaction error should return 500 server error', async () => {
            jest.spyOn(TodoListService.prototype, 'delete')
                .mockRejectedValueOnce(() => {
                    throw new Error("Error in transaction");
                });

            const res = await request(app).delete(`/todo/5987`).send();
            expect(res.statusCode).toEqual(500);
            expect(res.body.error).toEqual('Error in transaction');
        });

    });

    describe('Update', () => {

        // update
        test('PUT /todo/:id should update a todo list and return 200 ok', async () => {
            // create todo_item first
            const res1 = await request(app).post('/todos').send({description: "temp"});
            let id = res1.body.todoid;

            // get todo_ item
            const res = await request(app).put(`/todo/${id}`).send({description: "something new"});
            expect(res.statusCode).toEqual(200);
            expect(res.body.description).toEqual("something new");

            // delete todo_ item
            await request(app).delete(`/todo/${id}`).send();
        });

        test('PUT /todo/:id with id not found should return 404 not found', async () => {
            // get todo_ item
            const res = await request(app).put(`/todo/237948`).send({description: "something new"});
            expect(res.statusCode).toEqual(404);
            expect(res.body.error).toEqual("Not Found");
        });

        test('PUT /todo/:id with id transaction not complete should return 500 server error', async () => {
            jest.spyOn(TodoListService.prototype, 'update')
                .mockRejectedValueOnce(() => {
                    throw new Error("Server error -- transaction not completed");
                });

            const res = await request(app).put(`/todo/5987`).send();
            expect(res.statusCode).toEqual(500);
            expect(res.body.error).toEqual('Server error -- transaction not completed');
        });

        test('PUT /todo/:id with id transaction not complete should return 500 server error', async () => {
            jest.spyOn(TodoListService.prototype, 'inTransaction')
                .mockRejectedValueOnce(() => {
                    throw new Error("Server error -- transaction not completed");
                });

            const res = await request(app).put(`/todo/5987`).send();
            expect(res.statusCode).toEqual(500);
            expect(res.body.error).toEqual('Server error');
        });
    });

});
