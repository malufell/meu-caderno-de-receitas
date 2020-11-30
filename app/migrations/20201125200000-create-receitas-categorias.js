  
module.exports = {
    up: async (queryInterface, DataTypes) => {
      await queryInterface.createTable('ReceitasCategorias', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        receitaId: {
          type: DataTypes.INTEGER,
          references: { model: 'Receitas', key: 'id' },
          onDelete: 'CASCADE',
          allowNull: false,
        },
        categoriaId: {
          type: DataTypes.INTEGER,
          references: { model: 'Categorias', key: 'id' },
          onDelete: 'CASCADE',
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
      });
    },
  
    down: async (queryInterface) => {
        await queryInterface.dropTable('ReceitasCategorias');
    },
  };