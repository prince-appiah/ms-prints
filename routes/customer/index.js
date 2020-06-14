const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../../models/User');
// const Product = require('../../models/Product');
const { userIsLoggedIn, userIsNotLoggedIn } = require('../../helpers/auth');


// Override url and set all routes to '/'
router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'customer';
    next();
});

router.get('/', (req, res) => {
    res.render('main/index');
});

// GET - REGISTER PAGE
router.get('/sign-up', userIsLoggedIn, (req, res) => {
    res.render('customer/sign-up', { title: 'Customer - Register' });
});

// GET - LOGIN PAGE
router.get('/sign-in', userIsLoggedIn, (req, res) => {
    res.render('customer/sign-in', { title: 'Customer - Login' });
});

// GET - SIGN OUT ROUTE
router.get('/sign-out', userIsNotLoggedIn, (req, res) => {
    req.logOut();

    req.flash('success_msg', 'You are logged out.');
    res.redirect('/customer/sign-in');
});

// POST - REGISTER PAGE
router.post('/sign-up', (req, res) => {
    /* 
        Check for existing user, if true return to user login page
        else create a new User
    */
    User.findOne({ emailAddress: req.body.emailAddress }).then(existingUser => {
        if (!existingUser) {
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phoneNumber: req.body.phoneNumber,
                emailAddress: req.body.emailAddress,
                password: req.body.password
            });
            // Password Hashing 
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(user.password, salt, (err, hash) => {
                    user.password = hash;
                    // console.log(user);
                    user.save().then(savedUser => {
                        req.flash('success_msg', 'Registration successful. Please log in!');
                        res.redirect('/customer/sign-in');
                    }).catch(err => {
                        console.log('Could not register user', err);
                    });
                });
            });
        } else {
            req.flash('error_msg', 'User already exists. Please log in.');
            res.redirect('/customer/sign-in');
        }
    });
});

// Passport Config before firing login route
passport.use('local.customer',
    new LocalStrategy({ usernameField: 'emailAddress' }, (emailAddress, password, done) => {
        User.findOne({ emailAddress: emailAddress }).then(user => {
            // console.log('user', user);
            // Display error message when user is not found
            if (!user) {
                return done(null, false, { message: 'Please enter a valid email address' });
            }

            bcrypt.compare(password, user.password, (err, matched) => {
                if (err) throw err;

                if (matched) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Incorrect password. Please try again.' });
                }
            });
        });
    }));

// POST - LOGIN PAGE
router.post('/sign-in', (req, res, next) => {
    passport.authenticate('local.customer', {
        successRedirect: '/',
        failureRedirect: '/customer/sign-in',
        failureFlash: true
    })(req, res, next)
});


module.exports = router;