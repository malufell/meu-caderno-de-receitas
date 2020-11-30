module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Receitas', 'nome', {
                type: Sequelize.STRING(50),
            }),
            queryInterface.changeColumn('Receitas', 'ingredientes', {
                type: Sequelize.TEXT,
            }),
            queryInterface.changeColumn('Receitas', 'preparo', {
                type: Sequelize.TEXT,
            }),
            queryInterface.changeColumn('Receitas', 'dicas', {
                type: Sequelize.TEXT,
            }),
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Receitas', 'nome', {
                type: Sequelize.STRING,
                
            }),
            queryInterface.changeColumn('Receitas', 'ingredientes', {
                type: Sequelize.STRING,
            }),
            queryInterface.changeColumn('Receitas', 'preparo', {
                type: Sequelize.STRING,
            }),
            queryInterface.changeColumn('Receitas', 'dicas', {
                type: Sequelize.STRING,
            }),
        ])
    }
};