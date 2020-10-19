const bodyParser = require('body-parser');
const base = require('./base');
const usuarios = require('./usuarios');
const login = require('./login');

module.exports = app => {
    app.use(
        bodyParser.json(),
        base,
        usuarios,
        login
    );
};