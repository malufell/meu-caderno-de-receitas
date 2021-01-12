module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Receitas', 'ImagemReceita', {
                type: 'JSON USING CAST ("imagem" as JSON)'
            }),
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Receitas', 'ImagemReceita', {
                type: Sequelize.STRING,
                
            }),
        ])
    }
};