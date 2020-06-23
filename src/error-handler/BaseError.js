const httpStatusCode = require('http-status-codes');

class BaseError extends Error {
  constructor({
    code,
    statusCode = httpStatusCode.INTERNAL_SERVER_ERROR,
    message = 'Internal Server Error.',
  }) {
    super(message)

    this.code = code,
    this.statusCode = statusCode,
    this.message = message
  }
}

module.exports = BaseError;