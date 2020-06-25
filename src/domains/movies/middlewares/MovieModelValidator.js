const moment = require('moment');

const errorLauncher = require('../../../error-handler/ErrorLauncher');
const errors = require('../../../error-handler/errors');

function checkMovieProperties(movie, allowedProperties) {
  const errorsMessages = [];

  const movieValidation = {
    notAllowedProperties: Object.keys(movie).filter(key => !allowedProperties.includes(key)),
    missingProperties : allowedProperties.filter(prop => !Object.keys(movie).includes(prop))
  }

  if (movieValidation.notAllowedProperties.length) {
    errorsMessages.push(`Properties: [${movieValidation.notAllowedProperties.join(', ')}] are not allowed.`);
  };

  if (movieValidation.missingProperties.length) {
    errorsMessages.push(`Missing properties: [${movieValidation.missingProperties.join(', ')}].`);
  };

  return errorsMessages;
}

function checkMovieModel(movie) {
  const errorsMessages = [];

  const validateFields = {
    name: (movieName) => {
      if (!movieName || typeof movieName !== 'string') {
        errorsMessages.push(`${movieName} not allowed - "name" must be a string.`);
      }
    },
    cast: (actors) => {
      if (!actors || !Array.isArray(actors) || actors.length > 10) {
        errorsMessages.push('"cast" must be a list with a maximum of 10 actors.');
      }
      actors.forEach((actor) => {
        if (typeof actor !== 'string') {
          errorsMessages.push(`${actor} - It\'s an invalid actor name`);
        }
      })
    },
    director: (directorName) => {
      if (!directorName || typeof directorName !== 'string') {
        errorsMessages.push(`${directorName} not allowed - "director" name must be a string.`);
      }
    },
    release_date: (date) => {
      const instanceDate = moment(date) || null;
      if (!instanceDate || !instanceDate.isValid()) {
        errorsMessages.push(`${date} not allowed - "release_date" must be a date.`);
      }
    },
    censure_level: (censureLevel) => {
      if (censureLevel !== 'CENSURADO' && censureLevel !== 'SEM_CENSURA') {
        errorsMessages.push(`${censureLevel} not allowed - "censure_level" must be "CENSURADO" or "SEM_CENSURA"`)
      }
    }
  }

  const allowedProperties = Object.keys(validateFields);
  const moviePropertiesErrors = checkMovieProperties(movie, allowedProperties);
  if (moviePropertiesErrors.length) return moviePropertiesErrors;

  Object.keys(movie).forEach(key => validateFields[key](movie[key]));

  return errorsMessages
}

function validateMoviesModel(req, res, next) {
  const { body: movies } = req;
  let validationErrorMessages = [];
  for (const movie of movies) {
    const movieErrors = checkMovieModel(movie);

    if (movieErrors.length) validationErrorMessages.push(...movieErrors);
  };

  if (validationErrorMessages.length) {
    errorLauncher(res, errors.movies.invalidModel(validationErrorMessages));
  } else {
    next();
  }
}

module.exports = validateMoviesModel;
