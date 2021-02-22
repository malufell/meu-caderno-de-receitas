const express = require('express');
const router = express.Router();
const Usuarios = require('../controllers/usuarios-controller');

router.get('/usuario/:id', Usuarios.buscaUmUsuario);

router.get('/usuario-cadastro', (req, res, next) => {
    res.render('usuario-cadastro', { error: false, dados: {} })
});

router.post('/usuario-cadastro', Usuarios.cadastraUsuario);

router.get('/senha', (req, res, next) => {
    res.render('usuario-recupera-senha', { error: false, usuario: false })
});

router.post('/senha', Usuarios.recuperaSenha);

router.get('/nova-senha', (req, res, next) => {
    res.render('usuario-nova-senha', { token: req.query.token, error: false, email: "" })
});

router.post('/nova-senha', Usuarios.novaSenha);


module.exports = router;