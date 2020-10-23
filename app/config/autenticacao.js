const { v4: uuidv4 } = require('uuid');
const passport = require('passport')
const Strategy = require('passport-local').Strategy;
const database = require('../models')
const sessao = require('express-session');
const flash = require('connect-flash')

module.exports = (app) => {
    app.use(sessao({
        secret: "aguiareal",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
        genid: function (req) {
            return uuidv4();
        }
    }));

    passport.use('local', new Strategy(
        {   
            usernameField: 'email',
            passwordField: 'senha',
        },
        function (email, senha, done) {
            database.Usuarios.findOne({ where: { email: email } }).then(function (usuario) {
                if (!usuario) {
                    return done(null, false, { message: 'usuário não encontrado' });
                }
                if (usuario.senha != senha) {

                    return done(null, false, { message: 'senha inválida' });
                }
                return done(null, usuario)
            })
        }
    ))

    passport.serializeUser(function (usuario, done) {
        done(null, usuario.id);
    });

    passport.deserializeUser(function (id, done) {
        database.Usuarios.findOne({ where: { id: id } }).then(function (usuario) {
            done(null, usuario);
        });
    });

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
}