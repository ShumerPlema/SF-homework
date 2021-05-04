class ProductsView {
    sendData(res, data) {
        res.json(data);
    }
}

const prodView = new ProductsView();

module.exports = prodView;