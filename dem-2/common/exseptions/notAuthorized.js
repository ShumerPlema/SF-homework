const BaseHttpError = require("./baseHttpError");

class NotAuthorized extends BaseHttpError {
    constructor(error) {
        super(401, error);
    }
}

module.exports = NotAuthorized;