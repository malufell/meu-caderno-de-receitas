const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const path = require('path');
const Receitas = require('../controllers/receitas-controller');


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
    
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "meuCadernoDeReceitas",
        allowedFormats: ["jpg", "png"],
    }
});

const upload = multer({ storage: storage });



router.get('/', (req, res, next) => {
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

//modo público
router.post('/receitas/:id/compartilhamento', Receitas.atualizaCodigoCompartilhamento);
router.get('/u/:usuario/:codigoCompartilhamento', Receitas.exibeModoPublico);

module.exports = router;


