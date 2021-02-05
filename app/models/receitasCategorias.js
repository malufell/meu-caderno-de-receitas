'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReceitasCategorias extends Model {

    static associate(models) {

        //super muitos para muitos
        ReceitasCategorias.belongsTo(models.Categorias, {
            as:'Categorias',
            foreignKey: 'id'
        });

        ReceitasCategorias.belongsTo(models.Receitas, {
            as: 'Receitas',
            foreignKey: 'id'
        });
    };
};

    ReceitasCategorias.init({
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
      },
      receitaId: {
        type: DataTypes.INTEGER,
      },
      categoriaId: { 
      type: DataTypes.INTEGER,
      allowNull: false
      },
     }, {
      sequelize,
      modelName: 'ReceitasCategorias',
  });

    return ReceitasCategorias;
};

