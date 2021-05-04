const IncorrectUserData = require("../../exseptions/incorrectUserData");

async function regUserMiddleWare(req, res, next) {
    const {name, phone, password, email} = req.body;

    const regularExpName = /^[A-ZА-Я][a-zA-Zа-яА-Я ,.'-]{1,30}$/
    const regularExpPhone = /^380\d{9}$/;
    const regularExpEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!regularExpName.test(name)) {
        next(new IncorrectUserData("name"));
    }

    if(!regularExpPhone.test(phone)) {
        next(new IncorrectUserData("phone"));
    }

    if(!regularExpEmail.test(email)){
        res.locals.email = "NULL";
    }

    res.locals.userData = {
        name,
        phone,
        password,
        email,
    }

    // res.locals.userData = userData

    next();
}

module.exports = regUserMiddleWare;