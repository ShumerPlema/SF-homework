const orderMod = require("../../modules/orderModules");
const orderView = require("../../views/orderView.js");

class OrderController {

    addOrder(req, res) {

        const userData = {
            id_user: res.locals.user.id_user,
            name: res.locals.user.name,
            phone:  res.locals.user.phone,
            email:  res.locals.user.email,
        }
        const queryValue = req.body;

        orderMod.newOrder(userData, queryValue).then(result => {
            orderView.sendData(res, result);
        })
    }
}

const orderCont = new OrderController();

module.exports = orderCont;