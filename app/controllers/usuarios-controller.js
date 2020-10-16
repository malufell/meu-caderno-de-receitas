const database = require('../models');

class Usuarios {
        static async buscaUsuarios(req, resp) {
        try {
            const usuarios = await database.Usuarios.findAll();
            return resp.render('usuarios', {usuarios});
        } catch (error) {
            return resp.render('error');
        };
    }; 
}

module.exports = Usuarios;