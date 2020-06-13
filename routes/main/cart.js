const express = require('express');
const router = express.Router();

const Cart = require('../../models/Cart');
const Product = require('../../models/Product');

router.get('/add/:id', (req, res, next) => {
    const productId = req.params.id;

    const cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, (err, product) => {
        if (err) {
            return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;

        req.flash('info_msg', `${product.name} added to cart`)
        // console.log('req.session.cart', req.session.cart);
        res.redirect('/');
    })
});

router.get('/reduce/:id', (req, res, next) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceByOne(productId);
    req.session.cart = cart;

    res.redirect('main/cart');
});

router.get('/increase/:id', (req, res, next) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.increaseByOne(productId);
    req.session.cart = cart;

    res.redirect('main/cart');
});

module.exports = router;