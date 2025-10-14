
module.exports = (req, res, next) => {

    if (!req.session || !req.session.user) {
        return res.redirect('/login');
    }

    if (req.session.user.tipo_acesso === 'admin') {

        return next();
    } else {

        return res.status(403).send('Acesso negado. Você não tem permissão para ver esta página.');
    }
};