module.exports = {
    userIsLoggedIn: function(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        req.flash('info_msg', 'You are already logged in');
        res.redirect('/');
    },

    userIsNotLoggedIn: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Sorry, you are not logged in.');
        res.redirect('/customer/sign-in');
    },

    adminIsLoggedIn: function(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        req.flash('info_msg', 'You are already logged in');
        res.redirect('/admin');
    },

    adminIsNotLoggedIn: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'You are not logged in. Please do so.');
        res.redirect('/admin/sign-in');
    }

    // ensureAdmin: function(req, res, next) {
    //     if (req.isAuthenticated()) {
    //         return next();
    //     }

    //     req.flash('error_msg', 'You are not authorized.');
    //     res.redirect('/customer/sign-in');
    // }
}