const express = require('express');
const router = express.Router();
const Usuarios = require('../controllers/usuarios-controller');

router.get('/usuarios', Usuarios.buscaUsuarios);

router.get('/dados-cadastro/:email', Usuarios.buscaUmUsuario);

//rota utilizada para teste da autenticação
router.get('/autenticada', function (req, res, next) {
    if (req.isAuthenticated()) {
        res.render('autenticada');
    } else {
        res.redirect('/login');
    }
});

module.exports = router;