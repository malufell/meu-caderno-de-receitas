const database = require('../models');

class Usuarios {
    static async buscaUsuarios(req, resp) {
        try {
            const usuarios = await database.Usuarios.findAll();
            return resp.render('usuarios', { usuarios });
        } catch (error) {
            return resp.render('error', { error, message: error.message });
        };
    };

    static async buscaUmUsuario(req, resp) {
        const { email } = req.params;
        try {
            const usuario = await database.Usuarios.findOne({ where: { email: email }});
            console.log(usuario.nome)
            return resp.render('dados-cadastro', { usuario: usuario });
        } catch (error) {
            return resp.render('error', { error, message: error.message });
        };
    };
};

module.exports = Usuarios;
