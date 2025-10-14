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

exports.mostrarFormularioNovo = async (req, res) => {
    try {
        const userCount = await Usuario.count();
        
        res.render('usuarios/form', { 
            title: 'Novo Usuário', 
            isFirstUser: userCount === 0 
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.criarUsuario = async (req, res) => {
    try {
        const { nome_usuario, login, senha } = req.body;
        let { tipo_acesso } = req.body;

        const userCount = await Usuario.count();
        
        if (userCount === 0) {
            tipo_acesso = 'admin';
        }

        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);

        await Usuario.create({
            nome_usuario,
            login,
            senha: senhaHash,
            tipo_acesso
        });

        if (userCount === 0) {
            return res.redirect('/login');
        }

        res.redirect('/usuarios');
    } catch (error) {
        res.status(500).send(error.message);
    }
};