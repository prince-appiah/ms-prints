const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/passport')(passport);


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', (req, res, next) => {
    passport.authenticate('google', {
        failureRedirect: '/customer/sign-in',
        successRedirect: '/',
        failureFlash: true
    })(req, res, next)
});

// router.get('/verify', (req, res) => {
//     if (req.user) {
//         console.log(req.user);
//     } else {
//         console.log('Not auth');
//     }
// });

router.get('/sign-out', (req, res) => {
    req.logOut();
    res.redirect('/');
});

module.exports = router;