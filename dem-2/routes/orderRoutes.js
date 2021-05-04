const express = require("express");
const ordersRoutes = express.Router();
const orderCont = require("../controllers/order/orderController.js");
const validator = require("express-joi-validation").createValidator({});
const authMiddleWare = require("../common/middleware/orders/authMiddleWare.js");
const userOrderDto = require("../common/dtos/orders/orderUser.js");
const productsOrderDto = require("../common/dtos/orders/orderProducts.js");
const errorMiddleWare = require("../common/middleware/error/errorMiddleWare.js")

ordersRoutes.post("/", validator.headers(userOrderDto), authMiddleWare,  validator.body(productsOrderDto), orderCont.addOrder, errorMiddleWare);

module.exports = ordersRoutes;

