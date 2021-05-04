const BaseHttpError = require("../exseptions/baseHttpError.js");

class IncorrectUserData extends BaseHttpError {
    constructor(error) {
        super(200, `Incorrect ${error}`);
    }
}

module.exports = IncorrectUserData;