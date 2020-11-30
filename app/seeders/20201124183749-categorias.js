'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      
    await queryInterface.bulkInsert('Categorias', [{
        categoria: 'Lowcarb',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        categoria: 'FIT',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        categoria: 'Vegana',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        categoria: 'Vegetariana',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        categoria: 'Doces',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        categoria: 'Salgados',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        categoria: 'Bebidas',
        createdAt: new Date(),
        updatedAt: new Date() }], {});
    },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Categorias', null, {});
  }
};
