const database = require('../models');
const { Op, ValidationError } = require("sequelize");


class ReceitasExemplo {

    static async buscaTodasReceitas(req, resp) {
        const usuario = 3;

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
            usuario_id: usuario,
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
                where: { usuario_id: usuario }
            });

            // conta o total de receitas do usuário
            const contagemTotal = await database.Receitas.findAndCountAll({
                where: { usuario_id: usuario },
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



            return resp.render('exemplo-receitas', { 
                receitas: receitas,
                contagemTotal: contagemTotal.count, 
                categorias: totalReceitasPorCategoria, 
                usuario: usuario, 
                categoriaAtiva: categoriaSelecionada,
                paginaAtual: paginaAtual,
                paginaAnterior: (paginaAtual == 1) ? paginaAtual : (Number(paginaAtual) - 1),
                proximaPagina: (paginaAtual == totalPaginas) ? paginaAtual : (Number(paginaAtual) + 1),
                totalPaginas: totalPaginas,
                busca: busca,
                mensagem: msgs.receitaExcluida,
                ordenacaoNome: ordenacaoNome,
                ordenacaoDirecao: ordenacaoDirecao,
            });

        } catch (error) {
            return resp.render('error', { error, message: error.message });
        }
    };

    static async buscaUmaReceita(req, resp) {
        const usuario = 3;
        const { id } = req.params;
        
        try {
            const receita = await database.Receitas.findOne({
                where: { 
                    id: id,
                    usuario_id: usuario
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
            };
            const dataCriacao = (adicionaZero(receita.createdAt.getDate().toString()) + "/" + (adicionaZero(receita.createdAt.getMonth()+1).toString()) + "/" + receita.createdAt.getFullYear());
            const dataEdicao = (adicionaZero(receita.updatedAt.getDate().toString()) + "/" + (adicionaZero(receita.updatedAt.getMonth()+1).toString()) + "/" + receita.updatedAt.getFullYear());
            
            
            return resp.render('exemplo-receitas-id', {
                receita: receita,
                ingredientes: ingredientesFormatados,
                preparo: preparoFormatado,
                video: video,
                usuario: usuario,
                dataCriacao: dataCriacao,
                dataEdicao: dataEdicao
            });

        } catch (error) {
            return resp.render('error', { error, message: error.message });
        }
    };
}

module.exports = ReceitasExemplo;