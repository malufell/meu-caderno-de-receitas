'use strict';
const { Model } = require('sequelize');
const receitasCategorias = require('./receitasCategorias');

module.exports = (sequelize, DataTypes) => {
  class Categorias extends Model {

    static associate(models) {

      //super muitos para muitos

      Categorias.belongsToMany(models.Receitas, { 
        as: 'receitas', 
        through: 'ReceitasCategorias', 
        foreignKey: 'categoriaId'
      });

      Categorias.hasMany(models.ReceitasCategorias, {
        as:'CategoriasReceitas',
        foreignKey: 'categoriaId'
      });
    }
  };
  Categorias.init({
    categoria: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Categorias',
  });
  return Categorias;
};



