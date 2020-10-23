const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login', (req, res, next) => {
    const errors = req.flash().error || [];
    res.render('login', { errors });
});


router.post('/login', passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login',
}), (req, res, next) => {
    res.redirect('/dados-cadastro/' + req.user.email);
})


router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/')
    })
});


module.exports = router;