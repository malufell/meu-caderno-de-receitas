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

//caderno de receitas
router.get('/receitas/', (req, res, next) => {
    res.render('receitas', { usuario: 'malu' });
});

//cria objeto receitas vazio
router.get('/receitas-cadastro', Receitas.exibeFormularioReceita);

//cadastra uma nova receita
router.post('/receitas-cadastro', upload.single('file'), Receitas.cadastraReceita);

//busca os dados da receita no BD para edição
router.get('/receitas/:id/edicao', Receitas.editaReceita);

//atualiza uma receita na base
router.put('/receitas/:id/edicao', upload.single('file'), Receitas.atualizaReceita);

//exibe a receita na tela - findOne
router.get('/receitas/:id', Receitas.buscaUmaReceita);

router.get('/receitas-cadastro-foto', (req, res, next) => {
    res.render('receitas-cadastro-foto', { usuario: 'malu' });
});

//lista de receitas - teste
router.get('/todas-receitas', Receitas.buscaTodasReceitas)

module.exports = router;