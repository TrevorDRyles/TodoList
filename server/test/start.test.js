const request = require('supertest');
const connectToPostgres = require("../bin/start");
const TodoListService = require("../services/TodoListService");
const app = require('../index');

describe('test the connectToMyPostgres function', () => {

    test('connectToMyPostgres without error should work', async() => {
        await connectToPostgres();
    });

    test('connectToMyPostgres without error should work', async() => {
        const sequelize = {
            authenticate: jest.fn().mockRejectedValueOnce(new Error('Connection failed')),
        };
        const exitMock = jest.spyOn(process, 'exit').mockImplementationOnce((code) => {
            // Assert that process.exit was called with the expected exit code
            expect(code).toBe(1);
        });
        await connectToPostgres(sequelize);
    });

});