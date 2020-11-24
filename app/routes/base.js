const express = require('express');
const router = express.Router();
const multer = require('multer');

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

router.get('/cadastro-receita', (req, res, next) => {
    res.render('cadastro-receita', { usuario: 'malu' });
});

router.get('/cadastro-receita-foto', (req, res, next) => {
    res.render('cadastro-receita-via-foto', { usuario: 'malu' });
});

//upload de imagens:

// cria uma instância do middleware configurado
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'app/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`);
    }
});

// utiliza a storage para configurar a instância do multer
const upload = multer({ storage });

router.post('/cadastro-receita', upload.single('file'), 
    (req, res) => res.render('cadastro-receita', { usuario: 'malu' })); 


module.exports = router;