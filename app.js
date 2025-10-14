const express = require('express');
const sequelize = require('./config/database');
require('dotenv').config();
const { engine } = require('express-handlebars');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = 3000;

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: { 
        eq: function (a, b) {
            return a === b;
        }
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

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

app.get('/', (req, res) => {
    // res.send('<h1> Servidor funcionando.</h1>');
    res.render('home', { title: 'Página Inicial do Mercado' });
});



app.get('/', (req, res) => {
    res.render('home', { title: 'Página Inicial do Mercado' });
});

const authRoutes = require('./routes/authRoutes');
app.use('/', authRoutes); 

const authMiddleware = require('./middleware/authMiddleware');
//app.use(authMiddleware);

// rotas
const fornecedorRoutes = require('./routes/fornecedorRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const vendaRoutes = require('./routes/vendaRoutes');



app.use('/fornecedores', fornecedorRoutes);
app.use('/clientes', clienteRoutes);
app.use('/produtos', produtoRoutes);
app.use('/vendas', vendaRoutes);

const adminAuthMiddleware = require('./middleware/adminAuthMiddleware');
const usuarioRoutes = require('./routes/usuarioRoutes');
app.use('/usuarios', adminAuthMiddleware, usuarioRoutes);



app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}. Acesse http://localhost:${PORT}`);
});