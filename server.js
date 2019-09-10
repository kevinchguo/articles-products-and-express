const express = require("express");
const methodOverride = require('method-override');
const bodyParser = require("body-parser"); //application middleware
const exphbs = require('express-handlebars');
const app = express();

const productRoutes = require('./routes/products');
const articleRoutes = require('./routes/articles');

const PORT = 8080;

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs'); //uses res.render()
app.use('/products', productRoutes);
app.use('/articles', articleRoutes);
app.use(express.static('./public'));


app.get('/', (req, res) => {
    res.render('directory')
})

app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`)
});