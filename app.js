const sequelize = require('./config/database');
const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();
const PORT = 3000;

app.engine('hbs', engine({
    extname: '.hbs', 
    defaultLayout: 'main' 
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

const fornecedorRoutes = require('./routes/fornecedorRoutes');


app.use('/fornecedores', fornecedorRoutes); 



app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}. Acesse http://localhost:${PORT}`);
});