const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', {
        title:"Servidor express",
        product: "Meu Caderno de Receitas",
        version: "0.0.0"
    });
});

module.exports = router;