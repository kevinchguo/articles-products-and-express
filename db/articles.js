let articlesDB = (function () {
    let articles = [];
    let itemID = 0;
    let deletedItem;

    function returnArticles() {
        return articles;
    }

    function errorURL(request) {
        let errorURL = request.replace(/ /gi, '-');
        return errorURL;
    }

    function post(request) {
        request.title = request.title.trim();
        request.url = request.title.replace(/ /gi, '-');
        request.author = request.author;
        request.body = request.body;
        request.id = itemID;
        articles.push(request);
        itemID++;
    }

    function editArticle(index, request) {
        articles[index].title = request.title.trim();
        articles[index].url = request.title.replace(/ /gi, '-');
        articles[index].author = request.author;
        articles[index].body = request.body;
        return articles[index];
    }

    function deleteArticle(index) {
        deletedItem = articles[index].title;
        articles.splice(index, 1);
    }

    function returnDeleted() {
        return deletedItem;
    }
    return {
        returnArticles: returnArticles,
        post: post,
        editArticle: editArticle,
        deleteArticle: deleteArticle,
        returnDeleted: returnDeleted,
        errorURL: errorURL
    }
}());

module.exports = articlesDB;