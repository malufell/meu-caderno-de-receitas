const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Receitas = require('../controllers/receitas-controller');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'app/public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

router.get('/', (req, res, next) => {
    res.render('index', {
        title:"Servidor express",
        product: "Meu Caderno de Receitas",
    });
});

router.get('/receitas/', (req, res, next) => {
    res.render('receitas', { usuario: 'malu' });
});

router.get('/receitas/:id', Receitas.buscaUmaReceita);

router.get('/receitas-cadastro', Receitas.buscaTodasCategorias);
    
router.post('/receitas-cadastro', upload.single('file'), Receitas.cadastraReceita);

router.get('/receitas-cadastro-foto', (req, res, next) => {
    res.render('receitas-cadastro-foto', { usuario: 'malu' });
});

// ***** teste inclusão em tabela many-to-many *****
router.get('/receitas-teste', Receitas.buscaTodasReceitas);

module.exports = router;