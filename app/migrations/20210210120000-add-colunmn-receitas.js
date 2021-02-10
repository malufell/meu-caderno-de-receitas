'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Receitas', 'fonte', {
        type: Sequelize.TEXT
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Receitas', 'fonte');
  }
};