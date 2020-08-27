class CustomException extends Error {
    constructor(message, code) {
        if (typeof message !== 'string') {
            message = JSON.stringify(message)
        }

        super(message)

        this.statusCode = code
    }
}

module.exports = CustomException
