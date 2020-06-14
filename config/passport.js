const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./google');
const User = require('../models/User');

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback",
        proxy: true
    }, (accessToken, refreshToken, profile, done) => {
        // console.log(accessToken);
        // console.log(profile);
        const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));

        // Check for existing user
        User.findOne({ googleID: profile.id }).then(user => {
            if (user) {
                // Return user
                done(null, user);
            } else {
                // Create user
                const newUser = new User({
                    googleID: profile.id,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    emailAddress: profile.emails[0].value,
                    image: image
                });
                newUser.save()
                    .then(newUser => done(null, newUser))
                    .catch(err => console.log(err));
            }
        })
    }));
};