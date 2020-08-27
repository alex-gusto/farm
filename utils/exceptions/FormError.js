const CustomException = require('./CustomException')


class FormError extends CustomException {
    constructor(message) {
        super(message, 422)

        this.statusCode = 422
    }
}

module.exports = FormError
