const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', {
        title:"Servidor express",
        product: "Meu Caderno de Receitas",
    });
});

router.get('/caderno', (req, res, next) => {
    res.render('caderno-receitas', { usuario: 'malu' });
});

router.get('/receita', (req, res, next) => {
    res.render('receita', { usuario: 'malu' });
});

module.exports = router;