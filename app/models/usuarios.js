'use strict';
const { Model } = require('sequelize');

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

  } Usuarios.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        validaNome: function (dado) {
          if (dado.length < 3) throw new Error('O campo nome deve conter 3 ou mais caracteres')
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Email já cadastrado"
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Um email válido deve ser preenchido'
        },
      }
    },
    senha: {
      type: DataTypes.STRING,
      validate: {
        validaTamanhoSenha: function (dado) {
          if (dado.length < 6) throw new Error('O campo senha deve conter 6 ou mais caracteres')
        }
      }
    },
    confirmaSenha: {
      type: DataTypes.VIRTUAL,
    }, 
  },
    {
    sequelize,
    modelName: 'Usuarios',
  });

  Usuarios.beforeSave('validaSenha', (usuario) => {
    if (usuario.senha !== usuario.confirmaSenha) {
      throw new Error('As senhas digitadas estão diferentes'); 
    }
  })

  return Usuarios;
};