'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkInsert('Usuarios', [{
        nome: 'Malu',
        email: 'malu@malu.com',
        senha: 'aaa',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        nome: 'Joao',
        email: 'joao@joao.com',
        senha: 'bbb',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Cris',
        email: 'cris@cris.com',
        senha: 'ccc',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkDelete('Usuarios', null, {});
    
  }
};