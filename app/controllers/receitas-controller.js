const database = require('../models');

class Receitas {

    static rotas() {
        return {
            autenticadas: '/receita*',
        }
    }
    
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

    static async buscaTodasCategorias(req, resp) {
        try {
            const categorias = await database.Categorias.findAll({
            });
            return resp.render('receitas-cadastro', { usuario: 'malu', categorias: categorias });
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
                usuario: 'malu', 
                receita: receita, 
                imagem: imagem, 
                video: video, 
            });

        } catch (error) {
            return resp.render('error', { error, message: error.message });
        }
    };

    static async cadastraReceita (req, resp) {
        const categorias = req.body.categorias;
        const usuario = 4;
       
        try {
            const receita = await database.Receitas.create({
                nome: req.body.nome,
                imagem: (req.file? req.file.filename : null),
                video: req.body.idVideo,
                ingredientes: req.body.ingredientes,
                preparo: req.body.preparo,
                dicas: req.body.dicas,
                usuario_id: usuario,
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
