const request = require('supertest');
require("../../bin/start");
const UserService = require("../../services/UserService");
const app = require('../../index');
const {postgres} = require("../../config/index");

require('dotenv').config();

describe('test the accounts API', () => {
  let inTransactionSpy;

  beforeEach(() => {
    // Set up the spy before each test
    inTransactionSpy = jest.spyOn(UserService.prototype, 'inTransaction');
  });

  afterEach(() => {
    // Clear the spy after each test
    inTransactionSpy.mockRestore();
  });

  test('POST /signup with existing user should return 409', async () => {
    const res = await request(app).post('/signup').send({username: 'Triple', password: 'abc'});
    expect(res.statusCode).toEqual(409);
  });

  test('POST /signup with non-existing user should return 500', async () => {
    // Arrange
    inTransactionSpy.mockRejectedValueOnce(new Error("Server error"));

    // Act
    const res = await request(app).post('/signup').send({username: 'nonexistentuser2111', password: 'abc'});

    // Assert
    expect(inTransactionSpy).toHaveBeenCalled();
    expect(res.statusCode).toEqual(500);
  });
});
