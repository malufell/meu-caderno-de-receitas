const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path =  require('path');

//para receber informações HTML + json
app.use(bodyParser.urlencoded({
    extended: true
}));

// set the view engine to ejs
app.set('view engine', 'ejs');

// provide the complete path of the views folder  
app.set('views', path.resolve('app','views'));

// index page
app.get('/', function(req, res) {
    res.render('pages/index');
});

app.listen(3000, () => console.log('servidor rodando na porta 3000'));