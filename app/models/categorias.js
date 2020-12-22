'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Categorias extends Model {

    static associate(models) {
      Categorias.belongsToMany(models.Receitas, {
        through: 'ReceitasCategorias',
        as: 'receitas',
        foreignKey: 'categoriaId'
      });
    }
  };
  Categorias.init({
    categoria: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categorias',
  });
  return Categorias;
};