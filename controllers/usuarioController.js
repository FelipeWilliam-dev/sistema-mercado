const Usuario = require('../models/Usuario');

exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({ raw: true });
        res.render('usuarios/lista', { usuarios, title: 'Lista de Usuários' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.mostrarFormularioNovo = (req, res) => {
    res.render('usuarios/form', { title: 'Novo Usuário' });
};

exports.criarUsuario = async (req, res) => {
    try {
        
        await Usuario.create(req.body);
        res.redirect('/usuarios');
    } catch (error) {
        res.status(500).send(error.message);
    }
};