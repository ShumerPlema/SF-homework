exports.auth = function (query, res) {
    let users = require("../users.json");

    delete query["auth"];

    for (let userObj of users) {
        if (userObj["login"] === query.login && userObj["password"] === query.password) {
            return {
                status: true,
                user: userObj,
            }
        }
    }

    return {
        status: false,
    }

}