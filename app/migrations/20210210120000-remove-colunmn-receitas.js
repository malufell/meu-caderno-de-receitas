'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Receitas', 'categorias_id', {
        type: Sequelize.TEXT
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Receitas', 'categorias_id');
  }
};