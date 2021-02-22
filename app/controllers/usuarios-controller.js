const database = require('../models');
const crypto = require('crypto');
const smtpTransport = require('../mail');
const { ValidationError } = require("sequelize");

class Usuarios {

    static rotas() {
        return {
            autenticadas: '/usuario/:id',
        }
    }

    static async buscaUmUsuario(req, resp) {
        const id  = req.user.id;
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

    static async recuperaSenha(req, resp) {
        const { email }  = req.body;

        try {
            const usuario = await database.Usuarios.findOne({ where: { email: email } });

            if(!usuario) {
                return resp.render('usuario-recupera-senha', { error: `Hum, não encontramos o contato "${email}" em nossa base de dados, tente novamente.`, usuario: false })
            };

            const token = crypto.randomBytes(20).toString('hex'); //gera um código aleatório
            const prazoToken = new Date(); //após esse prazo o token não será válido
            prazoToken.setHours(prazoToken.getHours() + 24);

            await database.Usuarios.update({ 
                tokenRecuperaSenha: token,
                tokenPrazoRecuperaSenha: prazoToken,
                }, {
                    where: {
                        id: usuario.id
                }
            });

            const nome = usuario.nome;

            smtpTransport.sendMail({
                to: email,
                from: process.env.SMTP_USERNAME,
                subject: 'Recuperação de senha',
                template: 'usuario-recupera-senha',
                context: { token, nome },
            }, (error) => {
                if (error) {
                    return resp.render('usuario-recupera-senha', { error: "O email não pode ser enviado, tente novamente. ", usuario: false })
                } else {
                    return resp.render('usuario-recupera-senha', { usuario: usuario.nome, email: email })
                } 
            });
        
        } catch (error) {
            console.log(error)
            return resp.render('error', { error, message: error.message });
        };
    };

    static async novaSenha(req, resp) {
        const { email, token }  = req.body;

        try {
            const usuario = await database.Usuarios.findOne({ where: { email: email } });

            if(!usuario) {
                return resp.render('usuario-nova-senha', { error: "Usuário não encontrado! Seu e-mail está correto?", token: token, email: email })
            };

            if(token !== usuario.tokenRecuperaSenha) {
                return resp.render('usuario-nova-senha', { error: "O link que você utilizou está inválido!", token: false, email: email })
            };

            const data = new Date();
            if(data > usuario.tokenPrazoRecuperaSenha) {
                return resp.render('usuario-nova-senha', { error: "Por medidas de segurança, o prazo deste link era de 24 horas e já expirou.", token: false, email: email })
            };

            await database.Usuarios.update({ 
                senha: req.body.senha,
                confirmaSenha: req.body.confirmaSenha
                }, {
                    where: {
                        id: usuario.id
                },
                individualHooks: true
            });

            req.flash('senhaAlterada','Senha alterada com sucesso! Realize o login:');
            resp.redirect('/login');

        } catch (error) {
            
            const errors = error.message.split(',');
            const mensagens = errors.map(function (erro) {
                return erro.replace(/Validation error: /i, "")
            })

            if(error instanceof ValidationError) {
                console.log(error)
                return resp.render('usuario-nova-senha', { 
                    error: mensagens, 
                    email: email,
                    token: token
                });
                
            } else if (error.message == "As senhas digitadas estão diferentes") {
                return resp.render('usuario-nova-senha', { 
                    error: mensagens, 
                    email: email,
                    token: token
                });
            } else {
                return resp.render('error', { error, message: error.message }); 
            }
        };
    };
};

module.exports = Usuarios;