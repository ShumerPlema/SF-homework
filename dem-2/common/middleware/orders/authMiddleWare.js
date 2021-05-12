const usersMod = require("../../../modules/usersModules.js");
const IncorrectAuthData = require("../../../common/exseptions/incorrectAuthData.js");

async function authMiddleWare(req, res, next) {
    const {phone, password} = req.headers;
    const users = await usersMod.authUser(phone, password);

    if (users.length === 0) {
        res.locals.isAuthorized = false;
        next(new IncorrectAuthData("User with this phone or password was not found"));
    } else {
        res.locals.user = users.dataValues;
        res.locals.isAuthorized = true;
        next();
    }
}

module.exports = authMiddleWare;

