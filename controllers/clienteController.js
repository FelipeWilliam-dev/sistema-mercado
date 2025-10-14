const Cliente = require('../models/Cliente');

exports.listarClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll({ raw: true }); 
        res.render('clientes/lista', { clientes: clientes, title: 'Lista de Clientes' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.mostrarFormularioNovo = (req, res) => {
    res.render('clientes/form', { title: 'Novo Cliente' });
};

exports.criarCliente = async (req, res) => {
    try {
        await Cliente.create(req.body);
        res.redirect('/clientes');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.mostrarFormularioEditar = async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        res.render('clientes/form', { cliente: cliente.toJSON(), title: 'Editar Cliente' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.atualizarCliente = async (req, res) => {
    try {
        await Cliente.update(req.body, { where: { id_cliente: req.params.id } });
        res.redirect('/clientes');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.excluirCliente = async (req, res) => {
    try {
        await Cliente.destroy({ where: { id_cliente: req.params.id } });
        res.redirect('/clientes');
    } catch (error) {
        res.status(500).send(error.message);
    }
};