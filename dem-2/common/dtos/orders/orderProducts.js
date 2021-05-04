const Joi = require("joi");

const  orderProductsDto = Joi.array().min(1).items(Joi.object().keys({
    id: Joi.number().integer().required(),
    count: Joi.number().integer().positive().required()
})).required();

module.exports = orderProductsDto;