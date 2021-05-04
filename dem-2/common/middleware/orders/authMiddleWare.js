const usersMod = require("../../../models/usersModel.js");
const IncorrectAuthData = require("../../../common/exseptions/incorrectAuthData.js");

async function authMiddleWare(req, res, next) {
    const {phone, password} = req.headers;
    const { rows }= await usersMod.authUser(phone, password);
    if (rows.length === 0) {
        res.locals.isAuthorized = false;
        next(new IncorrectAuthData("User with this phone or password was not found"));
    } else {
        res.locals.user = rows[0];
        res.locals.isAuthorized = true;
        next();
    }
}

module.exports = authMiddleWare;

