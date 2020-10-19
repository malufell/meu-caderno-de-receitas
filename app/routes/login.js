const express = require('express');
const router = express.Router();
const Login = require('../controllers/login-controller')

router.get('/login', (req, res, next) => {
    res.render('login', {alert: {}});
});

router.post('/login', Login.buscaPorId);

module.exports = router;