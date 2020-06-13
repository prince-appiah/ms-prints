const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/passport')(passport);

// Override url and set all routes to '/'
// router.all('/*', (req, res, next) => {
//     req.app.locals.layout = 'customer';
//     next();
// });

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email']}));

router.get('/google/callback', 
  passport.authenticate('google', 
    { failureRedirect: '/customer/sign-in' }), (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
});

module.exports = router;