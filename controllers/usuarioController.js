const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

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
        
        const { nome_usuario, login, senha, tipo_acesso } = req.body;

        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);

        await Usuario.create({
            nome_usuario,
            login,
            senha: senhaHash, 
            tipo_acesso
        });
        res.redirect('/usuarios');
    } catch (error) {
        res.status(500).send(error.message);
    }
};