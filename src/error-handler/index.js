const httpStatusCode = require('http-status-codes');

const errors = {
  duplicatedMovie: {
    code: 1,
    statusCode: httpStatusCode.CONFLICT,
    error: new Error('Duplicated films are not allowed.')
  },
};

module.exports = errors;