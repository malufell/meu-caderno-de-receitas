'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Receitas', 'codigoCompartilhamento', {
        type: Sequelize.STRING
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Receitas', 'codigoCompartilhamento');
  }
};