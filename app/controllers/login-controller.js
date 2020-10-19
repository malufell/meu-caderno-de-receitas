const database = require('../models');

class Login {

    static async buscaPorId(req, res) {
        const { email, senha } = req.body;

        try {
            const usuario = await database.Usuarios.findOne({ where: { email: email } });

            if (usuario) {
                if (senha != usuario.senha) {
                    return res.render('login', { alert: true, mensagem: 'senha incorreta' });

                } else return res.render('dados-cadastro', { usuario });
            } else {
                return res.render('login', { alert: true, mensagem: 'cadastro não localizado' });
            };
        }
        catch (error) {
            return res.render('error', { error, message: error.message });
        };
    };
};

module.exports = Login;