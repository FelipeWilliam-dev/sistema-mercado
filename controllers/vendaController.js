const sequelize = require('../config/database');
const Venda = require('../models/Venda');
const ItemVenda = require('../models/ItemVenda');
const Produto = require('../models/Produto');
const Cliente = require('../models/Cliente');
const Usuario = require('../models/Usuario'); 
const { Op } = require('sequelize'); 


exports.listarVendas = async (req, res) => {
    try {
        const vendas = await Venda.findAll({
            include: [
                { model: Cliente },
                { model: Usuario } 
            ],
            raw: true,
            nest: true
        });
        res.render('vendas/lista', { vendas, title: 'Histórico de Vendas' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.mostrarFormularioNovaVenda = async (req, res) => {
    try {
        const clientes = await Cliente.findAll({ raw: true });
        const produtos = await Produto.findAll({ raw: true });
        res.render('vendas/form', {
            title: 'Registrar Nova Venda',
            clientes,
            produtos
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};



exports.registrarVenda = async (req, res) => {
    
    const t = await sequelize.transaction();

    try {
        const { id_cliente, forma_pagamento, produtos } = req.body;
        let valor_total = 0;

        
        const produtosArray = Array.isArray(produtos) ? produtos : [produtos];
        
        
        const itensParaVenda = [];
        for (const prodId of produtosArray) {
            
            const quantidade = parseInt(req.body[`qtd_${prodId}`], 10);
            if (quantidade > 0) {
                const produto = await Produto.findByPk(prodId, { transaction: t });
                if (!produto || produto.qtd_estoque < quantidade) {
                    throw new Error(`Estoque insuficiente para o produto: ${produto.nome_prod}`);
                }
                
                const preco_unitario = produto.preco_prod;
                valor_total += preco_unitario * quantidade;

                itensParaVenda.push({
                    id_produto: prodId,
                    qtd_itens: quantidade,
                    preco_unitario_venda: preco_unitario
                });
            }
        }

        if (itensParaVenda.length === 0) {
            throw new Error('Nenhum produto selecionado para a venda.');
        }

        
        const novaVenda = await Venda.create({
            id_cliente,
            id_usuario: req.session.user.id, 
            valor_total,
            forma_pagamento
        }, { transaction: t });


        for (const item of itensParaVenda) {
            item.id_venda = novaVenda.id_venda;
            await ItemVenda.create(item, { transaction: t });


            await Produto.update(
                { qtd_estoque: sequelize.literal(`qtd_estoque - ${item.qtd_itens}`) },
                { where: { id_prod: item.id_produto }, transaction: t }
            );
        }


        await t.commit();
        res.redirect('/vendas');

    } catch (error) {

        await t.rollback();
        console.error("Erro ao registrar venda:", error);
        res.status(500).send(error.message);
    }
};