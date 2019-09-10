const express = require('express');
const router = express.Router();
const exphbs = require('express-handlebars');
const app = express();

let productsDB = require('../db/products.js');
let productObj = productsDB.returnProducts();

app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs'); //uses res.render()

router.get('/', (req, res) => {
    res.render('products/products', { productObj: productObj });
});

router.get('/new', (req, res) => {
    res.render('products/newProducts');
});

router.post('/', (req, res) => {
    let filteredProduct = productObj.filter(product => { return product.name === req.body.name.trim() });
    if (req.body.name === "") {
        res.render('products/newProducts', { error: 'Please enter a valid name' });
    } else if (req.body.inventory === "" || req.body.price === "" || isNaN(req.body.inventory) || isNaN(req.body.price)) {
        res.render('products/newProducts', { error: 'Please enter a valid number' });
    } else {
        if (filteredProduct[0]) {
            res.render('products/newProducts', { error: "Product already exists" });
        } else {
            productsDB.post(req.body);
            res.redirect('products');
        }
    }
});

router.get('/:id', (req, res) => {
    let filteredProductURL = productObj.filter(product => { return product.url === req.params.id || product.id === parseInt(req.params.id) });
    if (!filteredProductURL[0]) {
        res.redirect('/products/new');
    } else {
        res.render('products/productsId', { productObj: filteredProductURL[0] });
    };
});

router.get('/:id/edit', (req, res) => {
    let filteredProductURL = productObj.filter(product => { return product.url === req.params.id || product.id === parseInt(req.params.id) });
    if (!filteredProductURL[0]) {
        res.render('notFound', { Product: true, url: req.params.id });
    } else {
        res.render('products/editProducts', { productObj: filteredProductURL[0] });
    }
});

router.put('/:id/edit', (req, res) => {
    let filteredProductURL = productObj.filter(product => { return product.url === req.params.id || product.id === parseInt(req.params.id) });
    let filteredProduct = productObj.filter(product => { return product.name === req.body.name.trim() });
    if (req.body.name === "") {
        res.render('products/editProducts', { error: 'Please enter a valid name', productObj: filteredProduct[0] });
    } else if (req.body.inventory === "" || req.body.price === "" || isNaN(req.body.inventory) || isNaN(req.body.price)) {
        res.render('products/editProducts', { error: 'Please enter a valid number', productObj: filteredProduct[0] });
    } else {
        productsDB.editProduct(productObj.indexOf(filteredProductURL[0]), req.body);
        res.redirect('/products');
    }
});

router.get('/:id/delete', (req, res) => {
    let filteredProductURL = productObj.filter(product => { return product.url === req.params.id || product.id === parseInt(req.params.id) });
    if (!filteredProductURL[0]) {
        res.render('notFound', { Product: true, url: req.params.id });
    } else {
        res.render('products/deleteProduct', { productObj: filteredProductURL[0] })
    }
});

router.delete('/:id/delete', (req, res) => {
    let filteredProductURL = productObj.filter(product => { return product.url === req.params.id || product.id === parseInt(req.params.id) });
    if (req.body.name === filteredProductURL[0].name) {
        let sec = 3;
        let deletedProduct = filteredProductURL[0].name;
        productsDB.deleteProduct(productObj.indexOf(filteredProductURL[0]));
        res.render('products/productConfirmDelete', { deleted: deletedProduct, timer: setInterval(function () { return sec-- }) })
    } else {
        res.render('products/deleteProduct', { error: "Please enter a valid name (Case sensitive)", productObj: filteredProductURL[0] });
    }

});

module.exports = router;