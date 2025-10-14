const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

exports.mostrarFormularioLogin = (req, res) => {
    res.render('auth/login', { title: 'Login' });
};

exports.login = async (req, res) => {
    try {
        const { login, senha } = req.body;
        const usuario = await Usuario.findOne({ where: { login: login } });

        if (!usuario) {
            return res.render('auth/login', { error: 'Usuário não encontrado.' });
        }

        
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            
            return res.render('auth/login', { error: 'Senha incorreta.' });
        }

       
        req.session.user = {
            id: usuario.id_usuario,
            nome: usuario.nome_usuario,
            tipo_acesso: usuario.tipo_acesso
        };
        
        
        res.redirect('/');

    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Erro ao fazer logout.');
        }
        res.redirect('/login');
    });
};