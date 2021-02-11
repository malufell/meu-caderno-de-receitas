const express = require('express');
const router = express.Router();
const ReceitasExemplo = require('../controllers/exemplo-receitas-controller');

//caderno de receitas
router.get('/exemplo/', ReceitasExemplo.buscaTodasReceitas);

//exibe a receita na tela - findOne
router.get('/exemplo/:id', ReceitasExemplo.buscaUmaReceita);

module.exports = router;