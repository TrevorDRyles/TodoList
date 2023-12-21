const request = require('supertest');
const app     = require('../index');
const connection  = require("../pool");
describe('test the todo list API', () => {
    beforeAll(async () => {
        console.log('before all');
    });

    afterAll(async () => {
        console.log('after all');
        await connection.end();
    });

    // POSITIVE TEST CASES

    it('GET /todos should get all todos from the todo list', async () => {
        const res = await request(app).get('/todos').send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThanOrEqual(0);
    });


    it('GET /todo/:id should get the todo item from the todo list', async () => {
        // create todo_item first
        const res1 = await request(app).post('/todos').send({description: "temp"});
        let desc = res1.body.description;
        let id = res1.body.todo_id;
        const res = await request(app).get(`/todo/${id}`).send();
        expect(res.statusCode).toEqual(200);
        const res2 = await request(app).delete(`/todo/${id}`).send();
    });

    // NEGATIVE TEST CASES

});
