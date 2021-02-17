'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Receitas', 'cadastroPorFoto', {
        type: Sequelize.TEXT
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Receitas', 'cadastroPorFoto');
  }
};