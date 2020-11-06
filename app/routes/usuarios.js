const express = require('express');
const router = express.Router();
const Usuarios = require('../controllers/usuarios-controller');

router.get('/usuarios', Usuarios.buscaUsuarios);

router.get('/dados-cadastro/:id', Usuarios.buscaUmUsuario);

router.get('/cadastro', (req, res, next) => {
    res.render('form-cadastro', { error: false, dados: {} })
});

router.post('/cadastro', Usuarios.cadastraUsuario);

//rota utilizada para teste da autenticação
router.get('/autenticada', function (req, res, next) {
    if (req.isAuthenticated()) {
        res.render('autenticada', { usuario: req.user });
    } else {
        res.redirect('/login');
    }
});

module.exports = router;