'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkInsert('Usuarios', [{
        id: 3,
        nome: 'Exemplo',
        email: 'mluisa.fell@gmail.com',
        senha: 'aaa',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkDelete('Usuarios', null, {});
    
  }
};