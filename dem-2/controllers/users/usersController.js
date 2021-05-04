const client = require("../../dbConnect.js")
const usersProd = require("../../models/usersModel.js");
const usersView = require("../../views/usersView.js");

class usersController {
    async regUser(req, res) {
        usersProd.addNewUser(res.locals.userData).then(result => {
            usersView.sendData(res, result);
        })
    }
}

const usersCont = new usersController();

module.exports = usersCont;