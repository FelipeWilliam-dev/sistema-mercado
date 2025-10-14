const Produto = require('../models/Produto');
const Fornecedor = require('../models/Fornecedor'); 


exports.listarProdutos = async (req, res) => {
    try {
        const produtos = await Produto.findAll({
            include: [{ model: Fornecedor }], 
            raw: true,
            nest: true 
        });
        res.render('produtos/lista', { produtos: produtos, title: 'Lista de Produtos' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.mostrarFormularioNovo = async (req, res) => {
    try {
        const fornecedores = await Fornecedor.findAll({ raw: true });
        res.render('produtos/form', { title: 'Novo Produto', fornecedores: fornecedores });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.criarProduto = async (req, res) => {
    try {
        await Produto.create(req.body);
        res.redirect('/produtos');
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.mostrarFormularioEditar = async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id, { raw: true });
        const fornecedores = await Fornecedor.findAll({ raw: true });
        res.render('produtos/form', {
            title: 'Editar Produto',
            produto: produto,
            fornecedores: fornecedores
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.atualizarProduto = async (req, res) => {
    try {
        await Produto.update(req.body, { where: { id_prod: req.params.id } });
        res.redirect('/produtos');
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.excluirProduto = async (req, res) => {
    try {
        await Produto.destroy({ where: { id_prod: req.params.id } });
        res.redirect('/produtos');
    } catch (error) {
        res.status(500).send(error.message);
    }
};