'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      
    await queryInterface.bulkInsert('Receitas', [{
        nome: 'bolo 1',
        imagem: JSON.stringify([]),
        video: '',
        ingredientes: '',
        preparo: '',
        dicas: '',
        usuario_id: 4,
        imagemReceita: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        nome: 'bolo 2',
        imagem: JSON.stringify([]),
        video: '',
        ingredientes: '',
        preparo: '',
        dicas: '',
        usuario_id: 4,
        imagemReceita: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        nome: 'bolo 3',
        imagem: JSON.stringify([]),
        video: '',
        ingredientes: '',
        preparo: '',
        dicas: '',
        usuario_id: 4,
        imagemReceita: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        nome: 'bolo 4',
        imagem: JSON.stringify([]),
        video: '',
        ingredientes: '',
        preparo: '',
        dicas: '',
        usuario_id: 4,
        imagemReceita: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        nome: 'bolo 5',
        imagem: JSON.stringify([]),
        video: '',
        ingredientes: '',
        preparo: '',
        dicas: '',
        usuario_id: 4,
        imagemReceita: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        nome: 'bolo 6',
        imagem: JSON.stringify([]),
        video: '',
        ingredientes: '',
        preparo: '',
        dicas: '',
        usuario_id: 4,
        imagemReceita: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        nome: 'bolo 7',
        imagem: JSON.stringify([]),
        video: '',
        ingredientes: '',
        preparo: '',
        dicas: '',
        usuario_id: 4,
        imagemReceita: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        nome: 'bolo 8',
        imagem: JSON.stringify([]),
        video: '',
        ingredientes: '',
        preparo: '',
        dicas: '',
        usuario_id: 4,
        imagemReceita: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        nome: 'bolo 9',
        imagem: JSON.stringify([]),
        video: '',
        ingredientes: '',
        preparo: '',
        dicas: '',
        usuario_id: 4,
        imagemReceita: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        nome: 'bolo 10',
        imagem: JSON.stringify([]),
        video: '',
        ingredientes: '',
        preparo: '',
        dicas: '',
        usuario_id: 4,
        imagemReceita: JSON.stringify([]),
        createdAt: new Date(),
        updatedAt: new Date()
      },


     ], {});
    },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Receitas', null, {});
  }
};