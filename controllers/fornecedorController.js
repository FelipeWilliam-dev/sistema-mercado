const Fornecedor = require('../models/Fornecedor');

exports.listarFornecedores = async (req, res) => {
    try {
        const fornecedores = await Fornecedor.findAll({ raw: true });
        res.render('fornecedores/lista', { fornecedores: fornecedores, title: 'Lista de Fornecedores' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar fornecedores.');
    }
};

exports.mostrarFormularioNovo = (req, res) => {
    res.render('fornecedores/form', { title: 'Novo Fornecedor' });
};

// CREATE: Salvar novo fornecedor no banco
exports.criarFornecedor = async (req, res) => {
    try {
        await Fornecedor.create(req.body);
        res.redirect('/fornecedores');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao criar fornecedor.');
    }
};

exports.mostrarFormularioEditar = async (req, res) => {
    try {
        const fornecedor = await Fornecedor.findByPk(req.params.id);
        if (fornecedor) {
            res.render('fornecedores/form', { fornecedor: fornecedor.toJSON(), title: 'Editar Fornecedor' });
        } else {
            res.status(404).send('Fornecedor não encontrado.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar fornecedor.');
    }
};

exports.atualizarFornecedor = async (req, res) => {
    try {
        await Fornecedor.update(req.body, {
            where: { id_fornecedor: req.params.id }
        });
        res.redirect('/fornecedores');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao atualizar fornecedor.');
    }
};

exports.excluirFornecedor = async (req, res) => {
    try {
        await Fornecedor.destroy({
            where: { id_fornecedor: req.params.id }
        });
        res.redirect('/fornecedores');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao excluir fornecedor.');
    }
};