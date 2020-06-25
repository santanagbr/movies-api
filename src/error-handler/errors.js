const httpStatusCode = require('http-status-codes');

const BaseError = require('./BaseError');

const errors = {
  movies: {
    duplicated: () => new BaseError({
      code: 'MOV01',
      statusCode: httpStatusCode.CONFLICT,
      messages: ['Duplicated movies are not allowed.']
    }),
    notFound: () => new BaseError({
      code: 'MOV02',
      statusCode: httpStatusCode.NOT_FOUND,
      messages: ['Movie(s) not found.']
    }),
    invalidModel: (messages) => new BaseError({
      code: 'MOV03',
      statusCode: httpStatusCode.BAD_REQUEST,
      messages,
    })
  },
  database: {
    connectionFail: () => new BaseError({
      code: 'DTB01',
      statusCode: httpStatusCode.SERVICE_UNAVAILABLE,
      messages: ['Fail to connect on database.']
    })
  },
  generic: {
    internalServerError: () => new BaseError({
      code: 'GEN01',
      statusCode: httpStatusCode.INTERNAL_SERVER_ERROR,
      messages: 'Internal Server Error.'
    })
  }

};

module.exports = errors;