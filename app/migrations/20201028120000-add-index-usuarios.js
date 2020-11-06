'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addIndex('Usuarios', ['email'], {
            indexName: 'index_usuarios_on_email',
            unique: true
        })
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeIndex('Usuarios', ['email']);
    }
}