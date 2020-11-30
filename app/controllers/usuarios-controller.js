const database = require('../models');

class Usuarios {

    static rotas() {
        return {
            autenticadas: '/usuario/:id',
        }
    }

    static async buscaUmUsuario(req, resp) {
        const { id } = req.params;
        try {
            const usuario = await database.Usuarios.findOne({ where: { id: id } });
            return resp.render('usuario-id', { usuario: usuario });
        } catch (error) {
            return resp.render('error', { error, message: error.message });
        };
    };

    static async cadastraUsuario(req, resp) {
        try {
            await database.Usuarios.create({
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha,
                confirmaSenha: req.body.confirmaSenha
            });

            req.flash('cadastroEfetuado','Cadastro efetuado com sucesso! Realize o login:');
            resp.redirect('/login');

        } catch (error) {
            //formata as mensagens de erro do sequelize:
            const errors = error.message.split(',');
            const mensagens = errors.map(function (erro) {
                return erro.replace(/Validation error: /i, "")
            })

            return resp.render('usuario-cadastro', { error: mensagens, dados: req.body });
        };
    };
};

module.exports = Usuarios;