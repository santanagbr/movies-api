const MovieRepository = require('../repositories/MovieRepository');
const MovieService = require('../services/MovieService');
const MovieController = require('../controllers/MovieController');

const errorLauncher = require('../../../error-handler/ErrorLauncher');

function createMovieRepository() {
  return new MovieRepository();
}

function createMovieService(dependencies = {}) {
  return new MovieService({
    repository: dependencies.repository || createMovieRepository()
  });
}

function createMovieController(dependencies = {}) {
  return new MovieController ({
    service: dependencies.service || createMovieService(),
    errorLauncher: dependencies.errorLauncher || errorLauncher
  })
};

module.exports = {
  createMovieRepository,
  createMovieService,
  createMovieController
};
