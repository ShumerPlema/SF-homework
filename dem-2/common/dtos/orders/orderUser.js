const Joi = require("joi");

const userOrderDto = Joi.object().keys({
    phone: Joi.string().required(),
    password: Joi.string().min(4).required(),
    email: Joi.string().email(),
});

module.exports = userOrderDto;