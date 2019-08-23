let productsDB = (function () {
    let products = [];
    let itemID = 0;
    let deletedItem;

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

    function editProduct(index, request) {
        console.log("Before: " + products[index].name);
        products[index].price = parseFloat(request.price);
        products[index].inventory = parseFloat(request.inventory);
        products[index].name = request.name;
        console.log("After: " + products[index].name)
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
        returnDeleted: returnDeleted
    }
}());

module.exports = productsDB;