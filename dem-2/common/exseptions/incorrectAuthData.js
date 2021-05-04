const BaseHttpError = require("../exseptions/baseHttpError.js");

class IncorrectAuthData extends BaseHttpError {
    constructor(error) {
        super(400,error);
    }
}

module.exports = IncorrectAuthData;