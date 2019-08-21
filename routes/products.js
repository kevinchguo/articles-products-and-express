const express = require('express');
const router = express.Router();
const exphbs = require('express-handlebars');
const app = express();

let productsDB = require('../db/products.js');

app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs'); //uses res.render()

router.get('/', (req, res) => {
    let productObj = productsDB.returnProducts();
    res.render('products', { productObj: productObj });
});

router.get('/new', (req, res) => {
    res.render('newProducts');
});

router.get('/:id', (req, res) => {
    let productObj = productsDB.returnProducts();
    console.log(productObj)
    console.log(productObj[req.params.id].name);
    res.render('editProducts', { productObj: productObj[req.params.id] });
})

router.post('/', (req, res) => {
    productsDB.post(req.body);
    let productObj = productsDB.returnProducts();
    console.log(productObj)
    res.render('products', { productObj: productObj });
});

router.put('/:id', (req, res) => {
    console.log(req.params.id)
    let productObj = productsDB.editProduct(req.params.id, req.body);
    res.render('editProducts', { productObj: productObj });
});

module.exports = router;