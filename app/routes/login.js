const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login', (req, res, next) => {
    const msgs = req.flash();
    const errors = msgs.error || [];
    res.render('login', { errors, msgUsuario: {}, cadastro: msgs.cadastroEfetuado }); 
});


router.post('/login', passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login',
}), (req, res, next) => {
    res.redirect('/dados-cadastro-usuario/' + req.user.id);
})


router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/')
    })
});

module.exports = router;