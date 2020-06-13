const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const csurf = require('csurf');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// const csrfProtection = csurf();

const Admin = require("../../models/Admin");
const { adminIsLoggedIn, adminIsNotLoggedIn } = require('../../helpers/auth');

// router.use(csrfProtection);

router.all("/*", (req, res, next) => {
    req.app.locals.layout = "admin";
    next();
});

// GET - ADMIN HOME PAGE 
router.get("/", (req, res) => {
    // console.log("admin index called.", req.user && req.user._id);
    res.render("admin/index");
});

// GET - REGISTER PAGE
router.get("/sign-up", adminIsLoggedIn, (req, res) => {
    res.render("admin/sign-up");
});

// GET - LOGIN PAGE
router.get("/sign-in", adminIsLoggedIn, (req, res) => {
    res.render("admin/sign-in");
});

// GET - SIGN OUT ROUTE
router.get("/sign-out", adminIsNotLoggedIn, (req, res) => {
    req.logOut();
    req.flash("success_msg", "You are logged out.");
    res.redirect("/admin/sign-in");
});

// POST - REGISTER PAGE
router.post("/sign-up", (req, res) => {
    /* 
        Check for existing admin, if true return to admin login page 
        else create a new Admin
    */
    Admin.findOne({ emailAddress: req.body.emailAddress }).then(existingAdmin => {
        if (!existingAdmin) {
            // Create new instance for Admin
            const admin = new Admin({
                emailAddress: req.body.emailAddress,
                password: req.body.password
            });
            // Password Hashing
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(admin.password, salt, (err, hash) => {
                    admin.password = hash;
                    // console.log(admin);
                    admin
                        .save()
                        .then(savedAdmin => {
                            req.flash(
                                "success_msg",
                                "Registration successful. Please log in!"
                            );
                            res.redirect("/admin/sign-in");
                        })
                        .catch(err => {
                            console.log("Could not register admin", err);
                        });
                });
            });
        } else {
            req.flash("error_msg", "Admin already exists. Please log in.");
            res.redirect("/admin/sign-in");
        }
    });
});

// Passport Config before firing login route
passport.use(
    new LocalStrategy({ usernameField: "emailAddress" },
        (emailAddress, password, done) => {
            Admin.findOne({ emailAddress: emailAddress }).then(admin => {
                // console.log("admin", admin);
                // Display error message when admin is not found
                if (!admin) {
                    return done(null, false, {
                        message: "Please enter a valid email address."
                    });
                }

                bcrypt.compare(password, admin.password, (err, matched) => {
                    if (err) throw err;

                    if (matched) {
                        return done(null, admin);
                    } else {
                        return done(null, false, {
                            message: "Incorrect password. Please try again."
                        });
                    }
                });
            });
        }
    )
);

// POST - LOGIN PAGE
router.post("/sign-in", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/admin",
        failureRedirect: "/admin/sign-in",
        failureFlash: true
    })(req, res, next);
});

module.exports = router;