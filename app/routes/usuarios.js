const express = require('express');
const router = express.Router();
const Usuarios = require('../controllers/usuarios-controller');

router.get('/usuario/:id', Usuarios.buscaUmUsuario);

router.get('/usuario-cadastro', (req, res, next) => {
    res.render('usuario-cadastro', { error: false, dados: {} })
});

router.post('/usuario-cadastro', Usuarios.cadastraUsuario);


module.exports = router;