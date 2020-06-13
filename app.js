const express = require("express");
const app = express();
const expbhs = require("express-handlebars");
const Handlebars = require("handlebars");
const {
    allowInsecurePrototypeAccess
} = require("@handlebars/allow-prototype-access");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const { mongoDbUrl } = require("./config/database");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const morgan = require('morgan');
const MongoStore = require('connect-mongo')(session);
require('dotenv')

const db = require('./config/database');
const User = require("./models/User");
const Admin = require("./models/Admin");

// Database Configs
mongoose.Promise = global.Promise;
mongoose
    .connect(
        db.mongoDbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
    )
    .then(db => {
        console.log("MongoDB connected successfully");
    })
    .catch(err => console.log("Could not connect to database ", err));

// Statics
app.use(express.static(path.join(__dirname, "public")));

// Handlebars Configs
app.engine(
    "hbs",
    expbhs({
        defaultLayout: "customer",
        extname: "hbs",
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    })
);
app.set("view engine", "hbs");

// Morgan
app.use(morgan('dev'));

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
// Session
app.use(
    session({
        secret: "env-secret-key-here",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
        cookie: { maxAge: 180 * 60 * 1000 }
    })
);

// Method Override
app.use(methodOverride("_method"));

// Connect-flash
app.use(flash());

// Passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    // console.log("admin.id", user.id);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    Admin.findById(id, function(err, admin) {
        const isAdmin = !!admin;

        if (!isAdmin) {
            User.findById(id, function(err, user) {
                done(err, user);
            });
        } else {
            done(err, admin);
        }
    });
});

app.use((req, res, next) => {
    // res.locals.user = req.user || null; 
    // res.locals.admin = req.admin || null;
    res.locals.session = req.session;
    res.locals.login = req.isAuthenticated();
    res.locals.error = req.flash("error");
    res.locals.success_msg = req.flash("success_msg");
    res.locals.info_msg = req.flash("info_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
});

// Load and use routes
const mainRoutes = require("./routes/main/index");
const customerRoutes = require("./routes/customer/index");
const googleRoutes = require("./routes/auth");
const cartRoutes = require("./routes/main/cart");
const adminRoutes = require("./routes/admin/index");
const adminProductRoutes = require("./routes/admin/products");

app.use("/", mainRoutes);
app.use("/customer", customerRoutes);
app.use("/auth", googleRoutes);
app.use("/cart", cartRoutes);
app.use("/admin", adminRoutes);
app.use("/admin/products", adminProductRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Connected to server on ${port}`);
});