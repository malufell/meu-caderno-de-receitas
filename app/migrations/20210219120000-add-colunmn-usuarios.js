'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Usuarios', 'tokenRecuperaSenha', {
        type: Sequelize.STRING
    });

    await queryInterface.addColumn('Usuarios', 'tokenPrazoRecuperaSenha', {
        type: Sequelize.DATE
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Usuarios', 'tokenRecuperaSenha');
    await queryInterface.removeColumn('Usuarios', 'tokenPrazoRecuperaSenha');
  }
};