const express = require("express");
const ordersRoutes = express.Router();
const orderCont = require("../controllers/order/orderController.js");

ordersRoutes.post("/", orderCont.addOrder)

module.exports = ordersRoutes;