const express = require('express');
const router = express.Router();

const Product = require('../../models/Product');
const Cart = require('../../models/Cart');

// // Override url and set all routes to '/'
// router.all('/*', (req, res, next) => {
//     req.app.locals.layout = 'customer';
//     next();
// });

// GET - HOME PAGE === ALL PRODUCTS WILL BE DISPLAYED HERE
router.get('/', (req, res) => {
    Product
        .find({})
        .then(products => {
            res.render('main/index', { products: products, title: 'M & S Prints' });
        });
});

// GET - View Single Product
router.get('/products/:id', (req, res) => {
    Product.findById({ _id: req.params.id })
        .populate('admins')
        .then(product => {
            res.render('main/single-product', { product: product });
        });
});

// Cart Page
router.get('/cart', (req, res) => {
    if (!req.session.cart) {
        res.redirect('/', { products: null });
    }

    let cart = new Cart(req.session.cart);

    res.render('main/cart', {
        title: 'My Cart',
        products: cart.generateArray(),
        totalPrice: cart.totalPrice
    });
}); 

// Checkout Page
router.get('/checkout', (req, res) => {
    if (!req.session.cart) {
        return res.redirect('main/cart');
    }
    let cart = new Cart(req.session.cart);
    res.render('main/checkout', { title: 'Checkout', totalPrice: cart.totalPrice });
});


// Thank you page
router.get('/thank-you', (req, res) => {
    res.render('main/thank-you', { title: 'Order Complete' });
});

module.exports = router;