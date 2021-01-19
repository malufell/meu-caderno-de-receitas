const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Receitas = require('../controllers/receitas-controller');


//MULTER - UPLOAD DE IMAGENS
const tamanhoMaximoFile = 5000000

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'app/public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ 
    storage: storage, 
    limits: { fileSize: tamanhoMaximoFile }
});


router.get('/', (req, res, next) => {
    res.render('index', {
        title:"Servidor express",
        product: "Meu Caderno de Receitas",
    });
});

router.get('/produto', (req, res, next) => {
    res.render('produto-pag-inicial')
});

//caderno de receitas
router.get('/receitas/', Receitas.buscaTodasReceitas);

//cria objeto receitas vazio
router.get('/receitas-cadastro', Receitas.exibeFormularioReceita);

//cadastra uma nova receita
router.post('/receitas-cadastro', upload.array('file', 2), Receitas.cadastraReceita);

//exibe a receita na tela - findOne
router.get('/receitas/:id', Receitas.buscaUmaReceita);

//busca os dados da receita no BD para edição
router.get('/receitas/:id/edicao', Receitas.editaReceita);

//atualiza uma receita na base
router.put('/receitas/:id/edicao', upload.array('file', 2), Receitas.atualizaReceita);

router.delete('/receitas/:id', Receitas.deletaReceita);



module.exports = router;