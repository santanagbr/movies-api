const httpStatusCode = require('http-status-codes');

class BaseError extends Error {
  constructor({
    code,
    statusCode = httpStatusCode.INTERNAL_SERVER_ERROR,
    messages = 'Internal Server Error.',
  }) {
    super(messages)

    this.code = code,
    this.statusCode = statusCode,
    this.messages = messages
  }
}

module.exports = BaseError;