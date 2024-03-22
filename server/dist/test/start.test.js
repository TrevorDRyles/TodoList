const {connectToMyPostgres} = require("../bin/start");

describe('test the connectToMyPostgres function', () => {

  test('connectToMyPostgres without error should work', async () => {
    await connectToMyPostgres();
  });

  test('connectToMyPostgres with error should work', async () => {
    const sequelize = {
      authenticate: jest.fn().mockRejectedValueOnce(new Error('Connection failed')),
    };
    jest.spyOn(process, 'exit').mockImplementationOnce((code) => {
      // Assert that process.exit was called with the expected exit code
      expect(code).toBe(1);
    });
    await connectToMyPostgres(sequelize);
  });

});
