const express = require('express');
const port = 3000;
const path = require('path');
const createError = require('http-errors');
const routes = require('./routes');
const app = express();
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const passport = require('passport')
const Strategy = require('passport-local').Strategy;
const database = require('./models')
const sessao = require('express-session');
const flash = require('connect-flash')

app.use(sessao({
    secret: "aguiareal",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    genid: function (req) {
        return uuidv4();
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

routes(app);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//configuração da autenticação e seção
passport.use('local', new Strategy(
    {
        usernameField: 'email',
        passwordField: 'senha',
    },
    function (email, senha, done) {
        database.Usuarios.findOne({ where: { email: email } }).then(function (usuario) {
            if (!usuario) {
                return done(null, false, { message: 'usuário não encontrado' });
            }
            if (usuario.senha != senha) {

                return done(null, false, { message: 'senha inválida' });
            }
            console.log('tudo certo')
            return done(null, usuario)
        })
    }
))

passport.serializeUser(function (usuario, done) {
    done(null, usuario.id);
});

passport.deserializeUser(function (id, done) {
    database.Usuarios.findOne({ where: { id: id } }).then(function (usuario) {
        done(null, usuario);
    });
});

app.post('/login', passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login',
}), (req, res, next) => {
    res.redirect('/dados-cadastro/' + req.user.email);
})

app.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/')
    })
});

app.get('/autenticada', function (req, res, next) {
    if (req.isAuthenticated()) {
        res.render('autenticada');
    } else {
        res.redirect('/login');
    }
});

//erros
app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(`${port}`, () => console.log(`servidor rodando na porta ${port}`))