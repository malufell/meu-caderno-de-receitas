const express = require('express');
const router = express.Router();
const Usuarios = require('../controllers/usuarios-controller');

router.get('/usuarios', Usuarios.buscaUsuarios);

module.exports = router;