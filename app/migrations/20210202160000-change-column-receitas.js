module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Receitas', 'nome', {
                type: Sequelize.STRING(50),
                allowNull: false 
            }),
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Receitas', 'nome', {
                type: Sequelize.STRING(50),
                allowNull: true 
                
            }),
        ])
    }
};