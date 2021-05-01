const orderMod = require("../../models/orderModel");
const orderView = require("../../views/orderView.js");

class OrderController {
    addOrder(req, res) {
        orderMod.newOrder(req.body).then(result => {
            orderView.sendData(res, result);
        })

    }
}

const orderCont = new OrderController();

module.exports = orderCont;