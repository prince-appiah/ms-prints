const express = require("express");
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toDateString() + ' - ' + file.originalname)
    }
});
const upload = multer({ storage: storage });

//const { isAdmin } = require('../../helpers/auth');
const Product = require("../../models/Product");
const Admin = require("../../models/Admin");
// const { adminIsNotLoggedIn } = require('../../helpers/auth');

router.all("/*", (req, res, next) => {
    req.app.locals.layout = "admin";
    next();
});
 
// GET - ALL PRODUCTS
router.get("/all", (req, res) => {
    //isAdmin, 
    Product.find({}).then(products => {
        res.render("admin/index", { products: products, title: 'Dashboard' });
    });
});

// GET - CREATE PRODUCT
router.get("/create", (req, res) => {
    //isAdmin,
    res.render("admin/products/create-product", { title: 'Add Product' });
});

// GET - EDIT PRODUCT
router.get("/edit/:id", (req, res) => {
    // const loggedInUser = req.user || {};
    // const adminId = loggedInUser._id;

    Product.findOne({ id: req.params.id }).then(product => {
        // const isOwnerOfProduct = product.adminId === adminId;

        // if (!isOwnerOfProduct) {
        //     req.flash("error_msg", `You do not own this product`);
        // }

        res.render("admin/products/edit-product", { product: product, title: 'Update Product' });
    });
});

// POST - CREATE NEW PRODUCT
router.post("/create", upload.single('image'), (req, res) => {
    // console.log('body', req.body);

    const loggedInUser = req.user || {};
    const adminId = loggedInUser._id;

    const product = new Product({
        adminId,
        image: req.file.filename,
        name: req.body.name,
        price: req.body.price,
        size: req.body.size,
        quantity: req.body.quantity,
        description: req.body.description
    });

    product.save().then(savedProduct => {
            req.flash("success_msg", `${savedProduct.name} was added successfully.`);
            res.redirect("/admin/products/all");
        })
        .catch(error => {
            console.log("Could not save new product", error);
        });
});

// POST/PUT - EDIT PRODUCT
router.put("/edit/:id", (req, res) => {
    Product.findOne({ id: req.params.id }).then(product => {
        // product.image = req.file.filename;
        product.name = req.body.name;
        product.price = req.body.price;
        product.size = req.body.size;
        product.quantity = req.body.quantity;
        product.description = req.body.description;

        product.save().then(updatedProduct => {
            req.flash(
                "success_msg",
                `${updatedProduct.name} was updated successfully.`
            );
            res.redirect("/admin/products/all");
        });
        // console.log(updatedProduct);
    });
});

// DELETE - REMOVE PRODUCT WITH ID
router.delete("/delete/:id", (req, res) => {
    Product.findByIdAndDelete({ id: req.params.id }).then(product => {
        req.flash("success_msg", `${product.name} deleted successfully.`);
        res.redirect("/admin/products/all");
    });
});

module.exports = router;