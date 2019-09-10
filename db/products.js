let productsDB = (function () {
    let products = [];
    let itemID = 0;
    let deletedItem;

    function returnProducts() {
        return products;
    }

    function post(request) {
        request.name = request.name.trim();
        request.url = request.name.replace(/ /gi, '-');
        request.price = parseFloat(request.price);
        request.inventory = parseFloat(request.inventory);
        request.id = itemID;
        products.push(request);
        itemID++;
    }

    function editProduct(index, request) {
        products[index].name = request.name.trim();
        products[index].url = request.name.replace(/ /gi, '-');
        products[index].price = parseFloat(request.price);
        products[index].inventory = parseFloat(request.inventory);
        return products[index];
    }

    function deleteProduct(index) {
        deletedItem = products[index].name;
        products.splice(index, 1);
    }

    function returnDeleted() {
        return deletedItem;
    }
    return {
        returnProducts: returnProducts,
        post: post,
        editProduct: editProduct,
        deleteProduct: deleteProduct,
        returnDeleted: returnDeleted,
    }
}());

module.exports = productsDB;