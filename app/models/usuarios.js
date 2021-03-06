'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {

    static associate(models) {
      Usuarios.hasMany(models.Receitas, {
        foreignKey: 'usuario_id'
      });
    };

  } Usuarios.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        validaNome: function (nome) {
          if (nome.length < 3) throw new Error('O campo nome deve conter 3 ou mais caracteres')
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
        validaTamanhoSenha: function (senha) {
          if (senha.length < 6) throw new Error('O campo senha deve conter 6 ou mais caracteres')
        }
      }
    },
    confirmaSenha: {
      type: DataTypes.VIRTUAL,
    }, 
    usuario: {
      type: DataTypes.STRING,
    },
    tokenRecuperaSenha: {
      type: DataTypes.STRING,
    },
    tokenPrazoRecuperaSenha: {
      type: DataTypes.DATE,
    }
  },
    {
    sequelize,
    modelName: 'Usuarios',
  });

  Usuarios.beforeUpdate('validaNovaSenha', (usuario) => {
    if (usuario.senha !== usuario.confirmaSenha) {
      throw new Error('As senhas digitadas estão diferentes'); 

    }
  });
  Usuarios.beforeUpdate('criptografaNovaSenha', (usuario) => {
    usuario.senha = Usuarios.generateHash(usuario.senha)
  });

  Usuarios.beforeCreate('validaSenha', (usuario) => {
    if (usuario.senha !== usuario.confirmaSenha) {
      throw new Error('As senhas digitadas estão diferentes'); 
    }
  });

  Usuarios.beforeCreate('criptografaSenha', (usuario) => {
    usuario.senha = Usuarios.generateHash(usuario.senha)
  });

  Usuarios.beforeCreate('criaNomeUsuario', (usuario) => {
    usuario.usuario = usuario.nome.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '').toLowerCase();
  });

  Usuarios.generateHash = function(senhaCadastro) {
    return bcrypt.hashSync(senhaCadastro, bcrypt.genSaltSync (10), null);
  };

  Usuarios.prototype.validPassword = function(senhaDigitada, senhaCadastro) { 
    return bcrypt.compareSync(senhaDigitada, senhaCadastro);
  };

  return Usuarios;
};