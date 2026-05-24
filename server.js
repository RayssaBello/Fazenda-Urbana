const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Usuario = require('./models/Usuario');
const Pedido = require('./models/Pedido');

const app = express();
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/fazendaurbana')
.then(() => console.log('MongoDB conectado'))
.catch((err) => console.log(err));


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

app.post('/cadastro', async (req, res) => {

    try {

        const { nome, endereco, senha } = req.body;

        const novoUsuario = new Usuario({
            nome,
            endereco,
            senha
        });

        await novoUsuario.save();

        console.log('Usuário salvo no MongoDB');

        res.redirect('/login');

    } catch (erro) {

        console.log(erro);

        res.send(erro.message);

    }

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

app.delete('/produtos/:id', (req, res) => {

    const id = req.params.id;

    res.json({
        mensagem: `Produto ${id} excluído`
    });

});

app.put('/produtos/:id', (req, res) => {

    const id = req.params.id;

    const { nome } = req.body;

    res.json({
        mensagem: `Produto ${id} atualizado para ${nome}`
    });

});

app.post('/pedido', async (req, res) => {

    try {

        const { produtos } = req.body;

        const novoPedido = new Pedido({

            usuario: req.session.usuario,
            produtos

        });

        await novoPedido.save();

        res.json({
            mensagem: 'Pedido enviado com sucesso!'
        });

    } catch (erro) {

        console.log(erro);

        res.status(500).json({
            mensagem: 'Erro ao enviar pedido'
        });

    }

});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});