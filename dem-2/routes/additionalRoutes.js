const express = require("express");
const additionalRoutes = express.Router();
const userCont = require("../controllers/users/usersController.js");
const validator = require("express-joi-validation").createValidator({});
const userRegDto = require("../common/dtos/user/userReg.js");
const regUserMiddleWare = require("../common/middleware/users/regUserMiddleWare");
const errorMiddleWare = require("../common/middleware/error/errorMiddleWare.js")


additionalRoutes.post("/reg", validator.body(userRegDto), regUserMiddleWare, userCont.regUser, errorMiddleWare);

module.exports = additionalRoutes;
