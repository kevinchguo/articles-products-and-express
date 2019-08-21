let productsDB = (function () {
    let products = [];
    let itemID = 0;

    function returnProducts() {
        return products;
    }

    function post(request) {
        products.push(request);
        request.price = parseFloat(request.price);
        request.inventory = parseFloat(request.inventory);
        request.id = itemID;
        itemID++;
    }

    function editProduct(paramId, request) {
        products[paramId].request.price = parseFloat(request.price);
        products[paramId].request.inventory = parseFloat(request.inventory);
        products[paramId].request.name = request.id;
        return products[paramId];
    }

    return {
        returnProducts: returnProducts,
        post: post,
        editProduct: editProduct
    }
}());

module.exports = productsDB;