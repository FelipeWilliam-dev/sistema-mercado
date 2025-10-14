const sequelize = require('./config/database');
const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

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

app.get('/', (req, res) => {
    // res.send('<h1> Servidor funcionando.</h1>');
    res.render('home', { title: 'Página Inicial do Mercado' });
});



app.get('/', (req, res) => {
    res.render('home', { title: 'Página Inicial do Mercado' });
});

// rotas
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