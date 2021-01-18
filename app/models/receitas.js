'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Receitas extends Model {

    static associate(models) {
      Receitas.belongsTo(models.Usuarios, {
        foreignKey: 'usuario_id'
      });

      //super muitos para muitos
      Receitas.belongsToMany(models.Categorias, { 
        as: 'categorias', 
        through:'ReceitasCategorias',
        foreignKey: 'receitaId'
      });

      Receitas.hasMany(models.ReceitasCategorias, {
        as: 'ReceitasCategorias',
        foreignKey: 'receitaId'

      });
    };

    };
    Receitas.init({
      nome: DataTypes.STRING(50),
      imagem: DataTypes.JSON,
      video: DataTypes.STRING,
      ingredientes: DataTypes.TEXT,
      preparo: DataTypes.TEXT,
      dicas: DataTypes.TEXT,
      imagemReceita: DataTypes.JSON,
    }, {
      sequelize,
      modelName: 'Receitas',
    });

    return Receitas;
};

