'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Usuarios', 'usuario', {
        type: Sequelize.STRING
    });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Usuarios', 'usuario');
  }
};