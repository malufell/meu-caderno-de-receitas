const express = require('express');
const router = express.Router();
const Usuarios = require('../controllers/usuarios-controller');

router.get('/usuarios', Usuarios.buscaUsuarios);

router.get('/dados-cadastro/:email', Usuarios.buscaUmUsuario);

module.exports = router;