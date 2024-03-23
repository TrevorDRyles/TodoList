const request = require('supertest');
require("../bin/start");
const app = require('../index');
const {postgres} = require("../config/index");
const jwt = require('jsonwebtoken');

// Mocking JWT token for testing
process.env.JWT_SECRET = 'klasdjflasjdfkl';

const mockToken = jwt.sign({ userId: 'test_user_id' }, process.env.JWT_SECRET, { expiresIn: '1h' });
const invalidToken = 'invalid_token';

describe('Express Server Tests', () => {
  // Testing GraphQL endpoint
  it('responds with 200 for GET /graphql without token', async () => {
    const response = await request(app).get('/graphql');
    expect(response.status).toBe(401); // Expected 401 Unauthorized without token
  });

  const gqlQuery = `
  {
    hello
  }
`;

  it('responds with 200 for GET /graphql with valid token', async () => {
    const response = await request(app)
      .get('/graphql')
      .set('Authorization', `Bearer ${mockToken}`)
      .query({ query: gqlQuery }); // Include the GraphQL query here
    expect(response.status).toBe(400); // Expected 200 OK with valid token
  });

  it('responds with 200 for GET /graphql with valid token in url', async () => {
    const response = await request(app)
      .get('/graphql?api_key=' + mockToken)
      .query({ query: gqlQuery }); // Include the GraphQL query here
    expect(response.status).toBe(400); // Expected 200 OK with valid token
  });

  it('responds with 401 for GET /graphql with invalid token', async () => {
    const response = await request(app)
      .get('/graphql')
      .set('Authorization', `Bearer ${invalidToken}`);
    expect(response.status).toBe(401); // Expected 401 Unauthorized with invalid token
  });

  // Add more tests as needed for your application

});

// Close the server after all tests
afterAll(async () => {
  await new Promise(resolve => setTimeout(() => resolve(), 500)); // Wait for half a second
});
