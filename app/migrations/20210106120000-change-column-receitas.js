module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Receitas', 'imagem', {
                type: 'JSON USING CAST ("imagem" as JSON)'
            }),
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Receitas', 'imagem', {
                type: Sequelize.STRING,
                
            }),
        ])
    }
};