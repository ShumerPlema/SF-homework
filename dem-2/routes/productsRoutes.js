const express = require("express");
const productsRoutes = express.Router();
const prodCont  = require("../controllers/products/productsControllers.js")

productsRoutes.get("/", prodCont.getAllProducts);

productsRoutes.get("/search/", prodCont.search)

productsRoutes.get("/:id", prodCont.productDetails);

module.exports = productsRoutes;
