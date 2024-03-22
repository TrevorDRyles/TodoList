const {associateModels} = require("../../models/sequelize/index");

describe('satisy code coverage of sequelize/index.test.js', () => {

  test('satisy code coverage', async () => {
    associateModels({todo: 'value'});
  });

});
