const express = require('express');
const router = express.Router();

router.get('/login', (req, res, next) => {
    const errors = req.flash().error || [];
    res.render('login', { errors });
});

module.exports = router;