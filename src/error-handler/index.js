const httpStatusCode = require('http-status-codes');
const BaseError = require('./BaseError');

const errors = {
  movies: {
    duplicated: () => new BaseError({
      code: 'DPLC01',
      statusCode: httpStatusCode.CONFLICT,
      message: 'Duplicated films are not allowed.'
    }),
    notFound: () => new BaseError({
      code: 'NTFD01',
      statusCode: httpStatusCode.NOT_FOUND,
      message: 'Movie(s) not found.'
    })
  }
};

module.exports = errors;