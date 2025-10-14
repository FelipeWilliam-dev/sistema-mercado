const Usuario = require('../models/Usuario');

module.exports = async (req, res, next) => {
    try {
        const userCount = await Usuario.count();

        if (userCount === 0) {
            return next();
        }
        if (req.session && req.session.user && req.session.user.tipo_acesso === 'admin') {
            return next();
        }
        return res.status(403).send('Acesso negado. Apenas administradores podem gerenciar usuários.');

    } catch (error) {
        res.status(500).send('Erro interno do servidor ao verificar permissões.');
    }
};