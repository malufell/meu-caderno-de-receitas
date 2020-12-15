const database = require('../models');

class Receitas {

    static rotas() {
        return {
            autenticadas: '/receita*',
        }
    };
    
    static async exibeFormularioReceita(req, resp) {

        try {
            const categorias = await database.Categorias.findAll();
            const receita = database.Receitas.build({
                nome: "",
                imagem: "",
                video: "",
                ingredientes: "",
                preparo: "",
                dicas: ""
            }); 

            return resp.render('receitas-cadastro', { 
                receita: receita, 
                categorias: categorias, 
                usuario: req.user.id 
            });
            
        } catch (error) {
            return resp.render('error', { error, message: error.message });
        }
    };

    static async editaReceita(req, resp) {
        const { id } = req.params;

        try {
            const receita = await database.Receitas.findOne({ 
                where: { id: id },  
                include: [
                    {
                    model: database.Categorias,
                    as: 'categorias',
                    through: { attributes: [] },
                    },
                ],
            });
            
            const imagem = ("/uploads/" + receita.imagem);
            const video = ("https://www.youtube.com/embed/" + receita.video);
            const categorias = await database.Categorias.findAll();

            return resp.render('receitas-cadastro', { 
                receita: receita, 
                categorias: categorias, 
                imagem: imagem, 
                video: video, 
                usuario: req.user.id });

        } catch (error) {
            return resp.render('error', { error, message: error.message });
        };
    };

    static async atualizaReceita(req, resp) {
            const { id } = req.params;
            const novaInformacao = req.body;
            novaInformacao.imagem = (req.file ? req.file.filename : req.body.imagem);
            const categorias = req.body.categorias;

            try {
                await database.Receitas.update(novaInformacao, { where: { id: id } });
                const receitaAtualizada = await database.Receitas.findOne({ where: { id: id }});

                if (categorias && categorias.length > 0) {
                    receitaAtualizada.setCategorias(categorias);
                }       

                return resp.redirect('/receitas/' + id)

            } catch (error) {
                return resp.render('error', { error, message: error.message });
            };
        };


    static async buscaTodasReceitas(req, resp) {

        try {
            const receitas = await database.Receitas.findAll({
            include: [
                {
                model: database.Categorias,
                as: 'categorias',
                through: { attributes: [] },
                },
            ],
            order: [['id', 'DESC']]
            });
        
            return resp.status(200).json(receitas);

        } catch (error) {
            return resp.render('error', { error, message: error.message });
        }
    };

    static async buscaUmaReceita(req, resp) {
        const { id } = req.params;

        try {
            const receita = await database.Receitas.findOne({
            where: { id: id },  
            include: [
                {
                model: database.Categorias,
                as: 'categorias',
                through: { attributes: [] },
                },
            ],
            });

            const imagem = ("/uploads/" + receita.imagem);
            const video = ("https://www.youtube.com/embed/" + receita.video);

            return resp.render('receitas-id', { 
                receita: receita, 
                imagem: imagem, 
                video: video, 
                usuario: req.user.id
            });

        } catch (error) {
            return resp.render('error', { error, message: error.message });
        }
    };

    static async cadastraReceita (req, resp) {
        const categorias = req.body.categorias;

        try {
            const receita = await database.Receitas.create({
                nome: req.body.nome,
                imagem: (req.file ? req.file.filename : null),
                video: req.body.video,
                ingredientes: req.body.ingredientes,
                preparo: req.body.preparo,
                dicas: req.body.dicas,
                usuario_id: req.user.id,
                categorias: req.body.categorias
            });
    
            if (categorias && categorias.length > 0) {
                receita.setCategorias(categorias);
            }
            return resp.redirect('/receitas/' + receita.id);

        } catch (error) {
            return resp.render('error', { error, message: error.message });
        };
    };
};

module.exports = Receitas;
