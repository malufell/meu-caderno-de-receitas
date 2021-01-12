module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.renameColumn('Receitas', 'ImagemReceita', 'imagemReceita'),
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.renameColumn('Receitas', 'imagemReceita', 'ImagemReceita'),
        ])
    }
};