require('dotenv').config(); 
const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const sequelize = require('./config/database');

const app = express();
const PORT = 3000;

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
        eq: (a, b) => a === b
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Middleware para disponibilizar o usuário logado para todas as views
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

const authRoutes = require('./routes/authRoutes');
app.use('/', authRoutes);

app.get('/', (req, res) => {
    res.render('home', { title: 'Página Inicial do Mercado' });
});

const setupMiddleware = require('./middleware/setupMiddleware');
const usuarioRoutes = require('./routes/usuarioRoutes');
app.use('/usuarios', setupMiddleware, usuarioRoutes);

const authMiddleware = require('./middleware/authMiddleware');
app.use(authMiddleware);

const fornecedorRoutes = require('./routes/fornecedorRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const vendaRoutes = require('./routes/vendaRoutes');

app.use('/fornecedores', fornecedorRoutes);
app.use('/clientes', clienteRoutes);
app.use('/produtos', produtoRoutes);
app.use('/vendas', vendaRoutes);


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}. Acesse http://localhost:${PORT}`);
});