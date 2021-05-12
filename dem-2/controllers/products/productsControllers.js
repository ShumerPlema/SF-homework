const prodMod = require("../../modules/productsModules.js");
const prodView = require("../../views/productsView.js");

class ProductsControllers {
   getAllProducts(req, res) {
      prodMod.getProducts().then(result => {
         prodView.sendData(res, result);
      })
   }

   search(req, res) {
      prodMod.productSearch(req.query).then(result => {
         prodView.sendData(res, result);
      })
   }

   productDetails(req, res) {
      prodMod.productDetails(req.params.id).then(result => {
         prodView.sendData(res, result);
      })
   }
}

const prodCont = new ProductsControllers();

module.exports = prodCont;