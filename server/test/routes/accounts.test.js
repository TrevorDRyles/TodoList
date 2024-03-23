const request = require('supertest');
const app = require('../../index');
const { v4: uuidv4 } = require('uuid');
const UserService = require("../../services/UserService");
const jwt = require('jsonwebtoken');

describe('test the accounts API', () => {
    let inTransactionSpy;

    beforeEach(() => {
        process.env.JWT_SECRET = 'klasdjflasjdfkl';
        // Set up the spy before each test
        inTransactionSpy = jest.spyOn(UserService.prototype, 'inTransaction');
    });

    afterEach(() => {
        // Clear the spy after each test
        inTransactionSpy.mockRestore();
        jest.clearAllMocks();
    });

    test('POST /signup with existing user should return 409', async () => {
        const getByUsername = jest.spyOn(UserService.prototype, 'getByUsername');
        getByUsername.mockReturnValueOnce({});
        const res = await request(app).post('/signup').send({ username: 'trevor', password: 'pw' });
        expect(res.statusCode).toEqual(409);
    });

    test('POST /signup with non-existing user should return 200', async () => {
        const getByUsername = jest.spyOn(UserService.prototype, 'getByUsername');
        getByUsername.mockReturnValueOnce(null);

        const createUserMockResult = { userid: '123', username: 'trevor' };
        const createUser = jest.spyOn(UserService.prototype, 'create');
        createUser.mockResolvedValueOnce(createUserMockResult);

        // Mock jwt.sign
        const signSpy = jest.spyOn(jwt, 'sign');
        signSpy.mockImplementationOnce((payload, secret, options, callback) => {
            callback(null, 'mocked-token');
        });

        // Mock UserService.prototype.inTransaction
        inTransactionSpy.mockImplementationOnce(async (callback) => {
            await callback(createUserMockResult); // Assuming your UserService.create returns an object with createUser
        });

        const res = await request(app).post('/signup').send({ username: 'trevorrr' + uuidv4(), password: 'pw' });
        expect(res.statusCode).toEqual(200);
    });

    test('POST /signup with non-existing user should return 500', async () => {
        const getByUsername = jest.spyOn(UserService.prototype, 'getByUsername');
        getByUsername.mockReturnValueOnce(null);

        const createUserMockResult = { userid: null, username: null };
        const createUser = jest.spyOn(UserService.prototype, 'create');
        createUser.mockResolvedValueOnce(createUserMockResult);

        // Mock jwt.sign to throw an error
        const signSpy = jest.spyOn(jwt, 'sign');
        signSpy.mockImplementationOnce((payload, secret, options, callback) => {
            callback(new Error('Invalid user ID'));
        });

        // Mock UserService.prototype.inTransaction only for this specific test
        inTransactionSpy.mockImplementationOnce(async (callback) => {
            await callback(createUserMockResult);
        });

        const res = await request(app).post('/signup').send({ username: 'trevorrr' + uuidv4(), password: 'pw' });
        expect(res.statusCode).toEqual(500);
    });

    test('POST /signup with error in transaction should return 500', async () => {
        const getByUsername = jest.spyOn(UserService.prototype, 'getByUsername');
        getByUsername.mockReturnValueOnce(null);

        // Mock create to throw an error
        const createUser = jest.spyOn(UserService.prototype, 'create');
        createUser.mockRejectedValueOnce(new Error('Database error'));

        const res = await request(app).post('/signup').send({ username: 'trevorrr' + uuidv4(), password: 'pw' });
        expect(res.statusCode).toEqual(500);
    });

    test('POST /signup with error in transaction should return 500', async () => {
        const getByUsername = jest.spyOn(UserService.prototype, 'getByUsername');
        getByUsername.mockReturnValueOnce(null);

        // Mock inTransaction to throw an error
        const spyTransaction = jest.spyOn(UserService.prototype, 'inTransaction');
        spyTransaction.mockRejectedValueOnce(new Error('Transaction error'));

        const res = await request(app).post('/signup').send({ username: 'nonexistentuser21112' + uuidv4(), password: 'abc' });
        expect(res.statusCode).toEqual(500);
    });

    test('POST /signup with non-existing user should return 200', async () => {
        const getByUsername = jest.spyOn(UserService.prototype, 'getByUsername');
        getByUsername.mockReturnValueOnce(null);

        const createUserMockResult = { userid: '123', username: 'trevor' };
        const createUser = jest.spyOn(UserService.prototype, 'create');
        createUser.mockResolvedValueOnce(createUserMockResult);

        // Mock jwt.sign to throw an error
        const signSpy = jest.spyOn(jwt, 'sign');
        signSpy.mockImplementationOnce((payload, secret, options, callback) => {
            callback(new Error());
        });

        // Mock UserService.prototype.inTransaction only for this specific test
        inTransactionSpy.mockImplementationOnce(async (callback) => {
            await callback(createUserMockResult);
        });

        const res = await request(app).post('/signup').send({ username: 'trevorrr' + uuidv4(), password: 'pw' });
        expect(res.statusCode).toEqual(500);
    });

    test("POST /signup with undefined resultOfCreate should return 500", async () => {
        const getByUsername = jest
          .spyOn(UserService.prototype, "getByUsername")
          .mockReturnValueOnce(null);

        const createUser = jest
          .spyOn(UserService.prototype, "create")
          .mockResolvedValueOnce(undefined);

        inTransactionSpy.mockImplementationOnce(async (callback) => {
            await callback({ createUser: undefined });
        });

        const res = await request(app)
          .post("/signup")
          .send({ username: "trevorrr" + uuidv4(), password: "pw" });
        expect(res.statusCode).toEqual(500);
    });
});
