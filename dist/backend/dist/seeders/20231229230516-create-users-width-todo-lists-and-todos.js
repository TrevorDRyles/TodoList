'use strict';
// select *from users;
// insert into users values(1, 'tryles', 'abc');
// select *from todolists;
// insert into todolists values(1, 1);
// select *from todolists;
// select *from todos;
// insert into todos values(1, 'description', 1);
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      userid: 999,
      username: 'tryles',
      password: 'abc',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('todolists', [{
      todolistid: 999,
      userid: 999,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('todos', [{
      todoid: 999,
      description: 'description',
      todolistid: 999,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('todolists', null, {});
    await queryInterface.bulkDelete('todos', null, {});
  }
};
