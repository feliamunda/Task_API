'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('tasks', [
        {id:1, description: 'Estudiar', createdAt:new Date(), updatedAt: new Date()},
        {id:2, description: 'Dormir', createdAt:new Date(), updatedAt: new Date()},
        {id:3, description: 'Bailar', createdAt:new Date(), updatedAt: new Date()},
        {id:4, description: 'Tocar', createdAt:new Date(), updatedAt: new Date()},
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('tasks', null, {});
  }
};
