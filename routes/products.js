const express = require('express');
const router = express.Router();
const exphbs = require('express-handlebars');
const app = express();

let productsDB = require('../db/products.js');
let productObj = productsDB.returnProducts();

app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs'); //uses res.render()

router.get('/', (req, res) => {
    res.render('products', { productObj: productObj });
});

router.get('/new', (req, res) => {
    res.render('newProducts');
});

router.post('/', (req, res) => {
    productsDB.post(req.body);
    console.log(productObj)
    res.redirect('products');
});

router.get('/:id', (req, res) => {
    let filteredProduct = productObj.filter(product => { return product.id === parseInt(req.params.id) });
    res.render('productsId', { productObj: filteredProduct[0] })
});

router.get('/:id/edit', (req, res) => {
    let filteredProduct = productObj.filter(product => { return product.id === parseInt(req.params.id) });
    res.render('editProducts', { productObj: filteredProduct[0] });
})

router.put('/:id/edit', (req, res) => {
    let filteredProduct = productObj.filter(product => { return product.id === parseInt(req.params.id) });
    productsDB.editProduct(productObj.indexOf(filteredProduct[0]), req.body);
    res.redirect('/products');
});

router.get('/:id/delete', (req, res) => {
    let filteredProduct = productObj.filter(product => { return product.id === parseInt(req.params.id) });
    res.render('deleteProduct', { productObj: filteredProduct[0] })
});

router.delete('/:id/delete', (req, res) => {
    let filteredProduct = productObj.filter(product => { return product.id === parseInt(req.params.id) });
    if (req.body.name === filteredProduct[0].name) {
        let deletedProduct = productsDB.deleteProduct(productObj.indexOf(filteredProduct[0]));
        res.render('productConfirmDelete', { deleted: deletedProduct })
    } else {
        res.render('deleteProduct', { error: "Please enter a valid name (Case sensitive)", productObj: filteredProduct[0] });
    }

});

module.exports = router;