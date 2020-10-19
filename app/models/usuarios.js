'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Usuarios.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        validaNome: function (dado) {
          if (dado.length < 3) throw new Error('O campo nome deve ter mais que 3 caracteres')
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'dados de e-mail inválidos'
        }
      }
    },
    senha: {
      type: DataTypes.STRING,
      validate: {
        validaTamanhoSenha: function (dado) {
          if (dado.length < 5) throw new Error('O campo senha deve ter mais que 5 caracteres')
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Usuarios',
  });
  return Usuarios;
};