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
        let cadastroFoto = false;
        
        if(req.query.cadastro) {
            cadastroFoto = true;
        };

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
                usuario: req.user.id,
                cadastroFoto: cadastroFoto
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

            const video = ("https://www.youtube.com/embed/" + receita.video);
            const categorias = await database.Categorias.findAll();

            return resp.render('receitas-cadastro', {
                receita: receita,
                categorias: categorias,
                video: video,
                usuario: req.user.id,
                cadastroFoto: false
            });

        } catch (error) {
            return resp.render('error', { error, message: error.message });
        };
    };

    static async atualizaReceita(req, resp) {
        const { id } = req.params;
        const tipoCadastro = req.body.tipoCadastro;
        const novaInformacao = req.body;
        novaInformacao.video = req.body.video;
        const categorias = req.body.categorias;
        
        if (req.files.length > 0) {
            if(tipoCadastro) {
                novaInformacao.imagemReceita = req.files.map(obj => obj.filename)
            } else { 
                novaInformacao.imagem = req.files.map(obj => obj.filename)
            }
        };

        try {
            await database.Receitas.update(novaInformacao, { 
                where: { 
                    id: id, 
                    usuario_id: req.user.id 
                } 
            });

            const receitaAtualizada = await database.Receitas.findOne({
                 where: { 
                     id: id 
                    } 
                });

            //atualiza tabela de junção    
            await receitaAtualizada.addCategorias(categorias, { 
                through: { 
                    receitaId: receitaAtualizada.id,
                    categoriaId: categorias, 
                } 
            })


            return resp.redirect('/receitas/' + id)

        } catch (error) {
            return resp.render('error', { error, message: error.message });
        };
    };

    static async buscaTodasReceitas(req, resp) {
        
        // ordenação das receitas no caderno
        let ordenacao = [[req.query.order]];
        req.query.order ? ordenacao = [[req.query.order]] : ordenacao = [['nome', 'ASC']];
     
        let ordenacaoNome;
        let ordenacaoDirecao;
        
        if(ordenacao[0][0][0].length == 1) {
            ordenacaoNome = 'nome'
            ordenacaoDirecao = 'ASC'
        } else {
            ordenacaoNome = ordenacao[0][0][0]
            ordenacaoDirecao = ordenacao[0][0][1]      
        };
        
        // filtro - busca
        const busca = req.query.q ? req.query.q : '';
        const whereCondicoes = { 
            usuario_id: req.user.id,
            nome: { [Op.iLike]: '%'+ busca + '%'} 
        };
        
        // filtro - seleção de categoria
        const { categoriaSelecionada } = req.query;
        const whereCategoria = {};
            if (categoriaSelecionada) {
                whereCategoria['$categoriaId$'] = categoriaSelecionada;
            }

        // mensagem de receita excluída
        const msgs = req.flash();

        try {
            // conta quantas receitas tem por categoria
            const totalReceitasPorCategoria = await database.Receitas.count({
                include: [{
                    model: database.Categorias,
                    as: 'categorias',
                    attributes: ['categoria', 'id'],
                }],
                group: ['categorias.id', 'categorias.categoria'],
                where: { usuario_id: req.user.id }
            });

            // conta o total de receitas do usuário
            const contagemTotal = await database.Receitas.findAndCountAll({
                where: { usuario_id: req.user.id },
            });

            // paginação
            const paginaAtual = req.query.paginaAtual ? req.query.paginaAtual : 1;
            const limite = 4;
            const offset = paginaAtual == 1 ? 0 : (Number(paginaAtual) - 1) * limite; 
            let totalPaginas = Math.ceil(contagemTotal.count / limite);
            const categoriasComRegitros = totalReceitasPorCategoria.map(obj => obj.id);

            //total de páginas por categoria
            if(categoriaSelecionada) {
                for(let i=0; i < categoriasComRegitros.length; i++){
                    if(categoriaSelecionada == categoriasComRegitros[i]){
                        totalPaginas = Math.ceil(totalReceitasPorCategoria[i].count / limite)
                    }
                }
            };

            // busca todas as receitas
            const receitas = await database.Receitas.findAll({ 
                attributes: ['id', 'nome', 'imagem', 'imagemReceita', 'createdAt', 'updatedAt'],
                include: [{ 
                    model: database.ReceitasCategorias, 
                    as: 'ReceitasCategorias',
                    attributes: ['categoriaId'],
                    where: whereCategoria
                }], 
                where: whereCondicoes, 
                order: ordenacao,
                limit: limite,
                offset: offset,
            });

            return resp.render('receitas', { 
                receitas: receitas,
                contagemTotal: contagemTotal.count, 
                categorias: totalReceitasPorCategoria, 
                usuario: req.user.id, 
                categoriaAtiva: categoriaSelecionada,
                paginaAtual: paginaAtual,
                paginaAnterior: (paginaAtual == 1) ? paginaAtual : (Number(paginaAtual) - 1),
                proximaPagina: (paginaAtual == totalPaginas) ? paginaAtual : (Number(paginaAtual) + 1),
                totalPaginas: totalPaginas,
                busca: busca,
                mensagem: msgs.receitaExcluida,
                ordenacaoNome: ordenacaoNome,
                ordenacaoDirecao: ordenacaoDirecao
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

            const video = ("https://www.youtube.com/embed/" + receita.video);
            const dataCriacao = receita.createdAt.toLocaleDateString().split('-').reverse().join("/");
            const dataEdicao = receita.updatedAt.toLocaleDateString().split('-').reverse().join("/");
            
            return resp.render('receitas-id', {
                receita: receita,
                video: video,
                usuario: req.user.id,
                dataCriacao: dataCriacao,
                dataEdicao: dataEdicao
            });

        } catch (error) {
            return resp.render('error', { error, message: error.message });
        }
    };

    static async cadastraReceita(req, resp) {
        const categorias = req.body.categorias;
        const tipoCadastro = req.body.tipoCadastro;

        try {
            const receita = await database.Receitas.create({
                nome: req.body.nome,
                imagem: (tipoCadastro) ? [] : req.files.map(obj => obj.filename),
                video: req.body.video,
                ingredientes: req.body.ingredientes,
                preparo: req.body.preparo,
                dicas: req.body.dicas,
                imagemReceita: (tipoCadastro) ? req.files.map(obj => obj.filename) : [],
                usuario_id: req.user.id,
                categorias: req.body.categorias,
            });

            await receita.addCategorias(categorias, { 
                through: { 
                    receitaId: receita.id,
                    categoriaId: categorias, 
                } 
            })

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
