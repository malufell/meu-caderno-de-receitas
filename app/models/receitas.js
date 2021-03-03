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
      nome: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Informe o nome da receita'
          }
        }
      },  
      imagem: DataTypes.JSON,
      video: DataTypes.STRING,
      ingredientes: DataTypes.TEXT,
      preparo: DataTypes.TEXT,
      dicas: DataTypes.TEXT,
      imagemReceita: DataTypes.JSON,
      fonte: DataTypes.TEXT,
      cadastroPorFoto: DataTypes.BOOLEAN,
      codigoCompartilhamento: DataTypes.STRING,
      categoriasId: {
        type: DataTypes.VIRTUAL,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Selecione uma ou mais categorias'
          }
        }
      }   
    }, {
      sequelize,
      modelName: 'Receitas',
    });

    return Receitas;
};
