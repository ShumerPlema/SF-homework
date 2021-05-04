const Joi = require("joi");

const userRegDto = Joi.object().keys({
    name: Joi.string().min(1).required(),
    phone: Joi.string().required(),
    password: Joi.string().min(4).required(),
    email: Joi.string().email(),
});

module.exports = userRegDto;