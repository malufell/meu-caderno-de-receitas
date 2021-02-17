const database = require('../models');
const { Op, ValidationError } = require("sequelize");

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
                dicas: "",
                categoriasId: "",
                fonte: "",
                imagemReceita: ""
            });
            
            receita.categorias = [];
            return resp.render('receitas-cadastro', {
                receita: receita,
                categorias: categorias,
                usuario: req.user,
                cadastroFoto: cadastroFoto,
                erroCadastro: false,
            });

        } catch (error) {
            return resp.render('error', { error, message: error.message });
        }
    };
    
    //traz os dados do BD para edição
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

            const ingredientesFormatados = (receita.ingredientes).split("\n")
            const preparoFormatado = (receita.preparo).split("\n")
            const video = ("https://www.youtube.com/embed/" + receita.video);
            const categorias = await database.Categorias.findAll();

            return resp.render('receitas-cadastro', {
                receita: receita,
                ingredientes: ingredientesFormatados,
                preparo: preparoFormatado,
                categorias: categorias,
                video: video,
                usuario: req.user,
                cadastroFoto: receita.cadastroPorFoto,
                erroCadastro: false, 

            });

        } catch (error) {
            return resp.render('error', { error, message: error.message });
        };
    };

    //atualiza os dados alterados no BD    
    static async atualizaReceita(req, resp) {
        const { id } = req.params;
        const tipoCadastro = req.body.tipoCadastro;
        const categorias = req.body.categorias;
        const novaInformacao = req.body;
        novaInformacao.categoriasId = req.body.categorias;

        //validação das categorias
        if(novaInformacao.categoriasId === undefined) {
            novaInformacao.categoriasId = null
        };

        //edição de imagem
        if (req.files.length > 0) {
            if(tipoCadastro) {
                novaInformacao.imagemReceita = req.files.map(obj => obj.path)
            } else { 
                novaInformacao.imagem = req.files.map(obj => obj.path)
            };
        } else if (req.body.removeImagem) {
            if(tipoCadastro) {
                novaInformacao.imagemReceita = [];
            } else { 
                novaInformacao.imagem = [];
            };
        };

        try {
            await database.Receitas.update(novaInformacao, { 
                where: { 
                    id: id, 
                    usuario_id: req.user.id 
                } 
            });

            const receitaAtualizada = await database.Receitas.findOne({ where: { id: id } });

            //atualiza tabela de junção    
            await receitaAtualizada.setCategorias(categorias, { 
                through: { 
                    receitaId: receitaAtualizada.id,
                    categoriaId: categorias, 
                } 
            })
            return resp.redirect('/receitas/' + id)

        } catch (error) {

            if(error instanceof ValidationError) {
                const errors = error.message.split(',');
                const mensagemErro = [];
                errors.forEach(function(error) {
                    if(error == '\nValidation error: Informe o nome da receita' || error == 'Validation error: Informe o nome da receita') {
                        mensagemErro.push(error.replace(/Validation error: /i, ""))
                    } else if(error == 'notNull Violation: Selecione uma ou mais categorias') {
                        mensagemErro.push(error.replace(/notNull Violation: /i, ""))
                    }    
                });

                const categorias = await database.Categorias.findAll();
                const receita = req.body;
                receita.id = id;
                receita.imagem = req.body.nomeImagem ? [req.body.nomeImagem] : null;

                let idCategoriasSelecionadas = req.body.categorias;
                if(!(idCategoriasSelecionadas instanceof Object)) {
                    idCategoriasSelecionadas = [req.body.categorias];
                }

                receita.categorias = idCategoriasSelecionadas.map(function(idCategoria) {
                    return { id: idCategoria } });
               
                return resp.render('receitas-cadastro', { 
                    erroCadastro: mensagemErro, 
                    receita: receita,
                    video: req.body.videoURL,
                    usuario: req.user,
                    cadastroFoto: tipoCadastro,
                    categorias: categorias
                });
            } else {
                return resp.render('error', { error, message: error.message });
            }

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
                where: whereCondicoes,
            });

            // paginação
            const paginaAtual = req.query.paginaAtual ? req.query.paginaAtual : 1;
            const limite = 6;
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

            const receitaNaoEncontrada = (busca && receitas.length == 0);

            return resp.render('receitas', { 
                receitas: receitas,
                contagemTotal: contagemTotal.count, 
                categorias: totalReceitasPorCategoria, 
                usuario: req.user, 
                categoriaAtiva: categoriaSelecionada,
                paginaAtual: paginaAtual,
                paginaAnterior: (paginaAtual == 1) ? paginaAtual : (Number(paginaAtual) - 1),
                proximaPagina: (paginaAtual == totalPaginas) ? paginaAtual : (Number(paginaAtual) + 1),
                totalPaginas: totalPaginas,
                busca: busca,
                mensagem: msgs.receitaExcluida,
                ordenacaoNome: ordenacaoNome,
                ordenacaoDirecao: ordenacaoDirecao,
                usuario: req.user,
                receitaNaoEncontrada: receitaNaoEncontrada,
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

            const ingredientesFormatados = (receita.ingredientes).split("\n")
            const preparoFormatado = (receita.preparo).split("\n")
            const video = ("https://www.youtube.com/embed/" + receita.video);

            //formatação de datas
            function adicionaZero(numero){
                if (numero <= 9) 
                    return "0" + numero;
                else
                    return numero; 
            }
            const dataCriacao = (adicionaZero(receita.createdAt.getDate().toString()) + "/" + (adicionaZero(receita.createdAt.getMonth()+1).toString()) + "/" + receita.createdAt.getFullYear());
            const dataEdicao = (adicionaZero(receita.updatedAt.getDate().toString()) + "/" + (adicionaZero(receita.updatedAt.getMonth()+1).toString()) + "/" + receita.updatedAt.getFullYear());
            
            return resp.render('receitas-id', {
                receita: receita,
                ingredientes: ingredientesFormatados,
                preparo: preparoFormatado,
                video: video,
                usuario: req.user,
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
                imagem: (tipoCadastro) ? [] : req.files.map(obj => obj.path),
                video: req.body.video,
                ingredientes: req.body.ingredientes,
                preparo: req.body.preparo,
                dicas: req.body.dicas,
                imagemReceita: (tipoCadastro) ? req.files.map(obj => obj.path) : [],
                fonte: req.body.fonte,
                cadastroPorFoto: (tipoCadastro) ? true : false,
                usuario_id: req.user.id,
                categoriasId: req.body.categorias
            });

            await receita.addCategorias(categorias, { 
                through: { 
                    receitaId: receita.id,
                    categoriaId: categorias, 
                } 
            })

            return resp.redirect('/receitas/' + receita.id);
            
        } catch (error) {

            if(error instanceof ValidationError) {
                const errors = error.message.split(',');
                const mensagemErro = [];
                errors.forEach(function(error) {
                    if(error == '\nValidation error: Informe o nome da receita' || error == 'Validation error: Informe o nome da receita') {
                        mensagemErro.push(error.replace(/Validation error: /i, ""))
                    } else if(error == 'notNull Violation: Selecione uma ou mais categorias') {
                        mensagemErro.push(error.replace(/notNull Violation: /i, ""))
                    }    
                });

                const categorias = await database.Categorias.findAll();
                const receita = req.body;

                let idCategoriasSelecionadas = req.body.categorias;
                if(!(idCategoriasSelecionadas instanceof Object)) {
                    idCategoriasSelecionadas = [req.body.categorias];
                };

                receita.categorias = idCategoriasSelecionadas.map(function(idCategoria) {
                    return { id: idCategoria } });

                return resp.render('receitas-cadastro', { 
                    erroCadastro: mensagemErro, 
                    receita: receita,
                    video: req.body.video,
                    usuario: req.user,
                    cadastroFoto: tipoCadastro,
                    categorias: categorias
                });
                
            } else {
                return resp.render('error', { error, message: error.message });
            }
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
