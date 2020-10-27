const express = require('express');
const port = 3000;
const path = require('path');
const createError = require('http-errors');
const routes = require('./routes');
const app = express();
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts')

const autenticacao = require('../app/config/autenticacao');
autenticacao(app);

app.use(bodyParser.urlencoded({
    extended: true
}));

//precisa ficar depois do bodyparser!! se não da erro no flash
routes(app);

app.use(express.static(path.join(__dirname, 'public')));

app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


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