const { generic } = require('./errors');

function errorLauncher(res, err) {
  const error = !!err.code ? err : generic.internalServerError();
  const { statusCode, code, messages } = error;

  res.status(statusCode);
  res.send({ code, messages });
  res.end();
}

module.exports = errorLauncher;
