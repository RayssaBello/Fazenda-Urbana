const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;

// Configurações
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.use(session({
    secret: 'fazenda',
    resave: false,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');


function verificarAutenticacao(req, res, next) {

    if (req.session.usuario) {
        next();
    } else {
        res.redirect('/login');
    }

}


// ROTAS

// Páginas
app.get('/', (req, res) => {
    res.render('index');
});


app.get('/contato', (req, res) => {
    res.render('contato');
});


app.get('/impactos', (req, res) => {
    res.render('impactos');
});


app.get('/parceiros', (req, res) => {
    res.render('parceiros');
});


app.get('/cadastro', (req, res) => {
    res.render('cadastro');
});

app.post('/cadastro', (req, res) => {

    const { nome, senha, endereco } = req.body;

    console.log(nome, senha, endereco);

    res.redirect('/login');

});


app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {

    const { nome, senha } = req.body;

    if (nome && senha) {

        req.session.usuario = nome;

        return res.redirect('/produtos');
    }

    res.send('Login inválido');

});


app.get('/produtos', verificarAutenticacao, (req, res) => {

    const produtos = [
        { id: 1, nome: 'Alface' },
        { id: 2, nome: 'Tomate' },
        { id: 3, nome: 'Cenoura' },
        { id: 4, nome: 'Rúcula' },
        { id: 5, nome: 'Pimentão' },
        { id: 6, nome: 'Pepino' },
        { id: 7, nome: 'Abobrinha' },
        { id: 8, nome: 'Berinjela' },
        { id: 9, nome: 'Espinafre' },
        { id: 10, nome: 'Couve' },
        { id: 11, nome: 'Salsa' },
        { id: 12, nome: 'Cebolinha' }
    ];

    res.render('produtos', {
        produtos: produtos,
        usuario: req.session.usuario
    });

});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});