const bodyParser = require('body-parser');
const receitas = require('./receitas');
const usuarios = require('./usuarios');
const login = require('./login');
const Receitas = require('../controllers/receitas-controller');
const Usuarios = require('../controllers/usuarios-controller');

module.exports = app => {
const rotasReceitasAutenticadas = Receitas.rotas();
const rotasUsuariosAutenticadas = Usuarios.rotas();

//middleware que verifica se a requisição está autenticada
app.use(rotasReceitasAutenticadas.autenticadas, function(req, resp, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        resp.redirect('/login');
    }
});

app.use(rotasUsuariosAutenticadas.autenticadas, function(req, resp, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        resp.redirect('/login');
    }
});

    app.use(
        bodyParser.json(),
        receitas,
        usuarios,
        login
    );
};