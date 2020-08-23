import CustomException from './CustomException'


class NotFound extends CustomException {
    constructor(message) {
        super(message, 404)

        this.statusCode = 404
    }
}

module.exports = NotFound
