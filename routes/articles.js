const express = require('express');
const router = express.Router();
const exphbs = require('express-handlebars');
const app = express();

let articlesDB = require('../db/articles.js');
let articleObj = articlesDB.returnArticles();

app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs'); //uses res.render()

router.get('/', (req, res) => {
    res.render('articles', { articleObj: articleObj });
});

router.get('/new', (req, res) => {
    res.render('newArticles');
});

router.post('/', (req, res) => {
    let filteredArticle = articleObj.filter(article => { return article.title === req.body.title.trim() });
    if (req.body.title === "") {
        res.render('newArticles', { error: 'Please enter a valid title' });
    } else if (req.body.author === "") {
        res.render('newArticles', { error: 'Please enter a valid author' });
    } else if (req.body.body === "") {
        res.render('newArticles', { error: 'Please enter a valid body' });
    } else {
        if (filteredArticle[0]) {
            res.render('newArticles', { error: "Article already exists" });
        } else {
            articlesDB.post(req.body);
            res.redirect('articles');
        }
    }
});

router.get('/:id', (req, res) => {
    let filteredArticle = articleObj.filter(article => { return article.url === req.params.id || article.id === parseInt(req.params.id) });
    if (!filteredArticle[0]) {
        res.redirect('/articles/new');
    } else {
        res.render('articlesId', { articleObj: filteredArticle[0] });
    };
});

router.get('/:id/edit', (req, res) => {
    let filteredArticle = articleObj.filter(article => { return article.url === req.params.id || article.id === parseInt(req.params.id) });
    if (!filteredArticle[0]) {
        res.render('notFound', { Article: true, url: req.params.id });
    } else {
        res.render('editArticles', { articleObj: filteredArticle[0] });
    }
})

router.put('/:id/edit', (req, res) => {
    let filteredArticle = articleObj.filter(article => { return article.url === req.params.id || article.id === parseInt(req.params.id) });
    articlesDB.editArticle(articleObj.indexOf(filteredArticle[0]), req.body);
    res.redirect('/articles');
});

router.get('/:id/delete', (req, res) => {
    let filteredArticle = articleObj.filter(article => { return article.url === req.params.id || article.id === parseInt(req.params.id) });
    if (!filteredArticle[0]) {
        res.render('notFound', { Article: true, url: req.params.id });
    } else {
        res.render('deleteArticle', { articleObj: filteredArticle[0] })
    }
});

router.delete('/:id/delete', (req, res) => {
    let filteredArticle = articleObj.filter(article => { return article.url === req.params.id || article.id === parseInt(req.params.id) });
    if (req.body.title === filteredArticle[0].title) {
        let deletedArticle = filteredArticle[0].title;
        articlesDB.deleteArticle(articleObj.indexOf(filteredArticle[0]));
        res.render('ArticleConfirmDelete', { deleted: deletedArticle })
    } else {
        res.render('deleteArticle', { error: "Please enter a valid title (Case sensitive)", articleObj: filteredArticle[0] });
    }

});

module.exports = router;