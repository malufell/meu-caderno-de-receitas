const base = require('./base');
const usuarios = require('./usuarios');


module.exports = app => {
    app.use(
        base,
        usuarios
    );
};