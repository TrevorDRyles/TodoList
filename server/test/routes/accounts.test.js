const request = require('supertest');
require("../../bin/start");
const TodoService = require("../../services/TodoService");
const app = require('../../index');

describe('test the accounts API', () => {

    describe('Get', () => {
        test('GET /todos should get all todos from the todo list and return 200', async () => {
            const res = await request(app).get('/todos').send();
            expect(res.statusCode).toEqual(200);
            expect(res.body.length).toBeGreaterThanOrEqual(0);
        });
    });
});
