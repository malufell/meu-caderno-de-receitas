const database = require('../models');
// const Sequelize = require('sequelize');
const { Op } = require("sequelize");

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
                where: { id: id, usuario_id: req.user.id },
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
                usuario: req.user.id
            });

        } catch (error) {
            return resp.render('error', { error, message: error.message });
        };
    };

    static async atualizaReceita(req, resp) {
        const { id } = req.params;
        const novaInformacao = req.body;
        novaInformacao.imagem = (req.file ? req.file.filename : req.body.imagem);
        novaInformacao.video = req.body.video;
        const categorias = req.body.categorias;

        try {
            await database.Receitas.update(novaInformacao, { where: { id: id, usuario_id: req.user.id } });
            const receitaAtualizada = await database.Receitas.findOne({ where: { id: id } });

            if (categorias && categorias.length > 0) {
                receitaAtualizada.setCategorias(categorias);
            }

            return resp.redirect('/receitas/' + id)

        } catch (error) {
            return resp.render('error', { error, message: error.message });
        };
    };


    static async buscaTodasReceitas(req, resp) {
        
        //ordenação das receitas no caderno
        let ordenacao = [[req.query.order]]
        req.query.order ? ordenacao = [[req.query.order]] : ordenacao = [['nome', 'ASC']];
        
        const busca = req.query.q ? req.query.q : '';

        // filtros
        const { categoriaSelecionada } = req.query;
        const whereCondicoes = { 
            usuario_id: req.user.id,
            nome: { [Op.iLike]: '%'+ busca + '%'} 
        };
        if (categoriaSelecionada) {
            whereCondicoes['$categorias.id$'] = categoriaSelecionada;
        }

        //mensagem de receita excluída
        const msgs = req.flash();

        try {
            //conta quantas receitas tem por categoria
            const categorias = await database.Receitas.count({
                include: [{ 
                    model: database.Categorias, 
                    as: 'categorias', 
                    attributes: [], 
                }], 
                group: ['categorias.categoria', 'categorias.id'],
                where: { usuario_id: req.user.id }
            });

            //conta o total de receitas do usuário
            const contagemTotal = await database.Receitas.findAndCountAll({
                where: { usuario_id: req.user.id },
            });

            //busca todas as receitas
            const receitas = await database.Receitas.findAll({ 
                attributes: ['id', 'nome', 'imagem'],
                include: [{ 
                    model: database.Categorias,
                    as: 'categorias', 
                    through: { attributes: [] }, 
                }], 
                where: whereCondicoes, 
                order: ordenacao,
            });

            return resp.render('receitas', { 
                receitas: receitas,
                contagemTotal: contagemTotal.count, 
                categorias: categorias, 
                usuario: req.user.id, 
                categoriaAtiva: categoriaSelecionada,
                paginaAtual: 1,
                paginaAnterior: 1,
                proximaPagina: 2,
                totalPaginas: 5,
                busca: busca,
                mensagem: msgs.receitaExcluida
            });

        } catch (error) {
            return resp.render('error', { error, message: error.message });
        }
    };

    static async buscaUmaReceita(req, resp) {
        const { id } = req.params;

        try {
            const receita = await database.Receitas.findOne({
                where: { 
                    id: id,
                    usuario_id: req.user.id
                },
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

    static async cadastraReceita(req, resp) {
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

    static async deletaReceita(req, resp) {
        const { id } = req.params;
        try {
            await database.Receitas.destroy({ 
                where: { id: Number(id) }
            });

            req.flash('receitaExcluida','Receita excluída com sucesso :)');
            return resp.redirect('/receitas');

        } catch (error) {
            return resp.render('error', { error, message: error.message });
        };
    };
};

module.exports = Receitas;
