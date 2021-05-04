class BaseHttpError extends Error {
    constructor(status, error) {
        super();
        this.status = status;
        this.error = error;
    }
}

module.exports = BaseHttpError;